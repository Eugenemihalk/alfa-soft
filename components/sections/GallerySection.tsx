"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { GALLERY_IMAGES, GALLERY_IMAGES_MOCK_EXTRA } from "@/data/media";
import { SectionReveal } from "@/components/ui/SectionReveal";
import styles from "./GallerySection.module.css";

const frameHeights = [
  "h14",
  "h11",
  "h18",
  "h12",
  "h13",
  "h15",
  "h11",
  "h16",
  "h12",
  "h19",
  "h11",
  "h14",
] as const;

const heightClass: Record<(typeof frameHeights)[number], string> = {
  h14: styles.frameH14,
  h11: styles.frameH11,
  h18: styles.frameH18,
  h12: styles.frameH12,
  h13: styles.frameH13,
  h15: styles.frameH15,
  h16: styles.frameH16,
  h19: styles.frameH19,
};

const spring = {
  type: "spring" as const,
  damping: 30,
  stiffness: 210,
  mass: 0.85,
};

export function GallerySection() {
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(() => {
    const base = GALLERY_IMAGES.map((src, i) => ({ src, id: `base-${i}` }));
    const extra = GALLERY_IMAGES_MOCK_EXTRA.map((src, i) => ({
      src,
      id: `mock-${i}`,
    }));
    return [...base, ...extra];
  }, []);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.shell}>
        <SectionReveal>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Галерея</p>
            <h2 className={styles.heading}>
              Реальные площадки: от коробки до чистовой отделки
            </h2>
          </div>
        </SectionReveal>

        <div className={styles.expandRegion}>
          <motion.div
            className={styles.masonryOuter}
            initial={false}
            animate={{
              maxHeight: expanded ? 12000 : 560,
            }}
            transition={spring}
            style={{ overflow: "hidden" }}
          >
            <div
              className={`${styles.masonry} ${!expanded ? styles.masonryPeek : ""}`}
            >
              {items.map((item, i) => (
                <figure key={item.id} className={styles.figure}>
                  <div
                    className={`${styles.frame} ${heightClass[frameHeights[i % frameHeights.length]]}`}
                  >
                    <Image
                      src={encodeURI(item.src)}
                      alt={`Работа компании Алфа Групп, кадр ${i + 1}`}
                      fill
                      className={styles.image}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <figcaption className={styles.srOnly}>
                    Фото объекта {i + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </motion.div>

          {!expanded ? <div className={styles.fadeEdge} aria-hidden /> : null}

          <div className={styles.ctaRow}>
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setExpanded((v) => !v)}
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
        </div>
      </div>
    </section>
  );
}
