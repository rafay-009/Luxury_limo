"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, CarFront, ChevronLeft, ChevronRight, CircleGauge, Users } from "lucide-react";
import { getFleetImages } from "@/asset/fleet";
import type { FleetVehicle } from "@/types";
import { SITE_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";

type FleetDisplay = {
  name: string;
  chips: string[];
  imageWrapperClassName?: string;
  imageClassName?: string;
};

const IMAGE_ROTATE_MS = 3500;

export function FleetCard({
  vehicle,
  onPrev,
  onNext,
}: {
  vehicle: FleetVehicle;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const display = getFleetDisplay(vehicle);
  const images = getFleetImages(vehicle.id);

  return (
    <article className="group overflow-hidden rounded-[20px] bg-[#050505] shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition duration-300 md:hover:-translate-y-1">
      <div className="relative flex aspect-[1.66] items-center justify-center overflow-hidden bg-[#f5f6f7]">
        <FleetImageCarousel
          images={images}
          alt={vehicle.imageAlt}
          imageClassName={display.imageClassName}
          imageWrapperClassName={display.imageWrapperClassName}
        />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-4 py-2 text-[11px] font-normal text-slate-950 shadow-sm">
          {vehicle.tier}
        </span>
        {onPrev ? (
          <button
            type="button"
            aria-label="Previous vehicle"
            className="focus-ring absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white shadow-lg"
            onClick={onPrev}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
        ) : null}
        {onNext ? (
          <button
            type="button"
            aria-label="Next vehicle"
            className="focus-ring absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white shadow-lg"
            onClick={onNext}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-[20px] font-semibold leading-none text-white sm:text-[22px]">{display.name}</h3>
        <div className="mt-5 flex min-h-[72px] flex-wrap content-start gap-2">
          {display.chips.map((make, index) => (
            <span key={make} className="flex h-8 items-center gap-2 rounded-full border border-white/20 bg-white/7 px-3 text-[13px] font-normal text-white/90 shadow-inner shadow-white/5">
              {index % 2 === 0 ? <CarFront className="h-3.5 w-3.5 text-white/75" /> : <CircleGauge className="h-3.5 w-3.5 text-white/75" />}
              {make}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 text-[13px] font-normal text-slate-300">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-white/60" /> {vehicle.passengers}
          </span>
          <span className="flex items-center gap-2">
            <BriefcaseBusiness className="h-4 w-4 text-white/60" /> {vehicle.luggage}
          </span>
        </div>

        <div className="my-5 h-px bg-white/15" />

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[19px] font-bold text-white">From {vehicle.priceFrom}</p>
          </div>
          <button type="button" className="focus-ring flex h-11 items-center gap-3 rounded-[10px] bg-[#12b8d0] px-5 text-[13px] font-bold text-slate-950 transition hover:bg-cyan-300">
            {SITE_CONFIG.fleet.ctaLabel}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

function FleetImageCarousel({
  images,
  alt,
  imageClassName,
  imageWrapperClassName,
}: {
  images: ReturnType<typeof getFleetImages>;
  alt: string;
  imageClassName?: string;
  imageWrapperClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, IMAGE_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [images, reduceMotion]);

  return (
    <div className={cn("relative h-full w-full", imageWrapperClassName)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${alt}-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[activeIndex]}
            alt={alt}
            fill
            className={cn(
              "transition duration-500",
              imageClassName ?? "object-cover group-hover:scale-[1.035]"
            )}
            sizes="(min-width: 1024px) 33vw, 100vw"
            priority={activeIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function getFleetDisplay(vehicle: FleetVehicle): FleetDisplay {
  if (vehicle.id === "economy-sedan") {
    return {
      name: "Economy Sedan",
      chips: ["Camry | Corolla", "Accord | Civic", "Elantra", "Sentra"],
    };
  }

  if (vehicle.id === "executive-sedan") {
    return {
      name: "Luxury Sedan",
      chips: ["Benz-E-Class", "5 Series", "A6 | A8", "ES | GS"],
    };
  }

  if (vehicle.id === "flagship-sedan") {
    return {
      name: "First Class Sedan",
      chips: ["Benz-S-Class", "7 Series"],
    };
  }

  if (vehicle.category === "suv") {
    return {
      name: vehicle.name,
      chips: ["Escalade", "Navigator", "Suburban", "Yukon XL"],
    };
  }

  if (vehicle.category === "sprinter") {
    return {
      name: vehicle.name,
      chips: ["Mercedes Sprinter", "Executive Van", "Group Travel"],
    };
  }

  if (vehicle.category === "limousine") {
    return {
      name: vehicle.name,
      chips: ["Stretch Limo", "Wedding", "Prom", "VIP Events"],
      imageWrapperClassName: "mx-auto h-full w-[82%] max-w-[420px] sm:w-[78%]",
      imageClassName: "object-contain object-center group-hover:scale-[1.02]",
    };
  }

  if (vehicle.id === "executive-coach") {
    return {
      name: vehicle.name,
      chips: ["Motor Coach", "Shuttle", "Large Groups"],
    };
  }

  if (vehicle.category === "bus") {
    return {
      name: vehicle.name,
      chips: ["Party Bus", "Events", "Group Shuttle"],
    };
  }

  return {
    name: vehicle.name,
    chips: vehicle.makes,
  };
}
