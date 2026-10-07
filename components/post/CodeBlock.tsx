import { useEffect, useRef, useState } from "react";

import t from "@styles/typography.module.css";
import styles from "./CodeBlock.module.css";

type Props = { filename: string; code: string; html: string };

export default function CodeBlock({ filename, code, html }: Props) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={styles.block}>
      <div className={`${t.mono} ${styles.bar}`}>
        <span className={styles.filename}>{filename}</span>
        <button type="button" onClick={copy} className={styles.copy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <div
        className={`${t.mono} ${styles.code}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
