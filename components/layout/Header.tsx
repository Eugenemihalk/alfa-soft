"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import styles from "./Header.module.css";

const nav = [
  { href: "#about", label: "О нас" },
  { href: "#projects", label: "Галерея" },
  { href: "#videos", label: "Видео" },
  { href: "#partnership", label: "Партнёрство" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 120], [0, 16]);
  const bg = useTransform(
    scrollY,
    [0, 160],
    ["rgba(10, 10, 11, 0)", "rgba(10, 10, 11, 0.72)"],
  );
  const border = useTransform(
    scrollY,
    [0, 100],
    ["rgba(244, 241, 235, 0)", "rgba(244, 241, 235, 0.08)"],
  );
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
        <button
          type="button"
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={styles.burgerLine} aria-hidden />
          <span className={styles.burgerLine} aria-hidden />
          <span className={styles.burgerLine} aria-hidden />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-shell"
            className={styles.mobileShell}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          >
            <button
              type="button"
              className={styles.mobileBackdrop}
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              id="mobile-nav"
              className={styles.mobileNav}
              aria-label="Мобильная навигация"
            >
              <div className={styles.mobileNavHeader}>
                <span className={styles.mobileNavLogo}>Алфа Групп</span>
                <button
                  type="button"
                  className={styles.mobileClose}
                  aria-label="Закрыть меню"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.mobileCloseIcon} aria-hidden>
                    ×
                  </span>
                </button>
              </div>
              <div className={styles.mobileNavList}>
                {nav.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    className={styles.mobileNavLink}
                    onClick={() => scrollTo(item.href)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
