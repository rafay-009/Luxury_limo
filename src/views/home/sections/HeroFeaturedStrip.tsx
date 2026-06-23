import Image from "next/image";
import { heroFeatured, heroFeaturedMobile } from "@/page-modules/home/assets";

export function HeroFeaturedStrip() {
  return (
    <section className="section-full-bleed overflow-x-hidden" aria-label="Featured in and recognized by">
      <Image
        src={heroFeaturedMobile}
        alt="Featured In and Recognized By partner logo strip"
        width={359}
        height={52}
        className="block h-auto w-full max-w-none md:hidden"
        sizes="100vw"
        priority
      />
      <Image
        src={heroFeatured}
        alt="Featured In and Recognized By partner logo strip"
        width={1440}
        height={81}
        className="hidden h-auto w-full max-w-none md:block"
        sizes="100vw"
        priority
      />
    </section>
  );
}
