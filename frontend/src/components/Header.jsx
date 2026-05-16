/** Top navigation bar with branding */
export default function Header() {
  return (
    <header className="border-b border-slate-700/40 bg-iris-900/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-xl">
            🌸
          </span>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              Iris<span className="text-iris-accent">AI</span>
            </h1>
            <p className="text-xs text-slate-400 sm:text-sm">
              Iris flower species classifier
            </p>
          </div>
        </div>
        <span className="hidden rounded-full border border-slate-600/60 bg-iris-800/80 px-3 py-1 text-xs font-medium text-slate-300 sm:inline">
          ML · React · Flask
        </span>
      </div>
    </header>
  );
}
