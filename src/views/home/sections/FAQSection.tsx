import { FAQAccordion } from "@/views/shared/sections/FAQAccordion";
import { HOME_FAQS } from "@/constants";

export function FAQSection() {
  return (
    <section className="section section--light section-pad" aria-label="Frequently asked questions">
      <div className="section-inner site-container--narrow">
        <header className="section-header section-header--center">
          <h2 className="heading-display heading-display--dark whitespace-nowrap">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
        </header>

        <div className="section-body content-medium">
          <FAQAccordion faqs={HOME_FAQS} defaultOpenIndex={5} />
        </div>
      </div>
    </section>
  );
}
