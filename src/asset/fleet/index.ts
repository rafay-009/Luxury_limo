import type { StaticImageData } from "next/image";

import economySedan1 from "./economy-sedan.webp";
import economySedan2 from "./economy-sedan2.webp";
import economySedan3 from "./economy-sedan3.webp";

import luxurySedan1 from "./luxury-sedan.webp";
import luxurySedan2 from "./luxury-sedan2.webp";
import luxurySedan3 from "./luxury-sedan3.webp";

import firstClassSedan1 from "./first-class-sedan.webp";
import firstClassSedan2 from "./first-class-sedan2.webp";
import firstClassSedan3 from "./first-class-sedan3.webp";

import fullSizeSuv1 from "./full-size-suv.webp";
import fullSizeSuv2 from "./full-size-suv2.webp";
import fullSizeSuv3 from "./full-size-suv3.webp";

import sprinter1 from "./sprinter.webp";
import sprinter2 from "./sprinter2.webp";
import sprinter3 from "./sprinter3.webp";

import limo1 from "./limo-final.webp";
import limo2 from "./limo2.webp";
import limo3 from "./limo3.webp";

import motoCoach1 from "./moto-coach.webp";
import motoCoach2 from "./moto-coach2.webp";
import motoCoach3 from "./moto-coach.svg";

import partyBus1 from "./party-bus.webp";
import partyBus2 from "./party-bus2.webp";
import partyBus3 from "./party-bus3.webp";

export const FLEET_VEHICLE_IMAGES: Record<string, StaticImageData[]> = {
  "economy-sedan": [economySedan1, economySedan2, economySedan3],
  "executive-sedan": [luxurySedan1, luxurySedan2, luxurySedan3],
  "flagship-sedan": [firstClassSedan1, firstClassSedan2, firstClassSedan3],
  "luxury-suv": [fullSizeSuv1, fullSizeSuv2, fullSizeSuv3],
  "executive-sprinter": [sprinter1, sprinter2, sprinter3],
  "stretch-limousine": [limo1, limo2, limo3],
  "executive-coach": [motoCoach1, motoCoach2, motoCoach3],
  "party-bus": [partyBus1, partyBus2, partyBus3],
};

export function getFleetImages(vehicleId: string): StaticImageData[] {
  return FLEET_VEHICLE_IMAGES[vehicleId] ?? FLEET_VEHICLE_IMAGES["economy-sedan"];
}
