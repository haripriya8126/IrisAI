/** Summary cards for dataset size, best model, and per-model accuracy */

export default function ModelStats({ dashboard }) {
  if (!dashboard) return null;

  const { dataset_size, best_model, accuracies } = dashboard;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article className="card">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Dataset
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-white">
          {dataset_size}
        </p>
        <p className="text-sm text-slate-400">Iris samples (sklearn)</p>
      </article>

      <article className="card border-iris-accent/30 sm:col-span-2 lg:col-span-1">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Best model
        </p>
        <p className="mt-1 font-display text-lg font-bold text-iris-accent">
          {best_model}
        </p>
        <p className="text-sm text-slate-400">Used for predictions</p>
      </article>

      {Object.entries(accuracies || {}).map(([name, acc]) => (
        <article key={name} className="card">
          <p className="truncate text-xs text-slate-500">{name}</p>
          <p className="mt-1 font-display text-2xl font-bold text-white">
            {acc}%
          </p>
          <p className="text-sm text-slate-400">Test accuracy</p>
        </article>
      ))}
    </section>
  );
}
