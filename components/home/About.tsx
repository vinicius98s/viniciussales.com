import t from "@styles/typography.module.css";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <span className={`${t.label} ${styles.label}`}>02 — About</span>
      <div className={styles.content}>
        <p className={`${t.display} ${styles.lead}`}>
          Full-stack developer, comfortable on{" "}
          <span className={styles.accent}>both sides</span> of the wire.
        </p>
        <p className={styles.bio}>
          A seasoned full-stack developer with a strong background in both
          front-end and back-end technologies. Proficient in React, Node.js,
          Typescript, and Functional Programming. I have a proven track record
          of developing, maintaining, and enhancing web applications, excel in
          modernizing codebases, implementing new features, and ensuring high
          code quality standards. My expertise is backed by a proactive approach
          to continuous learning and professional growth.
        </p>
      </div>
    </section>
  );
}
