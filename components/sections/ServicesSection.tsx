"use client";

import Image from "next/image";
import Link from "next/link";
import { SERVICE_IMAGES } from "@/data/media";
import { SectionReveal, StaggerItem } from "@/components/ui/SectionReveal";
import styles from "./ServicesSection.module.css";

const blocks = [
  {
    title: "Частные дома",
    body: "От типового проекта до индивидуального: фундамент, коробка, кровля, инженерия. Сопровождаем согласования и поставки, чтобы сроки не расползались.",
    image: SERVICE_IMAGES.houses,
    align: "row" as const,
  },
  {
    title: "Ремонт квартир",
    body: "Черновая и чистовая отделка, перепланировки с узакониванием, сантехника и электрика. Демонтаж и вывоз — внутри сметы, без скрытых строк.",
    image: SERVICE_IMAGES.apartments,
    align: "rowReverse" as const,
  },
];

export function ServicesSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.shell}>
        <SectionReveal>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>О нас</p>
            <h2 className={styles.heading}>
              Дома и квартиры — разные задачи, один подход к дисциплине на
              площадке
            </h2>
          </div>
        </SectionReveal>

        <div className={styles.list}>
          {blocks.map((b, i) => (
            <StaggerItem key={b.title} index={i}>
              <article
                className={
                  b.align === "row" ? styles.block : styles.blockReverse
                }
              >
                <div className={styles.media}>
                  <Image
                    src={encodeURI(b.image)}
                    alt={`${b.title} — пример объекта`}
                    fill
                    className={styles.image}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
                <div className={styles.textCol}>
                  <h3 className={styles.title}>{b.title}</h3>
                  <p className={styles.body}>{b.body}</p>
                  <Link href="#contact" className={styles.link}>
                    Запросить оценку
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
