import { FAQAccordion } from "@/views/shared/sections/FAQAccordion";
import { NEW_YORK_FAQS } from "@/constants";

export function NewYorkFAQSection() {
  return (
    <section className="section section--light section-pad" aria-label="Frequently asked questions">
      <div className="section-inner site-container--narrow">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--dark lg:whitespace-nowrap">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
        </header>

        <div className="section-body content-medium">
          <FAQAccordion faqs={NEW_YORK_FAQS} defaultOpenIndex={NEW_YORK_FAQS.length - 1} />
        </div>
      </div>
    </section>
  );
}
