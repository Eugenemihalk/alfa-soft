"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { type ReactNode, useCallback, useRef } from "react";
import styles from "./MagneticButton.module.css";

const spring = { stiffness: 280, damping: 22, mass: 0.6 };

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
} & Omit<HTMLMotionProps<"button">, "children">;

export function MagneticButton({
  children,
  className,
  variant = "primary",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(dx * 0.18);
      y.set(dy * 0.18);
    },
    [x, y]
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const { type = "button", ...buttonRest } = rest as MagneticButtonProps & {
    type?: "button" | "submit" | "reset";
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={`${styles.shell} ${styles[variant]} ${className ?? ""}`}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      {...buttonRest}
    >
      <span className={styles.inner}>
        <span className={styles.underlineTrack} aria-hidden />
        {children}
      </span>
    </motion.button>
  );
}
