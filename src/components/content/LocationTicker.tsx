import React, { useEffect, useRef, useMemo } from 'react';
import type { Cabin } from '../../types/cabin';
import { extractKeywords } from '../../utils/extractKeywords';

interface LocationTickerProps {
  cabin: Cabin;
}

export function LocationTicker({ cabin }: LocationTickerProps) {
  // Dynamically extract keywords from cabin data
  const locations = useMemo(() => extractKeywords(cabin), [cabin]);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Calculate the width of the content
    const firstChild = ticker.firstElementChild as HTMLElement;
    if (!firstChild) return;

    const contentWidth = firstChild.offsetWidth;

    // Set animation duration based on content width (faster scrolling)
    const duration = contentWidth / 80; // ~80px per second (faster)
    ticker.style.setProperty('--ticker-duration', `${duration}s`);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-bg-primary border-t-2 border-border-dark py-4">
      <div
        ref={tickerRef}
        className="flex animate-scroll items-center"
        style={{
          // @ts-ignore
          '--ticker-duration': '20s'
        }}
      >
        {/* Duplicate the content multiple times for seamless loop */}
        {[...Array(3)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex items-center whitespace-nowrap shrink-0">
            {locations.map((location, index) => (
              <React.Fragment key={`${groupIndex}-${index}`}>
                <span className="font-medium text-sm text-text-primary px-3">
                  {location}
                </span>
                <span className="text-text-primary text-sm">—</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
