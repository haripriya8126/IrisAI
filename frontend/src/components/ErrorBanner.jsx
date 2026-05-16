/** Displays API or validation errors in a consistent style */
export default function ErrorBanner({ message, onRetry }) {
  if (!message) return null;

  return (
    <div
      className="flex flex-col gap-3 rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      role="alert"
    >
      <p className="text-sm text-rose-200">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 rounded-lg border border-rose-400/50 px-3 py-1.5 text-sm font-medium text-rose-100 hover:bg-rose-500/20"
        >
          Try again
        </button>
      )}
    </div>
  );
}
