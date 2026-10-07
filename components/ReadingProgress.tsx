import { useEffect, useRef } from "react";

import styles from "./ReadingProgress.module.css";

export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={styles.track}>
      <div ref={bar} className={styles.bar} />
    </div>
  );
}
