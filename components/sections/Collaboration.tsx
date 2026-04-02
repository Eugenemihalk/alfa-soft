"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./Collaboration.module.css";

export function Collaboration() {
  return (
    <section id="partnership" className={styles.section}>
      <div className={styles.shell}>
        <SectionReveal>
          <p className={styles.eyebrow}>Для архитекторов и дизайнеров</p>
          <h2 className={styles.heading}>
            Строим вашу идею с техническим совершенством
          </h2>
          <p className={styles.lede}>
            Сопровождаем проект от концепции до сдачи: BIM-согласования,
            узлы, образцы материалов, авторский надзор. Одна команда —
            один стандарт, понятный и вам, и заказчику.
          </p>
          <ul className={styles.list}>
            <li>Совместные презентации и защита решений</li>
            <li>Прозрачная смета и календарь без «сюрпризов»</li>
            <li>Инженеры и прорабы, говорящие на языке проекта</li>
          </ul>
          <div className={styles.cta}>
            <MagneticButton
              variant="ghost"
              onClick={() => {
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Обсудить коллаборацию
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
