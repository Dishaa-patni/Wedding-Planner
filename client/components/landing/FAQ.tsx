'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQS } from '@/constants'

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
            Questions? <span className="gradient-text">We have answers.</span>
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
        </motion.div>

        <div className="glass rounded-2xl p-4 md:p-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`item-${i}`}
                className="border-[#B76E79]/10"
              >
                <AccordionTrigger className="text-left font-display text-lg md:text-xl hover:text-[#B76E79] hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
