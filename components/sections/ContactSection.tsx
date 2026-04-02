"use client";

import { motion } from "framer-motion";
import { CONTACT, externalLinkProps } from "@/data/contacts";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <SectionReveal>
          <div className={styles.grid}>
            <div className={styles.copy}>
              <h2 className={styles.heading}>Контакты</h2>
              <p className={styles.text}>
                Расскажите о задаче — ответим с вилкой по срокам и формату
                сотрудничества в течение двух рабочих дней.
              </p>
              <nav
                className={styles.contactColumn}
                aria-label="Телефон и мессенджеры"
              >
                <span className={styles.metaCity}>Москва</span>
                <a
                  href={`tel:${CONTACT.phone.tel}`}
                  className={styles.contactLink}
                >
                  {CONTACT.phone.display}
                </a>
                {CONTACT.social.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    className={styles.contactLink}
                    {...externalLinkProps(s.href)}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.08 * (i + 1),
                      duration: 0.65,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <label className={styles.field}>
                <span>Имя</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={styles.field}>
                <span>Электронная почта</span>
                <input type="email" name="email" autoComplete="email" />
              </label>
              <label className={styles.field}>
                <span>Сообщение</span>
                <textarea name="message" rows={4} />
              </label>
              <MagneticButton
                type="submit"
                variant="ghost"
                className={styles.submit}
              >
                Отправить запрос
              </MagneticButton>
            </form>
          </div>
        </SectionReveal>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Алфа Групп</span>
          <span className={styles.siteId}>alfa-group</span>
        </div>
      </div>
    </footer>
  );
}
