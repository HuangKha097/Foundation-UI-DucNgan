import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "article";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
      variants={variants}
    >
      {children}
    </Comp>
  );
}

export function RevealStagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};
