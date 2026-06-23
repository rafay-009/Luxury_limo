import type { Metadata } from "next";
import { NewYorkPage } from "@/page-modules/newyork";

export const metadata: Metadata = {
  title: "Premium Chauffeur Service in New York",
  description:
    "Premium chauffeur services for airport transfers, corporate travel, and special occasions in New York. Professional, reliable, luxurious.",
};

export default function NewYorkServicePage() {
  return <NewYorkPage />;
}
