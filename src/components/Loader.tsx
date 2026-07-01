"use client";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-16">
      <div className="flex items-end gap-2 h-10">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-3 bg-foreground"
            initial={{ height: "20%" }}
            animate={{ height: ["20%", "100%", "20%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
        Extracting & Stitching...
      </p>
    </div>
  );
}
