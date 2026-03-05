import { IconStar } from "../icons";
import type { Cabin } from "../../types/cabin";

interface HeroSectionProps {
  cabin: Cabin;
}

export function HeroSection({ cabin }: HeroSectionProps) {
  return (
    <section className="pt-14 pb-2 text-center">
      {/* Rating badge */}
      <div className="flex items-center justify-center gap-1 mb-2">
        <IconStar size={16} className="text-text-primary" />
        <span className="text-sm text-text-secondary">
          {cabin.rating.score.toFixed(2)}
          <span className="mx-2 text-text-tertiary">|</span>
          {cabin.rating.count} reviews on {cabin.rating.source}
        </span>
      </div>

      {/* Giant title */}
      <h1
        className="font-bold text-accent leading-[0.88] tracking-tight"
        style={{
          fontSize: "clamp(3rem, 9vw, 8rem)",
        }}
      >
        {cabin.title.split(" ").reduce<React.ReactNode[]>((acc, word, i, arr) => {
          // Create natural line breaks for the title
          acc.push(<span key={i}>{word}</span>);
          if (i < arr.length - 1) {
            // Add space between words, line breaks at natural points
            acc.push(<span key={`s${i}`}> </span>);
          }
          return acc;
        }, [])}
      </h1>
    </section>
  );
}
