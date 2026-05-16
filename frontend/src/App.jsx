import { useCallback, useEffect, useState } from "react";
import { fetchDashboard, predictFlower } from "./api/client";
import AccuracyComparisonChart from "./components/charts/AccuracyComparisonChart";
import FeatureImportanceChart from "./components/charts/FeatureImportanceChart";
import SpeciesDistributionChart from "./components/charts/SpeciesDistributionChart";
import ErrorBanner from "./components/ErrorBanner";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import ModelStats from "./components/ModelStats";
import PredictionForm from "./components/PredictionForm";
import PredictionResult from "./components/PredictionResult";

/**
 * Main IrisAI application.
 * Loads analytics from Flask on mount and handles user predictions.
 */
export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState(null);

  const [prediction, setPrediction] = useState(null);
  const [predictLoading, setPredictLoading] = useState(false);
  const [predictError, setPredictError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setDashboardLoading(true);
    setDashboardError(null);
    try {
      const data = await fetchDashboard();
      setDashboard(data);
    } catch (err) {
      setDashboardError(
        err.message ||
          "Could not load dashboard. Is the Flask server running? (python app.py on port 5001)"
      );
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handlePredict = async (measurements) => {
    setPredictLoading(true);
    setPredictError(null);
    try {
      const result = await predictFlower(measurements);
      setPrediction(result);
    } catch (err) {
      setPredictError(err.message || "Prediction failed.");
      setPrediction(null);
    } finally {
      setPredictLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {dashboardError && (
          <ErrorBanner message={dashboardError} onRetry={loadDashboard} />
        )}

        {dashboardLoading ? (
          <LoadingSpinner label="Training models and loading charts…" />
        ) : (
          <>
            <ModelStats dashboard={dashboard} />

            <section className="grid gap-6 lg:grid-cols-3">
              <SpeciesDistributionChart
                data={dashboard?.species_distribution}
              />
              <AccuracyComparisonChart
                data={dashboard?.accuracy_comparison}
              />
              <FeatureImportanceChart
                data={dashboard?.feature_importance}
              />
            </section>
          </>
        )}

        <section className="grid gap-6 lg:grid-cols-2">
          <PredictionForm onPredict={handlePredict} loading={predictLoading} />
          <div className="space-y-4">
            {predictError && <ErrorBanner message={predictError} />}
            <PredictionResult result={prediction} />
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          IrisAI · Scikit-learn · Flask · React · Tailwind · Built for learning
          and portfolios
        </footer>
      </main>
    </div>
  );
}
