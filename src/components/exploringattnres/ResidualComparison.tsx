'use client';

import { useEffect, useRef, useState } from 'react';

const LAYER_W = 100;
const LAYER_H = 28;
const LAYER_GAP = 76;
const BOTTOM_Y = 390;

const LAYERS = ['Embedding', 'MHA 1', 'MLP 1', 'MHA 2'] as const;

const layerY = (i: number) => BOTTOM_Y - i * LAYER_GAP;

const STD_CX = 160;
const BYPASS_X = STD_CX - LAYER_W / 2 - 16;
const ADD_R = 9;

const addNodeY = (i: number) => {
  const topOfBox = layerY(i) - LAYER_H / 2;
  const bottomOfNext = layerY(i + 1) + LAYER_H / 2;
  return (topOfBox + bottomOfNext) / 2;
};

const AR_CX = 500;
const DB_X = 404;
const DB_ENTRY_W = 24;
const DB_ENTRY_H = 16;

const ALPHA: number[][] = [
  [],
  [1.0],
  [0.21, 0.79],
  [0.12, 0.33, 0.55],
];

export default function ResidualComparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const anim = (cls: string) => (visible ? cls : 'opacity-0');

  return (
    <div ref={containerRef}>
      <div className="attnres-manim-canvas attnres-manim-grid">
        <svg
          viewBox="0 0 660 460"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ height: 'auto' }}
        >
          <text
            x={STD_CX}
            y={32}
            textAnchor="middle"
            className={`font-mono text-sm fill-white ${anim(
              'attnres-animate-fade-up attnres-delay-100'
            )}`}
          >
            Standard Residual
          </text>

          <text
            x={AR_CX + 10}
            y={32}
            textAnchor="middle"
            className={`font-mono text-sm fill-white ${anim(
              'attnres-animate-fade-up attnres-delay-200'
            )}`}
          >
            Attention Residuals
          </text>

          <line
            x1={315}
            y1={50}
            x2={315}
            y2={440}
            stroke="#334155"
            strokeWidth={1}
            strokeDasharray="6 4"
            className={anim('attnres-animate-fade-up attnres-delay-300')}
          />

          {LAYERS.map((label, i) => {
            const y = layerY(i);
            const delayClass = `attnres-delay-${(i * 2 + 1) * 100}`;
            return (
              <g key={`std-${i}`}>
                <rect
                  x={STD_CX - LAYER_W / 2}
                  y={y - LAYER_H / 2}
                  width={LAYER_W}
                  height={LAYER_H}
                  rx={4}
                  fill="#0F172A"
                  stroke="#4CC9F0"
                  strokeWidth={1.5}
                  className={anim(`attnres-animate-fade-up ${delayClass}`)}
                />
                <text
                  x={STD_CX}
                  y={y + 4}
                  textAnchor="middle"
                  className={`font-mono fill-white ${anim(
                    `attnres-animate-fade-up ${delayClass}`
                  )}`}
                  style={{ fontSize: 11 }}
                >
                  {label}
                </text>
              </g>
            );
          })}

          <line
            x1={STD_CX}
            y1={layerY(0) - LAYER_H / 2}
            x2={STD_CX}
            y2={layerY(1) + LAYER_H / 2 + 1}
            stroke="#4CC9F0"
            strokeWidth={1.5}
            className={anim('attnres-animate-draw-line attnres-delay-200')}
          />
          <polygon
            points={`${STD_CX},${layerY(1) + LAYER_H / 2} ${STD_CX - 4},${
              layerY(1) + LAYER_H / 2 + 8
            } ${STD_CX + 4},${layerY(1) + LAYER_H / 2 + 8}`}
            fill="#4CC9F0"
            className={anim('attnres-animate-fade-up attnres-delay-200')}
          />

          {[1, 2, 3].map((i) => {
            const boxTop = layerY(i) - LAYER_H / 2;
            const boxBottom = layerY(i) + LAYER_H / 2;
            const addY = i < 3 ? addNodeY(i) : layerY(i) - LAYER_H / 2 - 24;
            const delayMs = (i * 2 + 2) * 100;
            const delayClass = `attnres-delay-${Math.min(delayMs, 2400)}`;

            const bypassStart = boxBottom + 3;
            const bypassPath = `M ${STD_CX},${bypassStart} L ${BYPASS_X},${bypassStart} L ${BYPASS_X},${addY} L ${STD_CX - ADD_R - 1},${addY}`;

            return (
              <g key={`std-res-${i}`}>
                <line
                  x1={STD_CX}
                  y1={boxTop}
                  x2={STD_CX}
                  y2={addY + ADD_R + 1}
                  stroke="#4CC9F0"
                  strokeWidth={1.5}
                  className={anim(
                    `attnres-animate-draw-line ${delayClass}`
                  )}
                />
                <polygon
                  points={`${STD_CX},${addY + ADD_R} ${STD_CX - 3},${
                    addY + ADD_R + 6
                  } ${STD_CX + 3},${addY + ADD_R + 6}`}
                  fill="#4CC9F0"
                  className={anim(
                    `attnres-animate-fade-up ${delayClass}`
                  )}
                />

                <path
                  d={bypassPath}
                  fill="none"
                  stroke="#4CC9F0"
                  strokeWidth={1.2}
                  strokeOpacity={0.6}
                  className={anim(
                    `attnres-animate-draw-line ${delayClass}`
                  )}
                />
                <polygon
                  points={`${STD_CX - ADD_R},${addY} ${STD_CX - ADD_R - 6},${
                    addY - 3
                  } ${STD_CX - ADD_R - 6},${addY + 3}`}
                  fill="#4CC9F0"
                  fillOpacity={0.6}
                  className={anim(
                    `attnres-animate-fade-up ${delayClass}`
                  )}
                />

                <circle
                  cx={STD_CX}
                  cy={addY}
                  r={ADD_R}
                  fill="#0F172A"
                  stroke="#4CC9F0"
                  strokeWidth={1.2}
                  className={anim(
                    `attnres-animate-scale-in ${delayClass}`
                  )}
                />
                <line
                  x1={STD_CX - 4}
                  y1={addY}
                  x2={STD_CX + 4}
                  y2={addY}
                  stroke="#4CC9F0"
                  strokeWidth={1}
                  className={anim(
                    `attnres-animate-fade-up ${delayClass}`
                  )}
                />
                <line
                  x1={STD_CX}
                  y1={addY - 4}
                  x2={STD_CX}
                  y2={addY + 4}
                  stroke="#4CC9F0"
                  strokeWidth={1}
                  className={anim(
                    `attnres-animate-fade-up ${delayClass}`
                  )}
                />

                {i < 3 && (
                  <>
                    <line
                      x1={STD_CX}
                      y1={addY - ADD_R}
                      x2={STD_CX}
                      y2={layerY(i + 1) + LAYER_H / 2 + 1}
                      stroke="#4CC9F0"
                      strokeWidth={1.5}
                      className={anim(
                        `attnres-animate-draw-line ${delayClass}`
                      )}
                    />
                    <polygon
                      points={`${STD_CX},${layerY(i + 1) + LAYER_H / 2} ${
                        STD_CX - 4
                      },${layerY(i + 1) + LAYER_H / 2 + 8} ${STD_CX + 4},${
                        layerY(i + 1) + LAYER_H / 2 + 8
                      }`}
                      fill="#4CC9F0"
                      className={anim(
                        `attnres-animate-fade-up ${delayClass}`
                      )}
                    />
                  </>
                )}
              </g>
            );
          })}

          <text
            x={STD_CX}
            y={440}
            textAnchor="middle"
            className={`font-mono fill-slate-400 ${anim(
              'attnres-animate-fade-up attnres-delay-900'
            )}`}
            style={{ fontSize: 10 }}
          >
            x = x + layer(x)
          </text>

          <text
            x={DB_X}
            y={layerY(3) - LAYER_H / 2 - 12}
            textAnchor="middle"
            className={`font-mono fill-slate-400 ${anim(
              'attnres-animate-fade-up attnres-delay-400'
            )}`}
            style={{ fontSize: 9 }}
          >
            KV store
          </text>

          {LAYERS.map((_, i) => {
            const y = layerY(i);
            const delayClass = `attnres-delay-${(i * 2 + 4) * 100}`;
            return (
              <g key={`db-${i}`}>
                <rect
                  x={DB_X - DB_ENTRY_W / 2}
                  y={y - DB_ENTRY_H / 2}
                  width={DB_ENTRY_W}
                  height={DB_ENTRY_H}
                  rx={3}
                  fill="#52B788"
                  fillOpacity={0.85}
                  stroke="#52B788"
                  strokeWidth={0.5}
                  className={anim(`attnres-animate-scale-in ${delayClass}`)}
                />
                <text
                  x={DB_X}
                  y={y + 3}
                  textAnchor="middle"
                  style={{ fontSize: 7 }}
                  className={`font-mono fill-white ${anim(
                    `attnres-animate-scale-in ${delayClass}`
                  )}`}
                >
                  h{i}
                </text>
              </g>
            );
          })}

          <line
            x1={DB_X}
            y1={layerY(0)}
            x2={DB_X}
            y2={layerY(3)}
            stroke="#52B788"
            strokeWidth={0.7}
            strokeOpacity={0.35}
            className={anim('attnres-animate-draw-line attnres-delay-600')}
          />

          {LAYERS.map((label, i) => {
            const y = layerY(i);
            const delayClass = `attnres-delay-${(i * 2 + 3) * 100}`;
            return (
              <g key={`ar-${i}`}>
                <rect
                  x={AR_CX - LAYER_W / 2}
                  y={y - LAYER_H / 2}
                  width={LAYER_W}
                  height={LAYER_H}
                  rx={4}
                  fill="#0F172A"
                  stroke="#E2B714"
                  strokeWidth={1.5}
                  className={anim(`attnres-animate-fade-up ${delayClass}`)}
                />
                <text
                  x={AR_CX}
                  y={y + 4}
                  textAnchor="middle"
                  className={`font-mono fill-white ${anim(
                    `attnres-animate-fade-up ${delayClass}`
                  )}`}
                  style={{ fontSize: 11 }}
                >
                  {label}
                </text>
              </g>
            );
          })}

          {LAYERS.map((_, layerIdx) => {
            if (layerIdx === 0) return null;
            const toY = layerY(layerIdx);
            const toX = AR_CX - LAYER_W / 2;

            return ALPHA[layerIdx].map((alpha, entryIdx) => {
              const fromX = DB_X + DB_ENTRY_W / 2;
              const fromY = layerY(entryIdx);
              const opacity = 0.25 + alpha * 0.75;
              const baseDelay = (layerIdx * 3 + entryIdx + 5) * 100;
              const delayClass = `attnres-delay-${Math.min(baseDelay, 2400)}`;

              return (
                <g key={`conn-${layerIdx}-${entryIdx}`}>
                  <line
                    x1={fromX}
                    y1={fromY}
                    x2={toX}
                    y2={toY}
                    stroke="#E2B714"
                    strokeWidth={1 + alpha * 1.2}
                    strokeOpacity={opacity}
                    className={anim(
                      `attnres-animate-draw-line ${delayClass}`
                    )}
                  />
                  <text
                    x={(fromX + toX) / 2}
                    y={(fromY + toY) / 2 - 4}
                    textAnchor="middle"
                    style={{ fontSize: 8 }}
                    className={`font-mono fill-yellow-300 ${anim(
                      `attnres-animate-fade-up ${delayClass}`
                    )}`}
                    fillOpacity={0.9}
                  >
                    {alpha.toFixed(2)}
                  </text>
                </g>
              );
            });
          })}

          {LAYERS.map((_, i) => {
            const y = layerY(i);
            const fromX = AR_CX - LAYER_W / 2;
            const entryX = DB_X + DB_ENTRY_W / 2;
            const delayClass = `attnres-delay-${(i * 2 + 4) * 100}`;
            return (
              <line
                key={`write-${i}`}
                x1={fromX}
                y1={y}
                x2={entryX + 2}
                y2={y}
                stroke="#52B788"
                strokeWidth={0.8}
                strokeDasharray="3 2"
                strokeOpacity={0.5}
                className={anim(`attnres-animate-draw-line ${delayClass}`)}
              />
            );
          })}

          <text
            x={(AR_CX - LAYER_W / 2 + DB_X + DB_ENTRY_W / 2) / 2}
            y={layerY(0) + 10}
            textAnchor="middle"
            style={{ fontSize: 7 }}
            className={`font-mono fill-emerald-400 ${anim(
              'attnres-animate-fade-up attnres-delay-600'
            )}`}
            fillOpacity={0.7}
          >
            write
          </text>

          <text
            x={AR_CX - LAYER_W / 2 - 10}
            y={layerY(3) + 14}
            textAnchor="end"
            style={{ fontSize: 7 }}
            className={`font-mono fill-yellow-400 ${anim(
              'attnres-animate-fade-up attnres-delay-1200'
            )}`}
            fillOpacity={0.7}
          >
            read (gated)
          </text>
        </svg>
      </div>

      <div className="attnres-figure-caption">
        Left: Standard residual connections forward information one layer at a
        time. Right: Attention Residuals let every layer query the full
        history.
      </div>
    </div>
  );
}
