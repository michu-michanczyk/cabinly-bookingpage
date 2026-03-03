import { useState } from "react";
import { StarRating } from "../ui/StarRating";
import { IconStar } from "../icons";
import { formatDate } from "../../lib/utils";
import type { Review } from "../../types/cabin";

interface ReviewsProps {
  reviews: Review[];
  rating: { score: number; count: number; source: string };
}

const sourceColors: Record<string, string> = {
  "booking.com": "bg-blue-50 text-blue-700",
  google: "bg-emerald-50 text-emerald-700",
  airbnb: "bg-rose-50 text-rose-700",
  direct: "bg-gray-50 text-gray-700",
};

const INITIAL_SHOW = 4;

export function Reviews({ reviews, rating }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, INITIAL_SHOW);

  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => Math.floor(r.rating) === stars).length,
    percentage: (reviews.filter((r) => Math.floor(r.rating) === stars).length / reviews.length) * 100,
  }));

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14 border-t border-border-light">
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        Guest reviews
      </h2>

      {/* Rating summary */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8">
        {/* Big score */}
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-text-primary">
            {rating.score.toFixed(1)}
          </div>
          <div>
            <StarRating rating={rating.score} size={18} />
            <p className="text-sm text-text-secondary mt-1">
              {rating.count} reviews on {rating.source}
            </p>
          </div>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 max-w-xs space-y-1.5">
          {distribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-text-secondary">{stars}</span>
              <IconStar size={10} className="text-text-primary" />
              <div className="flex-1 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                <div
                  className="h-full bg-text-primary rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-4 text-text-tertiary text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayed.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {reviews.length > INITIAL_SHOW && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 text-sm font-semibold text-text-primary border border-border-dark rounded-lg px-6 py-2.5 hover:opacity-80 transition-opacity"
        >
          {showAll ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="border border-border-light rounded-lg p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.author}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-sm font-semibold text-text-secondary">
              {review.author.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-sm font-semibold text-text-primary">{review.author}</div>
            <div className="text-xs text-text-tertiary">{formatDate(review.date)}</div>
          </div>
        </div>

        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            sourceColors[review.source] || sourceColors.direct
          }`}
        >
          {review.source}
        </span>
      </div>

      <StarRating rating={review.rating} size={12} className="mb-2" />

      <p className="text-sm text-text-secondary leading-relaxed">
        {review.text}
      </p>
    </div>
  );
}
