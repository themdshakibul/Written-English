"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Software", value: "Software", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Templates", value: "Templates", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "AI Models", value: "AI", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200&h=200" },
  { name: "Design Kits", value: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=200&h=200" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Categories() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold tracking-tight text-center mb-12"
      >
        Browse by Category
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto max-w-3xl">
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={itemVariants}>
            <Link href={`/explore?category=${cat.value}`}>
              <div className="bg-background border border-border/50 rounded-xl p-6 text-center hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-16 w-16 mx-auto rounded-full object-cover mb-3 ring-2 ring-border/50 group-hover:ring-primary/50 transition-all"
                />
                <h4 className="font-medium text-foreground group-hover:text-primary">{cat.name}</h4>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
