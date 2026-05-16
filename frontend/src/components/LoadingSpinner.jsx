/** Simple loading indicator used across the app */
export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600 border-t-iris-accent"
        role="status"
        aria-label={label}
      />
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
