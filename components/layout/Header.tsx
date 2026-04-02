"use client";

import { motion, useScroll, useMotionTemplate, useTransform } from "framer-motion";
import { useCallback } from "react";
import styles from "./Header.module.css";

const nav = [
  { href: "#about", label: "О нас" },
  { href: "#projects", label: "Галерея" },
  { href: "#videos", label: "Видео" },
  { href: "#partnership", label: "Партнёрство" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], [0, 16]);
  const bg = useTransform(
    scrollY,
    [0, 160],
    ["rgba(10, 10, 11, 0)", "rgba(10, 10, 11, 0.72)"]
  );
  const border = useTransform(
    scrollY,
    [0, 100],
    ["rgba(244, 241, 235, 0)", "rgba(244, 241, 235, 0.08)"]
  );
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;

  const scrollTo = useCallback((id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.header
      className={styles.root}
      style={{
        backgroundColor: bg,
        borderBottomColor: border,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
      }}
    >
      <div className={styles.inner}>
        <a href="#" className={styles.logo} onClick={(e) => e.preventDefault()}>
          <span className={styles.logoMark}>АГ</span>
          <span className={styles.logoText}>Алфа Групп</span>
        </a>
        <nav className={styles.nav} aria-label="Основная навигация">
          {nav.map((item) => (
            <button
              key={item.href}
              type="button"
              className={styles.navLink}
              onClick={() => scrollTo(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
