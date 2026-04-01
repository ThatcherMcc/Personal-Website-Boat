"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CardBack from "./CardBack";

type FlippableCardProps = {
  imageSrc: string;
  altText: string;
  category: string;
  title: string;
  description: string;
  categoryGroup: string;
  isRevealed: boolean;
  onReveal: () => void;
  /** Index within the group — used for stagger delay on whileInView */
  index: number;
};

export default function FlippableCard({
  imageSrc,
  altText,
  category,
  title,
  description,
  categoryGroup,
  isRevealed,
  onReveal,
  index,
}: FlippableCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => {
        if (!isRevealed) onReveal();
      }}
      role="button"
      tabIndex={0}
      aria-label={isRevealed ? title : `Reveal ${categoryGroup} favorite`}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isRevealed) {
          e.preventDefault();
          onReveal();
        }
      }}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{
          duration: 0.55,
          ease: [0.34, 1.56, 0.64, 1], // slight bounce
        }}
      >
        {/* ── Back face (visible when NOT flipped) ── */}
        <div
          className="relative w-full rounded-none overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            minHeight: "200px",
          }}
        >
          <div className="md:flex md:flex-row" style={{ minHeight: "200px" }}>
            {/* Match the front card layout dimensions for consistent sizing */}
            <div className="relative w-full md:w-44 h-48 md:h-auto flex-shrink-0" />
            <div className="p-4 md:p-5">
              {/* Invisible spacer matching front content height */}
              <span className="invisible font-cormorant text-[10px]">{category}</span>
              <h4 className="invisible text-xl md:text-2xl font-bold font-cormorant">{title}</h4>
              <p className="invisible font-cormorant text-sm md:text-base">{description}</p>
            </div>
          </div>
          <CardBack categoryGroup={categoryGroup} />
        </div>

        {/* ── Front face (visible when flipped to 180°) ── */}
        <div
          className="absolute inset-0 w-full rounded-none overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className="group flex flex-col md:flex-row items-stretch gap-0 h-full transition-all duration-300"
            style={{
              background: "rgba(22, 12, 4, 0.75)",
              border: "1px solid rgba(140, 100, 30, 0.18)",
              borderRadius: "0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(200, 150, 50, 0.40)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(120, 60, 0, 0.15)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(140, 100, 30, 0.18)";
              e.currentTarget.style.boxShadow = "";
              e.currentTarget.style.transform = "";
            }}
          >
            {/* Image */}
            <div className="relative w-full md:w-44 h-48 md:h-auto flex-shrink-0 overflow-hidden">
              <Image
                src={imageSrc}
                alt={altText}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 176px"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(180, 90, 20, 0.15), transparent 60%)",
                }}
              />
              <div
                className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
                style={{
                  background: "linear-gradient(transparent, rgba(18,8,2,0.6))",
                }}
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center p-4 md:p-5 gap-1.5 text-center md:text-left">
              <span
                className="inline-block self-center md:self-start font-cormorant text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase px-2 py-0.5"
                style={{
                  color: "#d4a04a",
                  background: "rgba(175,115,28,0.14)",
                  border: "1px solid rgba(175,115,28,0.25)",
                }}
              >
                {category}
              </span>
              <h4
                className="text-xl md:text-2xl font-bold font-cormorant leading-tight mt-1"
                style={{ color: "#e8dcc8" }}
              >
                {title}
              </h4>
              <p
                className="font-cormorant text-sm md:text-base leading-relaxed mt-1"
                style={{ color: "#9a8e7e" }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
