"use client";

import { useCallback, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CONTACT, externalLinkProps } from "@/data/contacts";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const [sending, setSending] = useState(false);
  const [formHint, setFormHint] = useState<{
    kind: "ok" | "err";
    text: string;
  } | null>(null);

  const submitForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    setFormHint(null);
    const accessKey = process.env.NEXT_PUBLIC_FORM_ID?.trim();
    if (!accessKey) {
      setFormHint({
        kind: "err",
        text: "Не задан NEXT_PUBLIC_FORM_ID в .env.local — см. .env.example",
      });
      return;
    }
    setSending(true);
    try {
      // Web3Forms: бесплатный тариф принимает запросы только с клиента (не с API-роута).
      const res = await fetch(
        "https://formspree.io/f/" + process.env.NEXT_PUBLIC_FORM_ID,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name || "—",
            email,
            message,
            subject: `Заявка с сайта — ${name}`,
          }),
        },
      );
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        success?: boolean;
        next?: string;
        message?: string;
        error?: string;
      };
      const isOk = data.ok === true || data.success === true;
      if (!res.ok) {
        const err =
          (typeof data.error === "string" && data.error) ||
          (typeof data.message === "string" && data.message) ||
          "Не удалось отправить. Попробуйте ещё раз.";
        setFormHint({ kind: "err", text: err });
        return;
      }
      if (!isOk) {
        const err =
          (typeof data.error === "string" && data.error) ||
          (typeof data.message === "string" && data.message) ||
          "Не удалось отправить. Попробуйте ещё раз.";
        setFormHint({ kind: "err", text: err });
        return;
      }
      setFormHint({
        kind: "ok",
        text: "Форма успешно отправлена. С вами свяжутся.",
      });
      form.reset();
    } catch {
      setFormHint({
        kind: "err",
        text: "Нет сети или сервер недоступен. Проверьте подключение.",
      });
    } finally {
      setSending(false);
    }
  }, []);

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
                aria-label="Телефон, почта и мессенджеры"
              >
                <span className={styles.metaCity}>Москва</span>
                <a
                  href={`tel:${CONTACT.phone.tel}`}
                  className={styles.contactLink}
                >
                  {CONTACT.phone.display}
                </a>
                <a
                  href={`mailto:${CONTACT.email.address}`}
                  className={styles.contactLink}
                >
                  {CONTACT.email.address}
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

            <form className={styles.form} onSubmit={submitForm}>
              <label className={styles.field}>
                <span>Имя</span>
                <input type="text" name="name" autoComplete="name" />
              </label>
              <label className={styles.field}>
                <span>Электронная почта</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label className={styles.field}>
                <span>Сообщение</span>
                <textarea name="message" rows={4} required minLength={3} />
              </label>
              <MagneticButton
                type="submit"
                variant="ghost"
                className={styles.submit}
                disabled={sending}
              >
                {sending ? "Отправка…" : "Отправить запрос"}
              </MagneticButton>
              <p
                className={`${styles.formStatus} ${
                  formHint?.kind === "ok"
                    ? styles.formStatusSuccess
                    : formHint?.kind === "err"
                      ? styles.formStatusError
                      : ""
                }`}
                role="status"
                aria-live="polite"
              >
                {formHint?.text ?? "\u00a0"}
              </p>
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
