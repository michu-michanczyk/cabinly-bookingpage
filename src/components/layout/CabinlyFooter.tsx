import { CabinlyLogo, IconArrowRight } from "../icons";

export function CabinlyFooter() {
  return (
    <div className="w-full bg-bg-surface-secondary dark:bg-white dark:border-t dark:border-[#e5e5e5]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-20 sm:pb-28 md:pb-12 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <CabinlyLogo variant="onDark" className="dark:hidden shrink-0" />
          <CabinlyLogo variant="onWhite" className="hidden dark:block shrink-0" />
          <div className="flex flex-col text-xs leading-tight">
            <span className="text-white dark:text-[#010101] font-medium">Built with Cabinly</span>
            <span className="text-white/60 dark:text-[#010101]/60">Turn empty nights into direct bookings</span>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white text-[#010101] dark:bg-[#010101] dark:text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-lg hover:opacity-80 transition-opacity cursor-pointer shrink-0">
          Create your own page
          <IconArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
