/**
 * Статические данные контактов (телефон, мессенджеры).
 * Папка `data/` — не «библиотека», а контент/конфиг сайта, без UI.
 */
/** Единые контакты сайта — телефон в tel/wa совпадает. */
export const CONTACT = {
  phone: {
    tel: "+79051636954",

    display: "+7 (905) 163-69-54",
  },
  email: {
    address: "alfa.montazh@mail.ru",
  },
  social: [
    { label: "Telegram", href: "https://t.me/alex_panaskov" },
    { label: "WhatsApp", href: "https://wa.me/79051636954" },
  ],
} as const;

/** Только http(s): новая вкладка + безопасный rel. tel/mailto — без target. */
export function externalLinkProps(href: string) {
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return {
      target: "_blank" as const,
      rel: "noopener noreferrer",
    };
  }
  return {};
}
