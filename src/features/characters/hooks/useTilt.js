import { useEffect, useRef } from 'react';

const lerp = (a, b, t) => a + (b - a) * t;

export function useTilt(slideRef, enabled = true, currentIndex = 0) {
  const rafIdRef = useRef(null);
  const rotRef = useRef({ x: 0, y: 0 });
  const bgPosRef = useRef({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const targetBgRef = useRef({ x: 0, y: 0 });
  const lerpAmountRef = useRef(0.06);

  useEffect(() => {
    const el = slideRef?.current;
    if (!enabled || !el) return;

    const onMouseMove = (e) => {
      lerpAmountRef.current = 0.1;
      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      const rotY = (offsetX - w * 0.5) / (Math.PI * 3);
      const rotX = -(offsetY - h * 0.5) / (Math.PI * 4);
      targetRotRef.current = { x: rotX, y: rotY };
      targetBgRef.current = { x: -rotY * 0.3, y: rotX * 0.3 };
    };

    const onMouseLeave = () => {
      lerpAmountRef.current = 0.06;
      targetRotRef.current = { x: 0, y: 0 };
      targetBgRef.current = { x: 0, y: 0 };
    };

    const tick = () => {
      const t = lerpAmountRef.current;
      rotRef.current.x = lerp(rotRef.current.x, targetRotRef.current.x, t);
      rotRef.current.y = lerp(rotRef.current.y, targetRotRef.current.y, t);
      bgPosRef.current.x = lerp(bgPosRef.current.x, targetBgRef.current.x, t);
      bgPosRef.current.y = lerp(bgPosRef.current.y, targetBgRef.current.y, t);

      const inner = el.querySelector?.('[data-tilt-inner]');
      const img = el.querySelector?.('[data-tilt-image]');
      if (inner) {
        inner.style.setProperty('--rotX', `${rotRef.current.x.toFixed(2)}deg`);
        inner.style.setProperty('--rotY', `${rotRef.current.y.toFixed(2)}deg`);
      }
      if (img) {
        img.style.setProperty('--bgPosX', `${bgPosRef.current.x.toFixed(2)}%`);
        img.style.setProperty('--bgPosY', `${bgPosRef.current.y.toFixed(2)}%`);
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [enabled, currentIndex, slideRef]);
}
