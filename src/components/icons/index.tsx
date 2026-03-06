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
export function CabinlyLogo({ className, variant = "onDark" }: { className?: string; variant?: "onDark" | "onWhite" }) {
  const textFill = variant === "onWhite" ? "#010101" : "white";
  const gradId = `cabinly-grad-${variant}`;
  return (
    <svg width="104" height="24" viewBox="0 0 78 18" fill="none" className={className}>
      <path d="M71.2729 18L72.7249 13.6923L73.0373 13.14L75.6473 4.72705H77.9999L73.5887 18H71.2729ZM71.714 14.2445L68.3872 4.72705H70.7215L73.313 12.643H73.9563L73.8093 14.2445H71.714Z" fill={textFill}/>
      <path d="M65.2202 14.3181V1.22925H67.4993V14.3181H65.2202Z" fill={textFill}/>
      <path d="M61.3345 14.3181V8.57451C61.3345 7.86269 61.1691 7.33497 60.8383 6.99133C60.5074 6.64769 60.0663 6.47588 59.5149 6.47588C58.89 6.47588 58.3876 6.68451 58.0078 7.10179C57.6402 7.50679 57.4564 8.06519 57.4564 8.77701V14.3181H55.1772V4.72701H57.3093V6.01565H57.3277C57.5973 5.53701 57.971 5.16883 58.4489 4.9111C58.9268 4.6411 59.4965 4.5061 60.1582 4.5061C60.8444 4.5061 61.4448 4.6411 61.9595 4.9111C62.4741 5.1811 62.8785 5.59224 63.1725 6.14451C63.4666 6.69679 63.6136 7.4086 63.6136 8.27997V14.3181H61.3345Z" fill={textFill}/>
      <path d="M51.1833 14.3181V4.727H53.4624V14.3181H51.1833ZM52.3412 3.53041C51.9369 3.53041 51.5999 3.39541 51.3303 3.12541C51.073 2.85541 50.9443 2.53018 50.9443 2.14973C50.9443 1.76927 51.073 1.44404 51.3303 1.17404C51.5999 0.904043 51.9369 0.769043 52.3412 0.769043C52.7333 0.769043 53.058 0.904043 53.3154 1.17404C53.5849 1.44404 53.7197 1.76927 53.7197 2.14973C53.7197 2.53018 53.5849 2.85541 53.3154 3.12541C53.058 3.39541 52.7333 3.53041 52.3412 3.53041Z" fill={textFill}/>
      <path d="M45.09 12.6429C45.5679 12.6429 45.9906 12.5263 46.3582 12.2931C46.7258 12.0477 47.0138 11.6979 47.2221 11.2438C47.4426 10.7774 47.5529 10.2006 47.5529 9.51334C47.5529 8.83834 47.4426 8.27379 47.2221 7.8197C47.0138 7.35334 46.7258 7.00357 46.3582 6.77038C45.9906 6.52493 45.5679 6.4022 45.09 6.4022C44.6121 6.4022 44.1833 6.52493 43.8034 6.77038C43.4358 7.00357 43.1417 7.35334 42.9212 7.8197C42.7129 8.27379 42.6087 8.83834 42.6087 9.51334C42.6087 10.2006 42.7129 10.7774 42.9212 11.2438C43.1295 11.6979 43.4236 12.0477 43.8034 12.2931C44.1833 12.5263 44.6121 12.6429 45.09 12.6429ZM40.4583 14.3181V1.22925H42.7374V6.05243H42.7557C42.9641 5.69652 43.2214 5.40811 43.5277 5.1872C43.8463 4.95402 44.1894 4.7822 44.557 4.67175C44.9246 4.56129 45.3044 4.50607 45.6965 4.50607C46.5175 4.50607 47.2405 4.70857 47.8654 5.11357C48.5025 5.51857 48.9988 6.09538 49.3542 6.84402C49.7218 7.59266 49.9056 8.48856 49.9056 9.53175C49.9056 10.5627 49.7218 11.4524 49.3542 12.2011C48.9866 12.9497 48.4842 13.5265 47.847 13.9315C47.2098 14.3365 46.493 14.539 45.6965 14.539C45.2677 14.539 44.8572 14.4777 44.4651 14.3549C44.073 14.2445 43.7176 14.0665 43.399 13.8211C43.0805 13.5756 42.8231 13.2627 42.6271 12.8822H42.6087V14.3181H40.4583Z" fill={textFill}/>
      <path d="M33.7493 14.5391C32.7813 14.5391 31.9971 14.2875 31.3967 13.7843C30.7963 13.2811 30.4961 12.6122 30.4961 11.7777C30.4961 10.9677 30.7657 10.3111 31.3048 9.80792C31.8562 9.29247 32.6159 8.94883 33.5839 8.77701L37.3151 8.04065V9.51338L34.3926 10.1393C33.878 10.2497 33.4798 10.4154 33.1979 10.6363C32.9284 10.8572 32.7936 11.1763 32.7936 11.5936C32.7936 11.9863 32.9284 12.2931 33.1979 12.5141C33.4798 12.735 33.8535 12.8454 34.3191 12.8454C34.748 12.8454 35.1217 12.7595 35.4403 12.5877C35.7589 12.4036 36.004 12.1459 36.1755 11.8145C36.3593 11.4831 36.4512 11.1088 36.4512 10.6916V7.98542C36.4512 7.44542 36.3042 7.02815 36.0101 6.7336C35.7283 6.42679 35.3116 6.27338 34.7602 6.27338C34.2579 6.27338 33.8535 6.40224 33.5472 6.65997C33.2408 6.90542 33.0264 7.26133 32.9039 7.72769L30.735 7.26747C30.9433 6.42065 31.409 5.75179 32.1319 5.26088C32.8549 4.75769 33.7555 4.5061 34.8338 4.5061C36.1449 4.5061 37.119 4.83133 37.7562 5.48179C38.3934 6.11997 38.7119 7.0036 38.7119 8.13269V12.4588L39.4104 14.3181H37.0577L36.635 13.1216H36.6166C36.3348 13.5756 35.9488 13.9254 35.4587 14.1709C34.9686 14.4163 34.3988 14.5391 33.7493 14.5391Z" fill={textFill}/>
      <path d="M23.9245 14.6311C22.6747 14.6311 21.5719 14.3488 20.6161 13.7843C19.6604 13.2197 18.919 12.4281 18.3921 11.4095C17.8653 10.3908 17.6018 9.20039 17.6018 7.83812C17.6018 6.80721 17.7488 5.88062 18.0429 5.05835C18.3493 4.2238 18.7781 3.50585 19.3295 2.90448C19.8932 2.30312 20.561 1.84289 21.3329 1.5238C22.1172 1.20471 22.9749 1.04517 23.9061 1.04517C24.9109 1.04517 25.7931 1.19244 26.5528 1.48698C27.3126 1.78153 27.9436 2.21721 28.446 2.79403C28.9606 3.37085 29.3405 4.08266 29.5855 4.92948L27.2697 5.66585C27.0123 4.84357 26.6019 4.2238 26.0382 3.80653C25.4746 3.38926 24.7577 3.18062 23.8878 3.18062C23.1158 3.18062 22.448 3.37085 21.8843 3.7513C21.3207 4.11948 20.8857 4.65335 20.5794 5.35289C20.2853 6.04016 20.1382 6.86857 20.1382 7.83812C20.1382 8.79539 20.2853 9.6238 20.5794 10.3233C20.8857 11.0106 21.3207 11.5445 21.8843 11.9249C22.4602 12.3054 23.1342 12.4956 23.9061 12.4956C24.7639 12.4956 25.4746 12.287 26.0382 11.8697C26.6019 11.4402 27.0185 10.8143 27.288 9.99198L29.5855 10.7099C29.3282 11.5568 28.9422 12.2747 28.4276 12.8638C27.9252 13.4406 27.3003 13.8824 26.5528 14.1893C25.8054 14.4838 24.9293 14.6311 23.9245 14.6311Z" fill={textFill}/>
      <path d="M7.92675 0C9.97158 0 11.511 0.457909 13.1652 1.57963C10.1366 5.16654 10.1242 10.4113 13.1359 14.0124L13.2744 14.178C11.5053 15.4143 9.60402 15.9336 7.5362 15.842C3.0329 15.636 3.89762e-06 12.3852 0 7.78373C0 3.38826 3.44643 0 7.92675 0Z" fill={`url(#${gradId})`}/>
      <defs>
        <linearGradient id={gradId} x1="6.63721" y1="0" x2="6.63721" y2="15.8523" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399"/>
          <stop offset="0.634615" stopColor="#3B82F6"/>
          <stop offset="1" stopColor="#17179A"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
