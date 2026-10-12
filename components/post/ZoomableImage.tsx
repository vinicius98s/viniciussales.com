import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import t from "@styles/typography.module.css";
import styles from "./ZoomableImage.module.css";

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const TAP_ZOOM = 2.5;

type View = { scale: number; x: number; y: number };
type Point = { x: number; y: number };

const IDENTITY: View = { scale: 1, x: 0, y: 0 };

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
};

export default function ZoomableImage({ src, alt, ...props }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [view, setView] = useState<View>(IDENTITY);
  const [gesturing, setGesturing] = useState(false);

  // Live gesture state, kept out of React so pointermove stays cheap.
  const pointers = useRef(new Map<number, Point>());
  const pinch = useRef<{ distance: number; mid: Point } | null>(null);
  const moved = useRef(false);
  const lastTap = useRef(0);
  const downTarget = useRef<EventTarget | null>(null);
  const viewRef = useRef(view);

  const apply = useCallback((next: View) => {
    viewRef.current = next;
    setView(next);
  }, []);

  // Keeps the image covering the stage so it can't be dragged out of sight.
  const bound = useCallback((next: View): View => {
    const s = stage.current;
    const i = img.current;
    if (!s || !i) return next;
    const scale = clamp(next.scale, MIN_SCALE, MAX_SCALE);
    const maxX = Math.max(0, (i.offsetWidth * scale - s.clientWidth) / 2);
    const maxY = Math.max(0, (i.offsetHeight * scale - s.clientHeight) / 2);
    return {
      scale,
      x: clamp(next.x, -maxX, maxX),
      y: clamp(next.y, -maxY, maxY),
    };
  }, []);

  // Zooms to `scale` while keeping the content under `at` in place.
  const zoomAt = useCallback(
    (scale: number, at: Point) => {
      const s = stage.current;
      if (!s) return;
      const rect = s.getBoundingClientRect();
      const px = at.x - rect.left - rect.width / 2;
      const py = at.y - rect.top - rect.height / 2;
      const prev = viewRef.current;
      const next = clamp(scale, MIN_SCALE, MAX_SCALE);
      const ratio = next / prev.scale;
      apply(
        bound({
          scale: next,
          x: px - (px - prev.x) * ratio,
          y: py - (py - prev.y) * ratio,
        })
      );
    },
    [apply, bound]
  );

  const open = () => {
    apply(IDENTITY);
    dialog.current?.showModal();
  };

  const close = () => dialog.current?.close();

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      pointers.current.clear();
      pinch.current = null;
      apply(IDENTITY);
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, [apply]);

  // React's onWheel is passive, so preventDefault needs a native listener.
  useEffect(() => {
    const s = stage.current;
    if (!s) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.002));
      zoomAt(viewRef.current.scale * factor, { x: e.clientX, y: e.clientY });
    };
    s.addEventListener("wheel", onWheel, { passive: false });
    return () => s.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  const pinchState = () => {
    const [a, b] = [...pointers.current.values()];
    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y),
      mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      moved.current = false;
      downTarget.current = e.target;
    }
    if (pointers.current.size === 2) pinch.current = pinchState();
    setGesturing(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const point = { x: e.clientX, y: e.clientY };
    if (Math.hypot(point.x - prev.x, point.y - prev.y) > 2) {
      moved.current = true;
    }
    pointers.current.set(e.pointerId, point);

    if (pointers.current.size >= 2 && pinch.current) {
      const next = pinchState();
      const v = viewRef.current;
      // Pan with the midpoint, then zoom around it.
      viewRef.current = {
        ...v,
        x: v.x + next.mid.x - pinch.current.mid.x,
        y: v.y + next.mid.y - pinch.current.mid.y,
      };
      zoomAt(v.scale * (next.distance / pinch.current.distance), next.mid);
      pinch.current = next;
    } else if (pointers.current.size === 1 && viewRef.current.scale > 1) {
      const v = viewRef.current;
      apply(
        bound({ ...v, x: v.x + point.x - prev.x, y: v.y + point.y - prev.y })
      );
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size > 0) return;
    setGesturing(false);
    if (moved.current) return;

    // A double tap (or double click) toggles between fit and zoomed in.
    const now = e.timeStamp;
    if (now - lastTap.current < 300) {
      lastTap.current = 0;
      if (viewRef.current.scale > 1) apply(IDENTITY);
      else zoomAt(TAP_ZOOM, { x: e.clientX, y: e.clientY });
    } else {
      lastTap.current = now;
      // A single tap on the backdrop closes the viewer when it isn't zoomed.
      // Pointer capture retargets pointerup, so check where the tap started.
      if (downTarget.current === stage.current && viewRef.current.scale === 1) {
        close();
      }
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const center = stage.current?.getBoundingClientRect();
    if (!center) return;
    const mid = {
      x: center.left + center.width / 2,
      y: center.top + center.height / 2,
    };
    if (e.key === "+" || e.key === "=") zoomAt(view.scale * 1.5, mid);
    else if (e.key === "-") zoomAt(view.scale / 1.5, mid);
    else if (e.key === "0") apply(IDENTITY);
  };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={open}
        aria-label={`Enlarge image${alt ? `: ${alt}` : ""}`}
      >
        <Image src={src} alt={alt} {...props} />
        <span className={`${t.mono} ${styles.hint}`} aria-hidden>
          ⤢
        </span>
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={alt || "Image viewer"}
        onKeyDown={onKeyDown}
      >
        <div
          ref={stage}
          className={styles.stage}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- the original file, so details survive zooming */}
          <img
            ref={img}
            src={src}
            alt={alt}
            draggable={false}
            className={styles.full}
            data-zoomed={view.scale > 1 || undefined}
            data-gesturing={gesturing || undefined}
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            }}
          />
        </div>
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${t.mono} ${styles.control}`}
            onClick={() => apply(IDENTITY)}
            disabled={view.scale === 1}
            aria-label="Reset zoom"
          >
            {Math.round(view.scale * 100)}%
          </button>
          <button
            type="button"
            className={`${t.mono} ${styles.control}`}
            onClick={close}
            aria-label="Close"
            autoFocus
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}
