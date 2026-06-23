"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { NEW_YORK_POPULAR_ROUTES, type PopularRouteCard } from "@/constants";

export function NewYorkPopularRoutes() {
  const [query, setQuery] = useState("");
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredRoutes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return NEW_YORK_POPULAR_ROUTES;
    return NEW_YORK_POPULAR_ROUTES.filter(
      (route) =>
        route.from.toLowerCase().includes(normalized) ||
        route.to.toLowerCase().includes(normalized) ||
        `${route.from} ${route.to}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  function scrollByCards(direction: "prev" | "next") {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector("article")?.clientWidth ?? 280;
    track.scrollBy({ left: direction === "next" ? cardWidth + 16 : -(cardWidth + 16), behavior: "smooth" });
  }

  return (
    <section className="section section--black section-glow section-pad" aria-label="Popular chauffeur routes in New York">
      <div className="section-inner">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--light lg:whitespace-nowrap">
            Popular Chauffeur Routes In{" "}
            <span className="block text-accent lg:inline">New York</span>
          </h2>
          <p className="section-lead">
            Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.
          </p>
        </header>

        <div className="section-body content-wide">
          <div className="routes-controls">
            <label className="routes-search">
              <Search className="routes-search__icon" aria-hidden />
              <input
                className="input input--search focus-ring"
                placeholder="Search Your Route"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Previous routes"
                className="btn btn--icon focus-ring"
                onClick={() => scrollByCards("prev")}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Next routes"
                className="btn btn--icon btn--icon-cyan focus-ring"
                onClick={() => scrollByCards("next")}
              >
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <div ref={trackRef} className="routes-track scrollbar-hide">
            {filteredRoutes.map((route) => (
              <RouteCardItem key={route.id} route={route} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteCardItem({ route }: { route: PopularRouteCard }) {
  return (
    <article className="card-route">
      <Image
        src={route.image}
        alt={`${route.from} to ${route.to}`}
        width={280}
        height={280}
        className="card-route__image"
        sizes="(max-width: 640px) 78vw, 280px"
      />

      <p className="card-route__title">
        {route.from} <span className="font-normal text-zinc-400">→</span> {route.to}
      </p>

      <div className="card-route__footer">
        <span className="tag-vehicles">Sedan | SUV | Sprinter</span>
        <Link href="#booking" className="link-quote focus-ring">
          Get Quote
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
