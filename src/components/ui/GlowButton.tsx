"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { BorderTrace } from "@/components/ui/BorderTrace";

type GlowButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  /** Traveling border light — only for hero "Havacılığı Öğren" */
  trace?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<"a"> & ComponentPropsWithoutRef<"button">, "type" | "href">;

export function GlowButton({
  children,
  href,
  variant = "primary",
  trace = false,
  className = "",
  type = "button",
  disabled,
  ...rest
}: GlowButtonProps) {
  const classes = [
    "neon-btn",
    variant === "primary" ? "neon-btn-primary" : "neon-btn-secondary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {trace && <BorderTrace shape="pill" intensity="strong" />}
      <span className="neon-btn-label">{children}</span>
    </>
  );

  if (href) {
    if (href.startsWith("#") || href.startsWith("http")) {
      return (
        <a href={href} className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      {...(rest as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  );
}
