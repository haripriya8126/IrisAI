/** Shows predicted species, confidence, and probability breakdown */

const SPECIES_STYLES = {
  setosa: {
    gradient: "from-emerald-500/20 to-cyan-500/20",
    border: "border-emerald-400/40",
    emoji: "🌿",
  },
  versicolor: {
    gradient: "from-violet-500/20 to-fuchsia-500/20",
    border: "border-violet-400/40",
    emoji: "💜",
  },
  virginica: {
    gradient: "from-rose-500/20 to-orange-500/20",
    border: "border-rose-400/40",
    emoji: "🔮",
  },
};

export default function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="card flex min-h-[200px] items-center justify-center text-center text-slate-500">
        <p className="text-sm">
          Submit measurements to see the predicted species and confidence.
        </p>
      </div>
    );
  }

  const key = result.species?.toLowerCase() || "setosa";
  const style = SPECIES_STYLES[key] || SPECIES_STYLES.setosa;

  return (
    <div
      className={`card border-2 bg-gradient-to-br ${style.gradient} ${style.border}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
        Prediction
      </p>
      <div className="mt-3 flex items-start gap-4">
        <span className="text-4xl" aria-hidden>
          {style.emoji}
        </span>
        <div>
          <h2 className="font-display text-2xl font-bold capitalize text-white sm:text-3xl">
            {result.species_display || result.species}
          </h2>
          <p className="mt-1 text-slate-300">
            Confidence:{" "}
            <span className="font-semibold text-iris-accent">
              {result.confidence}%
            </span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Model: {result.model_used}
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {(result.probabilities || []).map((item) => (
          <li key={item.species}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="capitalize text-slate-400">{item.species}</span>
              <span className="text-slate-300">{item.probability}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-iris-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500"
                style={{ width: `${item.probability}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
