"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { MEDIA } from "@/data/media";
import { SectionReveal } from "@/components/ui/SectionReveal";
import styles from "./VideosSection.module.css";

const spring = {
  type: "spring" as const,
  damping: 30,
  stiffness: 210,
  mass: 0.85,
};

/** Свернуто: виден первый ролик целиком; развернуто — все. */
const COLLAPSED_MAX_PX = 760;

export function VideosSection() {
  const [expanded, setExpanded] = useState(false);
  const hasSeveral = MEDIA.videos.length > 1;

  return (
    <section id="videos" className={styles.section}>
      <div className={styles.shell}>
        <SectionReveal>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Видео</p>
            <h2 className={styles.heading}>С объекта: ход работ</h2>
          </div>
        </SectionReveal>

        <div className={styles.expandRegion}>
          <motion.div
            className={styles.listOuter}
            initial={false}
            animate={{
              maxHeight: hasSeveral && !expanded ? COLLAPSED_MAX_PX : 12000,
            }}
            transition={spring}
            style={{ overflow: hasSeveral ? "hidden" : "visible" }}
          >
            <div className={styles.grid}>
              {MEDIA.videos.map((v, i) => (
                <motion.div
                  key={`${v.src}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    type: "spring",
                    stiffness: 92,
                    damping: 21,
                    mass: 0.82,
                    delay: i * 0.07,
                  }}
                  className={styles.card}
                >
                  <div className={styles.videoShell}>
                    <div className={styles.videoWrap}>
                      <video
                        className={styles.video}
                        controls
                        playsInline
                        preload="metadata"
                        title={v.title}
                      >
                        <source src={v.src} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <p className={styles.caption}>{v.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {hasSeveral && !expanded ? (
            <div className={styles.fadeEdge} aria-hidden />
          ) : null}

          {hasSeveral ? (
            <div className={styles.ctaRow}>
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
              >
                <span>{expanded ? "Свернуть" : "Показать ещё"}</span>
                <CaretDown
                  className={`${styles.caret} ${expanded ? styles.caretOpen : ""}`}
                  weight="bold"
                  aria-hidden
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
