import { cn } from "../../lib/utils";

interface IconProps {
  className?: string;
  size?: number;
}

const defaultClass = "shrink-0";

export function IconStar({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M8 1.5l1.85 3.75L14 5.92l-2.97 2.9.7 4.1L8 10.93l-3.73 1.99.7-4.1L2 5.92l4.15-.67L8 1.5z" fill="currentColor" />
    </svg>
  );
}

export function IconStarOutline({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M8 1.5l1.85 3.75L14 5.92l-2.97 2.9.7 4.1L8 10.93l-3.73 1.99.7-4.1L2 5.92l4.15-.67L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAI({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M8 2l1.5 3.5L13 7l-3.5 1.5L8 12l-1.5-3.5L3 7l3.5-1.5L8 2z" fill="currentColor" />
      <path d="M12 1l.5 1.5L14 3l-1.5.5L12 5l-.5-1.5L10 3l1.5-.5L12 1z" fill="currentColor" opacity="0.6" />
      <path d="M4 11l.5 1L6 12.5 4.5 13 4 14.5 3.5 13 2 12.5 3.5 12 4 11z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function IconMicrophone({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 7.5a5 5 0 0010 0M8 12.5v2M6 14.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrowRight({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowUp({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronLeft({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClose({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlay({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M4.5 3v10l8.5-5-8.5-5z" fill="currentColor" />
    </svg>
  );
}

export function IconCalendar({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconUsers({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 14c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="11.5" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1" />
      <path d="M10.5 9.5c.3-.1.6-.1 1 0 1.7.3 3 1.8 3 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function IconBedroom({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M2 10V4.5a1 1 0 011-1h10a1 1 0 011 1V10M1 10h14v2.5H1V10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 7.5h3V10H4V7.5zM9 7.5h3V10H9V7.5z" stroke="currentColor" strokeWidth="1" />
      <path d="M2 12.5v1.5M14 12.5v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconBathroom({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M2 8h12a1 1 0 011 1v1a3 3 0 01-3 3H4a3 3 0 01-3-3V9a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 8V3.5a2 2 0 012-2h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M4 13v1.5M12 13v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconGPS({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M8 1.5a4.5 4.5 0 014.5 4.5c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 018 1.5z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconMoney({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 3.5v2M12.5 10.5v2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function IconFlash({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M9 1.5L4 9h4l-1 5.5L12 7H8l1-5.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSun({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconMoon({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M13.5 9.5a6 6 0 01-7-7 6 6 0 107 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEye({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconTick({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAdd({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMinus({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconLoading({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn("animate-spin", defaultClass, className)}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMaximize({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M10 2h4v4M6 14H2v-4M14 2L9.5 6.5M2 14l4.5-4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconNewChat({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M14 7.5a5.5 5.5 0 01-7.73 5.04L2.5 13.5l.96-3.77A5.5 5.5 0 1114 7.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 5v5M6 7.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconMessageText({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M14 7.5a5.5 5.5 0 01-7.73 5.04L2.5 13.5l.96-3.77A5.5 5.5 0 1114 7.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 6.5h5M5.5 9h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconTrendUp({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M2 12l4-4 2.5 2.5L14 5M10 5h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAward({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <circle cx="8" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 9.5L4 14.5l4-2 4 2-1.5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconExternal({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M12 9v3.5a1 1 0 01-1 1H3.5a1 1 0 01-1-1V5a1 1 0 011-1H7M10 2.5h3.5V6M7 9l6.5-6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSetting({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M13 8a5 5 0 01-.34 1.77l1.2.7a.5.5 0 01.18.68l-1-1.73a.5.5 0 01-.18-.68l-1.2-.7a5 5 0 010-3.54l1.2-.7a.5.5 0 01.18-.68l1 1.73a.5.5 0 01-.18.68l-1.2.7A5 5 0 0113 8z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Wifi icon for amenities
export function IconWifi({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M1.5 5.5C4.3 3.2 8 2.5 8 2.5s3.7.7 6.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M3.5 8C5.3 6.3 8 5.5 8 5.5s2.7.8 4.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5.5 10.5C6.7 9.5 8 9 8 9s1.3.5 2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="12.5" r="1" fill="currentColor" />
    </svg>
  );
}

// Fire/flame for amenities
export function IconFire({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M8 1.5C8 1.5 4 5 4 9a4 4 0 008 0c0-4-4-7.5-4-7.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8c0 0-1.5 1-1.5 2.5a1.5 1.5 0 003 0C9.5 9 8 8 8 8z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Parking icon
export function IconParking({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 11V5h2.5a2 2 0 010 4H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Dog/pet icon
export function IconPet({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <ellipse cx="4.5" cy="4" rx="1.5" ry="2" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="11.5" cy="4" rx="1.5" ry="2" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="3" cy="8" rx="1.2" ry="1.5" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="13" cy="8" rx="1.2" ry="1.5" stroke="currentColor" strokeWidth="1" />
      <path d="M5.5 11C5.5 9.5 6.5 8 8 8s2.5 1.5 2.5 3c0 1-1 2.5-2.5 2.5S5.5 12 5.5 11z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

// TV icon
export function IconTV({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <rect x="1.5" y="3" width="13" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 14h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Kitchen icon
export function IconKitchen({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M3 2v12M6 2v5a3 3 0 01-3 3M13 2v3a2 2 0 01-2 2h-1V2M10 7v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Chart square icon (from Timber Design System)
export function IconChartSquare({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 10V8M8 10V6M11 10V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Finances icon (from Timber Design System)
export function IconFinances({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 4.5v7M10 6.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 1.5 2 1.5 2 .9 2 2-.9 2-2 2-2-.9-2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Ranking / marketing icon (from Timber Design System)
export function IconRanking({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M5 14V9M8 14V2M11 14V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Hot tub / jacuzzi
export function IconHotTub({ className, size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={cn(defaultClass, className)}>
      <path d="M2 8h12v4a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5.5c0-.8.6-1.5 1-2s-.2-1.5-.2-1.5M8 5.5c0-.8.6-1.5 1-2s-.2-1.5-.2-1.5M12 5.5c0-.8.6-1.5 1-2s-.2-1.5-.2-1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// Cabinly Logo
export function CabinlyLogo({ className }: { className?: string }) {
  return (
    <svg width="104" height="24" viewBox="0 0 104 24" fill="none" className={className}>
      <circle cx="10" cy="12" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
      <text x="24" y="17" fontFamily="Switzer, sans-serif" fontWeight="700" fontSize="16" fill="currentColor">
        Cabinly
      </text>
    </svg>
  );
}
