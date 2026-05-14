export function Footer() {
  return (
    <footer className="mt-16 nb-border border-x-0 border-b-0 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-black tracking-tight text-lg">CS:GO • Mock Tests</div>
        <div className="text-xs uppercase tracking-widest opacity-80">Built by Poundal Corporations — © {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}
