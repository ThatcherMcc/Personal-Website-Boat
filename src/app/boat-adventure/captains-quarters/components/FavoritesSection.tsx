"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FavoritesGrouped } from "../configs/FavoritesConfigs";

export default function FavoritesSection() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 px-4">
      {FavoritesGrouped.map((group, groupIdx) => (
        <div key={group.name} className="flex flex-col gap-5">
          {/* Category Header — Dark Souls UI divider style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: groupIdx * 0.08 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(160,120,40,0.4)] to-transparent" />
            <span
              className="font-cormorant text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#c4973a" }}
            >
              {group.name}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(160,120,40,0.4)] to-transparent" />
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {group.items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.07,
                  ease: "easeOut",
                }}
                viewport={{ once: true, margin: "-40px" }}
                className="group flex flex-col md:flex-row items-stretch gap-0 rounded-xl overflow-hidden cursor-default transition-all duration-300"
                style={{
                  background: "rgba(22, 12, 4, 0.75)",
                  border: "1px solid rgba(140, 100, 30, 0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(200, 150, 50, 0.40)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(120, 60, 0, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(140, 100, 30, 0.18)";
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.transform = "";
                }}
              >
                {/* Image */}
                <div className="relative w-full md:w-44 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.altText}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 176px"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Warm gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(180, 90, 20, 0.15), transparent 60%)",
                    }}
                  />
                  {/* Bottom depth gradient */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(transparent, rgba(18,8,2,0.6))",
                    }}
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center p-4 md:p-5 gap-1.5 text-center md:text-left">
                  <span
                    className="inline-block self-center md:self-start font-cormorant text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase px-2 py-0.5 rounded"
                    style={{
                      color: "#d4a04a",
                      background: "rgba(175,115,28,0.14)",
                      border: "1px solid rgba(175,115,28,0.25)",
                    }}
                  >
                    {item.category}
                  </span>
                  <h4
                    className="text-xl md:text-2xl font-bold font-cormorant leading-tight mt-1"
                    style={{ color: "#e8dcc8" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="font-cormorant text-sm md:text-base leading-relaxed mt-1"
                    style={{ color: "#9a8e7e" }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
