"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { FAQ_ANIMATION_EASE, type FAQItem } from "@/constants";
import { cn } from "@/lib/utils";

export type { FAQItem };

type FAQAccordionProps = {
  faqs: FAQItem[];
  defaultOpenIndex?: number;
};

export function FAQAccordion({ faqs, defaultOpenIndex = -1 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);
  const reduceMotion = useReducedMotion();

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={`${faq.question}-${index}`}
            layout
            initial={false}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { layout: { duration: 0.32, FAQ_ANIMATION_EASE } }
            }
            className={cn("faq-item", isOpen ? "faq-item--open" : "faq-item--closed")}
          >
            <button
              className="faq-item__trigger focus-ring"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
              aria-expanded={isOpen}
            >
              <span className="faq-item__question">{faq.question}</span>
              <motion.span
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.25, FAQ_ANIMATION_EASE }}
                aria-hidden
              >
                {isOpen ? (
                  <Minus className="faq-item__icon" strokeWidth={3} />
                ) : (
                  <Plus className="faq-item__icon" strokeWidth={3} />
                )}
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.32, FAQ_ANIMATION_EASE }}
                  className="faq-item__answer-wrap"
                >
                  <p className="faq-item__answer">{faq.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
