import { CabinlyLogo, IconArrowRight } from "../icons";

export function Footer() {
  return (
    <footer className="bg-bg-surface-secondary text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <CabinlyLogo className="text-white" />
          <div className="flex flex-col text-xs">
            <span className="text-white/80 font-medium">Built with Cabinly</span>
            <span className="text-white/50">AI assisted tool for hosts</span>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 text-sm font-semibold text-white hover:opacity-80 transition-opacity">
          Create your own page
          <IconArrowRight size={16} />
        </button>
      </div>
    </footer>
  );
}
