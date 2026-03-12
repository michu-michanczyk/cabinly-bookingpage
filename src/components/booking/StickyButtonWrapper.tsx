import { useRef, useState, useEffect } from "react";

interface StickyButtonWrapperProps {
  children: React.ReactNode;
}

/**
 * Renders children in place. When the inline button scrolls out of view,
 * also renders a fixed bottom bar with the same children.
 */
export function StickyButtonWrapper({ children }: StickyButtonWrapperProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -16px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Inline button */}
      <div ref={sentinelRef}>{children}</div>

      {/* Fixed bar — only when inline button is off-screen */}
      {isSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-primary border-t border-border-light px-4 sm:px-6 py-4">
          <div className="max-w-[520px] mx-auto w-full">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
