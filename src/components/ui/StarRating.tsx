import { IconStar, IconStarOutline } from "../icons";
import { cn } from "../../lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, maxStars = 5, size = 14, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxStars }, (_, i) =>
        i < Math.floor(rating) ? (
          <IconStar key={i} size={size} className="text-text-primary" />
        ) : (
          <IconStarOutline key={i} size={size} className="text-text-tertiary" />
        )
      )}
    </div>
  );
}
