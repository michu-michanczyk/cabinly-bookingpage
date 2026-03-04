import { CabinlyLogo, IconArrowRight } from "../icons";

export function Footer() {
  return (
    <footer className="bg-bg-surface-secondary text-white" style={{ height: '160px' }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <CabinlyLogo />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-white font-medium">Built with Cabinly</span>
            <span className="text-white/60">Turn empty nights into direct bookings</span>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg text-xs font-semibold text-text-primary shadow-lg hover:opacity-80 transition-opacity cursor-pointer">
          Create your own page
          <IconArrowRight size={14} />
        </button>
      </div>
    </footer>
  );
}
