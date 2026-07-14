"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CountUpNumber } from "./CountUpNumber";

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "Digital Assets", value: "10,000+" },
  { label: "Total Volume", value: "$5M+" },
  { label: "Success Rate", value: "99.9%" },
];

export function Statistics() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center justify-center p-4"
            >
              <span className="text-4xl md:text-5xl font-extrabold mb-2"><CountUpNumber value={stat.value} /></span>
              <span className="text-sm md:text-base font-medium opacity-80 uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
