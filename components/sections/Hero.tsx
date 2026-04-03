"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./Hero.module.css";

const ease = [0.32, 0.72, 0, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <motion.div className={styles.bgWrap} style={{ y, opacity }}>
        <div className={styles.bgMedia}>
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src="/videos/upscaled-anim.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.bgScrim} aria-hidden />
      </motion.div>

      <div className={styles.content}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        >
          Строительная компания премиум-класса
        </motion.p>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease, delay: 0.35 }}
        >
          Алфа Групп
          <span className={styles.titleLine}>
            Архитектура в точной геометрии
          </span>
        </motion.h1>
        <motion.p
          className={styles.lede}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease, delay: 0.55 }}
        >
          Реализуем замыслы архитекторов и дизайнеров интерьера — с инженерной
          дисциплиной, безупречной отделкой и технологией, достойной обложки
          журнала.
        </motion.p>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease }}
        aria-hidden
      >
        <span className={styles.scrollText}>Листайте</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
