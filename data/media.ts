/**
 * Статические данные для медиа: картинки галереи, видео, обложки услуг.
 * Папка `data/` — контент сайта (URL, пути к файлам в /public).
 */
/** Иллюстрации для блока «О нас» (услуги). */
export const SERVICE_IMAGES = {
  houses: "/services/house.jpeg",
  apartments: "/services/appartments.jpeg",
} as const;

/** Пути к фото для галереи (локальные в /public/gallery или внешние в next.config). */
export const GALLERY_IMAGES: string[] = [
  "/gallery/1.jpeg",
  "/gallery/2.jpeg",
  "/gallery/3.jpeg",
  "/gallery/4.jpeg",
  "/gallery/5.jpeg",
  "/gallery/6.jpeg",
];

export const GALLERY_IMAGES_MOCK_EXTRA: string[] = [
  "/gallery/7.jpeg",
  "/gallery/8.jpeg",
  "/gallery/9.jpeg",
  "/gallery/10.jpeg",
  "/gallery/11.jpeg",
  "/gallery/12.jpeg",
  "/gallery/13.jpeg",
  "/gallery/14.jpeg",
  "/gallery/15.jpeg",
];

/** Видео с объекта — файлы в /public (при необходимости замените пути). */
export const MEDIA = {
  videos: [
    { src: "/videos/10.mp4", title: "С объекта: общий ход работ" },
    { src: "/videos/11.mp4", title: "С объекта: детали монтажа" },
    { src: "/videos/12.mp4", title: "С объекта: заливка бетона" },
  ],
} as const;
