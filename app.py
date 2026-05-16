"""
IrisAI — Flask REST API for Iris flower classification.

Run: python app.py
API base: http://127.0.0.1:5001/api
"""

from flask import Flask, jsonify, request
from flask_cors import CORS

from ml_service import ml_service

app = Flask(__name__)

# Allow the Vite dev server (and production builds) to call this API
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/health", methods=["GET"])
def health():
    """Quick check that the server is up."""
    return jsonify({"status": "ok", "app": "IrisAI"})


@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    """
    Returns chart data and model metrics.
    Trains models on first request if they are not ready yet.
    """
    try:
        if not ml_service.models:
            ml_service.train_all()
        return jsonify(ml_service.get_dashboard_payload())
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.route("/api/predict", methods=["POST"])
def predict():
    """
    Body JSON:
    {
      "sepal_length": 5.1,
      "sepal_width": 3.5,
      "petal_length": 1.4,
      "petal_width": 0.2
    }
    """
    try:
        if not ml_service.models:
            ml_service.train_all()

        data = request.get_json(silent=True) or {}
        required = [
            "sepal_length",
            "sepal_width",
            "petal_length",
            "petal_width",
        ]

        missing = [k for k in required if k not in data]
        if missing:
            return (
                jsonify(
                    {
                        "error": f"Missing fields: {', '.join(missing)}",
                    }
                ),
                400,
            )

        features = [float(data[k]) for k in required]
        result = ml_service.predict(features)
        return jsonify(result)

    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    # Train once at startup so the first dashboard load is fast
    print("Training Iris classifiers...")
    ml_service.train_all()
    print(f"Best model: {ml_service.best_model_name}")
    # Port 5001 avoids conflicts with other local Flask apps on 5000
    print("Starting IrisAI API on http://127.0.0.1:5001")
    app.run(host="127.0.0.1", port=5001, debug=True)
