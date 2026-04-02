/**
 * Статические данные для медиа: картинки галереи, видео, обложки услуг.
 * Папка `data/` — контент сайта (URL, пути к файлам в /public).
 */
/** Иллюстрации для блока «О нас» (услуги). */
export const SERVICE_IMAGES = {
  houses:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  apartments:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
} as const;

/** Пути к фото для галереи (локальные в /public/gallery или внешние в next.config). */
export const GALLERY_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0746e?w=900&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80",
];

export const GALLERY_IMAGES_MOCK_EXTRA: string[] = [
  "https://images.unsplash.com/photo-1600585154087-4e5fe7c5d3e0?w=900&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&q=80",
  "https://images.unsplash.com/photo-1600585154363-67ebad3d0086?w=900&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=900&q=80",
  "https://images.unsplash.com/photo-1600585152911-dfcbec0ce539?w=900&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80",
];

/** Видео с объекта — файлы в /public (при необходимости замените пути). */
export const MEDIA = {
  videos: [
    { src: "/upscaled-anim.mp4", title: "С объекта: общий ход работ" },
    { src: "/anim.mp4", title: "С объекта: детали монтажа" },
    { src: "/hero-bg.mp4", title: "С объекта: обзор площадки" },
  ],
} as const;
