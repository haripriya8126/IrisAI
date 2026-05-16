import { useState } from "react";

// Example measurements from the Iris dataset (Setosa)
const SAMPLE = {
  sepal_length: "5.1",
  sepal_width: "3.5",
  petal_length: "1.4",
  petal_width: "0.2",
};

const FIELDS = [
  { key: "sepal_length", label: "Sepal length", unit: "cm", step: "0.1" },
  { key: "sepal_width", label: "Sepal width", unit: "cm", step: "0.1" },
  { key: "petal_length", label: "Petal length", unit: "cm", step: "0.1" },
  { key: "petal_width", label: "Petal width", unit: "cm", step: "0.1" },
];

/**
 * Form to enter the four Iris measurements and request a prediction.
 */
export default function PredictionForm({ onPredict, loading }) {
  const [values, setValues] = useState(SAMPLE);

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {};
    for (const { key } of FIELDS) {
      payload[key] = parseFloat(values[key]);
    }
    onPredict(payload);
  };

  const fillSample = () => setValues(SAMPLE);

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <div>
        <h2 className="font-display text-lg font-semibold text-white">
          Predict species
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Enter sepal and petal measurements in centimeters.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(({ key, label, unit, step }) => (
          <label key={key} className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-300">
              {label} ({unit})
            </span>
            <input
              type="number"
              step={step}
              min="0"
              max="30"
              required
              className="input-field"
              value={values[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              disabled={loading}
            />
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Predicting…" : "Classify flower"}
        </button>
        <button
          type="button"
          onClick={fillSample}
          disabled={loading}
          className="rounded-xl border border-slate-600/60 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-iris-800"
        >
          Load sample (Setosa)
        </button>
      </div>
    </form>
  );
}
