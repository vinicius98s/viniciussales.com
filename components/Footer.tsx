import type { MouseEvent } from "react";

import t from "@styles/typography.module.css";
import styles from "./Footer.module.css";

const scrollToTop = (e: MouseEvent) => {
  e.preventDefault();
  window.scrollTo({ top: 0 });
};

export default function Footer() {
  return (
    <footer className={`${t.container} ${t.mono} ${styles.footer}`}>
      <span className={styles.copyright}>
        © {new Date().getFullYear()} Vinícius Sales
      </span>
      <a href="#" onClick={scrollToTop} className={styles.top}>
        Back to top ↑
      </a>
    </footer>
  );
}
