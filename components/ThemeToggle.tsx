import styles from "./ThemeToggle.module.css";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

// The initial theme is set on <html> by an inline script in _document, before
// first paint. The knob position is driven by CSS from that attribute, so this
// component needs no state and can't mismatch during hydration.
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color scheme"
      className={styles.toggle}
    >
      <span className={styles.knob} />
    </button>
  );
}
