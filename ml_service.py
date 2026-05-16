"""
IrisAI — Machine learning service for the Iris flower classification task.

Loads the classic Iris dataset from scikit-learn, trains three classifiers,
and exposes helpers for metrics, predictions, and chart data.
"""

from __future__ import annotations

import numpy as np
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

# Human-readable species names (order matches sklearn target encoding)
SPECIES_NAMES = ["setosa", "versicolor", "virginica"]

# Friendly labels for each numeric feature column
FEATURE_LABELS = [
    "Sepal length (cm)",
    "Sepal width (cm)",
    "Petal length (cm)",
    "Petal width (cm)",
]


class IrisMLService:
    """Trains models on the Iris dataset and serves predictions + analytics."""

    def __init__(self) -> None:
        self._iris = load_iris()
        self.X = self._iris.data
        self.y = self._iris.target
        self.feature_names = list(self._iris.feature_names)
        self.models: dict = {}
        self.accuracies: dict[str, float] = {}
        self.best_model_name: str = ""
        self.best_model = None
        self._X_test = None
        self._y_test = None

    def train_all(self) -> None:
        """Split data, fit three classifiers, and pick the best by test accuracy."""
        X_train, X_test, y_train, y_test = train_test_split(
            self.X, self.y, test_size=0.25, random_state=42, stratify=self.y
        )
        self._X_test = X_test
        self._y_test = y_test

        # Pipelines scale features where needed (SVM and logistic regression)
        candidates = {
            "Logistic Regression": Pipeline(
                [
                    ("scaler", StandardScaler()),
                    ("clf", LogisticRegression(max_iter=1000, random_state=42)),
                ]
            ),
            "Random Forest": RandomForestClassifier(
                n_estimators=100, random_state=42
            ),
            "SVM": Pipeline(
                [
                    ("scaler", StandardScaler()),
                    ("clf", SVC(kernel="rbf", probability=True, random_state=42)),
                ]
            ),
        }

        self.models.clear()
        self.accuracies.clear()

        for name, model in candidates.items():
            model.fit(X_train, y_train)
            score = float(model.score(X_test, y_test))
            self.models[name] = model
            self.accuracies[name] = round(score * 100, 2)

        self.best_model_name = max(self.accuracies, key=self.accuracies.get)
        self.best_model = self.models[self.best_model_name]

    def get_species_distribution(self) -> list[dict]:
        """Count samples per species for the distribution chart."""
        counts = {name: 0 for name in SPECIES_NAMES}
        for target in self.y:
            counts[SPECIES_NAMES[int(target)]] += 1
        return [{"species": k, "count": v} for k, v in counts.items()]

    def get_accuracy_comparison(self) -> list[dict]:
        """Model names and test accuracies for the bar chart."""
        return [
            {"model": name, "accuracy": acc}
            for name, acc in self.accuracies.items()
        ]

    def get_feature_importance(self) -> list[dict]:
        """
        Feature importance from the Random Forest (tree-based impurity).
        Falls back to uniform weights if the forest is missing.
        """
        rf = self.models.get("Random Forest")
        if rf is None or not hasattr(rf, "feature_importances_"):
            n = len(FEATURE_LABELS)
            return [
                {"feature": FEATURE_LABELS[i], "importance": round(1 / n, 4)}
                for i in range(n)
            ]

        importances = rf.feature_importances_
        return [
            {
                "feature": FEATURE_LABELS[i],
                "importance": round(float(importances[i]), 4),
            }
            for i in range(len(FEATURE_LABELS))
        ]

    def predict(self, features: list[float]) -> dict:
        """
        Predict species using the best-performing model.
        Returns species name, confidence (%), and per-class probabilities.
        """
        if self.best_model is None:
            raise RuntimeError("Models are not trained yet. Call train_all() first.")

        if len(features) != 4:
            raise ValueError("Exactly four features are required.")

        X = np.array([features], dtype=float)

        # Reject clearly invalid measurements (negative or extreme values)
        if any(v < 0 or v > 30 for v in features):
            raise ValueError(
                "Each measurement should be a positive number below 30 cm."
            )

        pred_idx = int(self.best_model.predict(X)[0])
        species = SPECIES_NAMES[pred_idx]

        # probability=True on SVM enables predict_proba; RF and LR support it too
        if hasattr(self.best_model, "predict_proba"):
            proba = self.best_model.predict_proba(X)[0]
        else:
            proba = np.zeros(len(SPECIES_NAMES))
            proba[pred_idx] = 1.0

        confidence = round(float(proba[pred_idx]) * 100, 2)
        probabilities = [
            {
                "species": SPECIES_NAMES[i],
                "probability": round(float(proba[i]) * 100, 2),
            }
            for i in range(len(SPECIES_NAMES))
        ]

        return {
            "species": species,
            "species_display": species.capitalize(),
            "confidence": confidence,
            "model_used": self.best_model_name,
            "probabilities": probabilities,
            "input": {
                "sepal_length": features[0],
                "sepal_width": features[1],
                "petal_length": features[2],
                "petal_width": features[3],
            },
        }

    def get_dashboard_payload(self) -> dict:
        """Single payload for the frontend dashboard (charts + model info)."""
        return {
            "species_distribution": self.get_species_distribution(),
            "accuracy_comparison": self.get_accuracy_comparison(),
            "feature_importance": self.get_feature_importance(),
            "accuracies": self.accuracies,
            "best_model": self.best_model_name,
            "dataset_size": int(len(self.y)),
            "feature_labels": FEATURE_LABELS,
        }


# Module-level singleton used by Flask
ml_service = IrisMLService()
