import { useState } from "react";
import type { Cabin } from "../../types/cabin";

interface DescriptionProps {
  cabin: Cabin;
}

export function Description({ cabin }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const descriptionText = `Browse the internet, play board games or PlayStation with your family, have fun with the dog, or take a nap in the hammock.
And after all that - relax in the jacuzzi or grill yourself a sausage.  Drugi Dom is a comfortable stay for up to 10 people, located
on the grounds of the old PKP railway resort in Załakowo.

We equipped Drugi Dom with everything you need in a home — and everything that makes your time here even more enjoyable.
The cabin is surrounded by beautiful Kashubian forests, perfect for hiking and cycling. Lake Gowidlińskie is just a 10-minute walk
away, and the charming town of Kartuzy is a short drive. Whether you're looking for adventure or relaxation,
this is the perfect getaway.`;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-10 sm:pb-14">
      {/* Two column layout on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-6 lg:mb-8">
        {/* Left box - 224px wide on desktop, full width on mobile */}
        <div className="w-full lg:w-56 lg:shrink-0">
          <h2 className="text-base font-medium text-text-primary">
            Our cabin
          </h2>
        </div>

        {/* Right box - Large intro paragraph */}
        <div className="flex-1">
          <p className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight sm:leading-[48px] lg:leading-[56px]">
            <span className="text-text-primary">Listen to the birds singing while sipping </span>
            <span className="text-text-tertiary">freshly grounded coffee</span>
            <span className="text-text-primary"> on our terrace overlooking the forest, just a meter from the stream.</span>
          </p>
        </div>
      </div>

      {/* Property features - aligned with text above (right column on desktop) */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 my-6 lg:my-10">
        {/* Left spacer - hidden on mobile, 224px on desktop */}
        <div className="hidden lg:block w-56 shrink-0" />

        {/* Right column - features grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-6 lg:gap-y-8">
          <FeatureItem icon="/icons/users.svg" value={`${cabin.maxGuests} guests`} subtitle={`Up to ${cabin.maxGuests} people`} />
          <FeatureItem icon="/icons/bedroom.svg" value={`${cabin.bedrooms} bedrooms`} subtitle="10 single beds" />
          <FeatureItem icon="/icons/bathroom.svg" value={`${cabin.bathrooms} bathrooms`} subtitle="Bath & shower" />
          <FeatureItem icon="/icons/parking.svg" value="6 parking spots" subtitle="Up to 6 cars" />
          <FeatureItem icon="/icons/pets.svg" value="2 pets allowed" subtitle="Small cats & dogs" />
          <FeatureItem icon="/icons/home.svg" value="1 property" subtitle="One house on a plot" />
        </div>
      </div>

      {/* Description text with show more */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
        {/* Left spacer - hidden on mobile, 224px on desktop */}
        <div className="hidden lg:block w-56 shrink-0" />

        {/* Right column - description */}
        <div className="flex-1">
          <div
            className={`text-base text-text-secondary leading-6 whitespace-pre-line transition-all duration-300 ease-in-out ${!expanded ? 'line-clamp-3' : ''}`}
          >
            {descriptionText}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-base font-medium text-text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ cursor: 'pointer' }}
          >
            {expanded ? "show less" : "show more"}
          </button>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, value, subtitle }: { icon: string; value: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3">
      <img src={icon} alt="" className="w-6 h-6 shrink-0" />
      <div>
        <div className="text-base font-medium text-text-primary">{value}</div>
        <div className="text-base text-text-secondary">{subtitle}</div>
      </div>
    </div>
  );
}
