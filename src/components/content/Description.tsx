import { useState } from "react";
import { IconUsers, IconBedroom, IconBathroom, IconGPS } from "../icons";
import type { Cabin } from "../../types/cabin";

interface DescriptionProps {
  cabin: Cabin;
}

export function Description({ cabin }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const shortDescription = cabin.description.split("\n\n")[0];
  const showToggle = cabin.description.length > shortDescription.length;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left: Description text */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            About this place
          </h2>

          {/* Key details */}
          <div className="flex flex-wrap gap-4 mb-6">
            <DetailPill icon={<IconUsers size={16} />} label={`Up to ${cabin.maxGuests} guests`} />
            <DetailPill icon={<IconBedroom size={16} />} label={`${cabin.bedrooms} bedrooms`} />
            <DetailPill icon={<IconBathroom size={16} />} label={`${cabin.bathrooms} bathrooms`} />
            <DetailPill icon={<IconGPS size={16} />} label={cabin.location.city} />
          </div>

          {/* Description text */}
          <div className="text-sm text-text-secondary leading-6 whitespace-pre-line">
            {expanded ? cabin.description : shortDescription}
          </div>

          {showToggle && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-sm font-semibold text-text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Right: Owner card */}
        <div className="lg:w-[360px] shrink-0">
          <div className="bg-bg-tertiary rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={cabin.owner.avatar}
                alt={cabin.owner.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-text-primary">Hosted by {cabin.owner.name}</div>
                <div className="text-xs text-text-secondary">Superhost</div>
              </div>
            </div>

            <div className="text-xs text-text-secondary space-y-2">
              <h4 className="font-semibold text-text-primary text-sm mb-2">House rules</h4>
              {cabin.houseRules.map((rule, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-text-tertiary">·</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-bg-tertiary px-3 py-1.5 rounded-full text-xs text-text-secondary">
      <span className="text-text-tertiary">{icon}</span>
      {label}
    </div>
  );
}
