import { GitHubIcon, LinkedInIcon } from "@components/Icons";

import t from "@styles/typography.module.css";
import styles from "./Contact.module.css";

const EMAIL = "vinicius.2010.s@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/vinicius98s", Icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/vinicius-sales",
    Icon: LinkedInIcon,
  },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <span className={`${t.label} ${styles.label}`}>03 — Contact</span>
      <p className={`${t.display} ${styles.title}`}>
        Say hi<span className={styles.accent}>.</span>
      </p>
      <a href={`mailto:${EMAIL}`} className={`${t.display} ${styles.email}`}>
        {EMAIL}
      </a>
      <div className={styles.socials}>
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`${t.mono} ${styles.social}`}
          >
            <Icon />
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
