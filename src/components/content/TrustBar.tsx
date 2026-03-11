function IconShieldTick() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.99335 1.48667L3.66668 2.74C2.90001 3.02667 2.27335 3.93333 2.27335 4.74667V9.7C2.27335 10.4867 2.79335 11.52 3.42668 11.9933L6.29335 14.1333C7.23335 14.84 8.78001 14.84 9.72001 14.1333L12.5867 11.9933C13.22 11.52 13.74 10.4867 13.74 9.7V4.74667C13.74 3.92667 13.1133 3.02 12.3467 2.73333L9.02001 1.48667C8.45335 1.28 7.54668 1.28 6.99335 1.48667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.03333 7.91333L7.10666 8.98666L9.97332 6.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconWallet() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6667 8.00002V11.3334C14.6667 13.3334 13.3333 14.6667 11.3333 14.6667H4.66666C2.66666 14.6667 1.33333 13.3334 1.33333 11.3334V8.00002C1.33333 6.18669 2.42666 4.92002 4.12666 4.70669C4.29999 4.68002 4.47999 4.66669 4.66666 4.66669H11.3333C11.5067 4.66669 11.6733 4.67335 11.8333 4.70001C13.5533 4.90001 14.6667 6.17335 14.6667 8.00002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.8343 4.69998C11.6743 4.67331 11.5076 4.66665 11.3343 4.66665H4.66761C4.48094 4.66665 4.30094 4.67999 4.12761 4.70665C4.22094 4.51999 4.35428 4.34665 4.51428 4.18665L6.68094 2.01331C7.59428 1.10665 9.07428 1.10665 9.98761 2.01331L11.1543 3.19333C11.5809 3.61333 11.8076 4.14665 11.8343 4.69998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.6667 8.33331H12.6667C11.9333 8.33331 11.3333 8.93331 11.3333 9.66665C11.3333 10.4 11.9333 11 12.6667 11H14.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6.66665V5.33331C4 3.12665 4.66667 1.33331 8 1.33331C11.3333 1.33331 12 3.12665 12 5.33331V6.66665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12.3333C8.92048 12.3333 9.66667 11.5871 9.66667 10.6667C9.66667 9.74619 8.92048 9 8 9C7.07953 9 6.33333 9.74619 6.33333 10.6667C6.33333 11.5871 7.07953 12.3333 8 12.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.3333 14.6667H4.66667C2 14.6667 1.33333 14 1.33333 11.3334V10C1.33333 7.33335 2 6.66669 4.66667 6.66669H11.3333C14 6.66669 14.6667 7.33335 14.6667 10V11.3334C14.6667 14 14 14.6667 11.3333 14.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.6667 7.99998C14.6667 11.68 11.68 14.6666 7.99999 14.6666C4.31999 14.6666 1.33333 11.68 1.33333 7.99998C1.33333 4.31998 4.31999 1.33331 7.99999 1.33331C11.68 1.33331 14.6667 4.31998 14.6667 7.99998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.4733 10.12L8.40666 8.88665C8.04666 8.67332 7.75333 8.15999 7.75333 7.73999V5.00665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const TRUST_ITEMS = [
  { icon: <IconShieldTick />, label: "Verified host" },
  { icon: <IconWallet />, label: "Free cancellation" },
  { icon: <IconLock />, label: "Secure booking" },
  { icon: <IconClock />, label: "Instant response" },
];

export function TrustBar() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 mt-10">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-2">
        {TRUST_ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-text-primary">{item.icon}</span>
              <span className="text-sm sm:text-base font-medium text-text-primary whitespace-nowrap">{item.label}</span>
            </div>
            {i < TRUST_ITEMS.length - 1 && (
              <span className="hidden sm:block w-4 h-0.5 bg-text-primary shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
