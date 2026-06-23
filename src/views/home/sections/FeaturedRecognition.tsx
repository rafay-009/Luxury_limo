import Image from "next/image";
import { featuredBelow, featuredBelowMobile } from "@/page-modules/home/assets";

export function FeaturedRecognition() {
  return (
    <section className="section-full-bleed overflow-x-hidden" aria-label="Featured in and recognized by">
      <Image
        src={featuredBelowMobile}
        alt="Featured In and Recognized By"
        width={375}
        height={247}
        className="block h-auto w-full max-w-none md:hidden"
        sizes="100vw"
        priority={false}
      />
      <Image
        src={featuredBelow}
        alt="Featured In and Recognized By"
        width={1440}
        height={299}
        className="hidden h-auto w-full max-w-none md:block"
        sizes="100vw"
        priority={false}
      />
    </section>
  );
}
