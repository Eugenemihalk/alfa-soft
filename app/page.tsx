import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { VideosSection } from "@/components/sections/VideosSection";
import { Collaboration } from "@/components/sections/Collaboration";
import { ContactSection } from "@/components/sections/ContactSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.grain} aria-hidden />
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <GallerySection />
        <VideosSection />
        <Collaboration />
        <ContactSection />
      </main>
    </div>
  );
}
