import Link from "next/link";

import ThemeToggle from "@components/ThemeToggle";
import ReadingProgress from "@components/ReadingProgress";

import t from "@styles/typography.module.css";
import styles from "./Header.module.css";

const NAV = [
  { n: "01", label: "Writing", href: "/#writing" },
  { n: "02", label: "About", href: "/#about" },
  { n: "03", label: "Contact", href: "/#contact" },
];

type Props = { showProgress?: boolean };

export default function Header({ showProgress = false }: Props) {
  return (
    <header className={styles.header}>
      <div className={`${t.container} ${styles.inner}`}>
        <Link href="/" className={`${t.display} ${styles.logo}`}>
          vs<span className={styles.dot}>.</span>
        </Link>
        <nav className={`${t.label} ${styles.nav}`}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              <span className={styles.navNumber}>{item.n}</span>
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
      {showProgress && <ReadingProgress />}
    </header>
  );
}
