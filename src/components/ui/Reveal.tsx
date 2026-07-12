"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeUp,
  fadeUpSoft,
  labelReveal,
  premiumEase,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "soft" | "label";
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "default",
}: RevealProps) {
  const reduced = useReducedMotion();
  const variants =
    variant === "label" ? labelReveal : variant === "soft" ? fadeUpSoft : fadeUp;

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Stagger({ children, className, delay = 0 }: StaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUpSoft}>
      {children}
    </motion.div>
  );
}

type HeroRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h1" | "h2" | "span";
};

export function HeroReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: HeroRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const motionProps = {
    className,
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, delay, ease: premiumEase },
  };

  if (as === "h1") return <motion.h1 {...motionProps}>{children}</motion.h1>;
  if (as === "h2") return <motion.h2 {...motionProps}>{children}</motion.h2>;
  if (as === "p") return <motion.p {...motionProps}>{children}</motion.p>;
  if (as === "span") return <motion.span {...motionProps}>{children}</motion.span>;
  return <motion.div {...motionProps}>{children}</motion.div>;
}
