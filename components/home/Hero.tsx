import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import type { PostPreview } from "@lib/posts";

import t from "@styles/typography.module.css";
import styles from "./Hero.module.css";

const LINE_1 = [..."Vinícius"];
const LINE_2 = [..."Sales"];

const TOPICS = [
  "React.",
  "Node.js.",
  "TypeScript.",
  "functional programming.",
  "modernizing codebases.",
];

const HOP_MS = 420;
const START_DELAY_MS = 250;

/**
 * The red period enters from the top-left, hops along curved paths across
 * "Vinícius" (n, c, s), drops to "Sales" (a, e) and settles as the full stop.
 * Each letter it lands on dips slightly.
 */
function runMotionPath(h1: HTMLElement): Animation[] {
  const dot = h1.querySelector<HTMLElement>("[data-dot]");
  const twin = h1.querySelector<HTMLElement>("[data-twin]");
  const line1 = [...h1.querySelectorAll<HTMLElement>('[data-l="1"]')];
  const line2 = [...h1.querySelectorAll<HTMLElement>('[data-l="2"]')];
  const base1 = h1.querySelector<HTMLElement>('[data-base="1"]');
  const base2 = h1.querySelector<HTMLElement>('[data-base="2"]');
  if (!dot || !twin || !base1 || !base2) return [];

  const origin = h1.getBoundingClientRect();
  const fontSize = parseFloat(getComputedStyle(h1).fontSize);
  const rel = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left - origin.left,
      y: r.top - origin.top,
      w: r.width,
      h: r.height,
    };
  };
  const centerX = (el: HTMLElement) => {
    const r = rel(el);
    return r.x + r.w / 2;
  };

  const tw = rel(twin);
  const b1 = rel(base1).y;
  const b2 = rel(base2).y;
  // The dot glyph's own baseline offset, so its center lands on the x-height.
  const delta = tw.y + tw.h / 2 - b2;
  const xHeight = 0.53 * fontSize;

  const landings: [HTMLElement, number][] = [
    [line1[2], b1],
    [line1[4], b1],
    [line1[7], b1],
    [line2[1], b2],
    [line2[3], b2],
  ];
  const points: { x: number; y: number; el: HTMLElement | null }[] = [
    { x: -0.25 * fontSize, y: b1 - 1.5 * fontSize + delta, el: null },
    ...landings.map(([el, b]) => ({
      x: centerX(el),
      y: b - xHeight + delta,
      el,
    })),
    { x: tw.x + tw.w / 2, y: tw.y + tw.h / 2, el: null },
  ];

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  const partials: string[] = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const hop = i === 1 ? 0.2 * fontSize : 0.9 * fontSize;
    const cx = (a.x + b.x) / 2;
    const cy = Math.min(a.y, b.y) - hop;
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    partials.push(d);
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const lengthOf = (pathData: string) => {
    path.setAttribute("d", pathData);
    return path.getTotalLength();
  };
  const total = lengthOf(d);
  const cumulative = [0, ...partials.map(lengthOf)];
  const hops = cumulative.length - 1;

  dot.style.offsetPath = `path('${d}')`;
  dot.style.opacity = "1";
  twin.style.color = "transparent";

  const main = dot.animate(
    cumulative.map((length, i) => ({
      offset: i / hops,
      offsetDistance: `${(length / total) * 100}%`,
      easing: "cubic-bezier(.5,0,.5,1)",
    })),
    { duration: HOP_MS * hops, delay: START_DELAY_MS, fill: "both" }
  );
  main.onfinish = () => {
    twin.style.color = "";
    dot.style.opacity = "0";
  };

  const dips = points.flatMap((point, i) =>
    point.el
      ? [
          point.el.animate(
            [
              { transform: "translateY(0)" },
              { transform: "translateY(0.05em)", offset: 0.35 },
              { transform: "translateY(0)" },
            ],
            {
              duration: 360,
              delay: START_DELAY_MS + i * HOP_MS - 20,
              easing: "ease-out",
            }
          ),
        ]
      : []
  );

  return [main, ...dips];
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Name() {
  const ref = useRef<HTMLHeadingElement>(null);
  const animations = useRef<Animation[]>([]);

  const play = () => {
    if (!ref.current || prefersReducedMotion()) return;
    animations.current.forEach((a) => a.cancel());
    animations.current = runMotionPath(ref.current);
  };

  useEffect(() => {
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    document.fonts.ready.then(() => {
      if (!cancelled) timeout = setTimeout(play, 120);
    });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      animations.current.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <h1
      ref={ref}
      onClick={play}
      aria-label="Vinícius Sales"
      title="Click to replay"
      className={`${t.display} ${styles.name}`}
    >
      <span className={styles.nameLine} aria-hidden="true">
        {LINE_1.map((letter, i) => (
          <span key={i} data-l="1" className={styles.letter}>
            {letter}
          </span>
        ))}
        <span data-base="1" className={styles.baseline} />
      </span>
      <span className={styles.nameLine} aria-hidden="true">
        {LINE_2.map((letter, i) => (
          <span key={i} data-l="2" className={styles.letter}>
            {letter}
          </span>
        ))}
        <span data-twin="1" className={styles.period}>
          .
        </span>
        <span data-base="2" className={styles.baseline} />
      </span>
      <span data-dot="1" aria-hidden="true" className={styles.flyingDot}>
        .
      </span>
    </h1>
  );
}

function RotatingTopic() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % TOPICS.length),
      2400
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={styles.topicWindow}>
      <span
        className={styles.topicReel}
        style={{ transform: `translateY(-${index * 1.15}em)` }}
      >
        {TOPICS.map((topic, i) => (
          <span key={topic} className={styles.topic} aria-hidden={i !== index}>
            {topic}
          </span>
        ))}
      </span>
    </span>
  );
}

type Props = { draft: PostPreview | undefined };

export default function Hero({ draft }: Props) {
  return (
    <section className={styles.hero}>
      <p className={`${t.label} ${styles.role}`}>
        Software Development Engineer
      </p>
      <Name />
      <div className={styles.bottom}>
        <p className={`${t.display} ${styles.writeAbout}`}>
          <span className={styles.block}>I write about</span>
          <RotatingTopic />
        </p>
        {draft && (
          <Link href={`/blog/${draft.slug}`} className={styles.draft}>
            <span className={`${t.mono} ${styles.draftLabel}`}>
              <span className={styles.pulse} />
              <span className={styles.draftLabelText}>Now drafting</span>
            </span>
            <span className={`${t.display} ${styles.draftTitle}`}>
              {draft.title}
            </span>
            <span className={`${t.mono} ${styles.draftCta}`}>
              Read the draft →
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
