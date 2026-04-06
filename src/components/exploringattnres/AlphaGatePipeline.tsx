'use client';

import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    label: 'RMSNorm',
    color: '#52B788',
    data: 'K = RMSNorm([h₀, h₁])',
  },
  {
    label: 'Score',
    color: '#4CC9F0',
    data: 'logits = wₗ · K → [1.33, 0.01]',
  },
  {
    label: 'Softmax',
    color: '#E2B714',
    data: 'α = softmax → [0.79, 0.21]',
  },
  {
    label: 'Blend',
    color: '#F4845F',
    data: 'out = 0.79·h₀ + 0.21·h₁',
  },
] as const;

const SVG_W = 860;
const SVG_H = 280;

const BOX_W = 130;
const BOX_H = 52;
const BOX_R = 10;
const BOX_Y = 100;

const GAP = 48;
const TOTAL_PIPELINE_W = STEPS.length * BOX_W + (STEPS.length - 1) * GAP;
const X_OFFSET = (SVG_W - TOTAL_PIPELINE_W) / 2;

const boxX = (i: number) => X_OFFSET + i * (BOX_W + GAP);

export default function AlphaGatePipeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
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

  return (
    <figure ref={wrapperRef} className="my-10">
      <div className="attnres-manim-canvas attnres-manim-grid">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ height: 280 }}
          role="img"
          aria-label="Diagram of the 4-step alpha gate routing pipeline: RMSNorm, Score, Softmax, Blend"
        >
          <text
            x={SVG_W / 2}
            y={36}
            textAnchor="middle"
            fill="#fff"
            fontFamily='"JetBrains Mono", monospace'
            fontSize={14}
            fontWeight={500}
            className={visible ? 'attnres-animate-fade-up' : 'opacity-0'}
          >
            The Alpha Gate
          </text>

          <text
            x={X_OFFSET - 16}
            y={BOX_Y + BOX_H / 2 + 1}
            textAnchor="end"
            fill="rgba(255,255,255,0.5)"
            fontFamily='"JetBrains Mono", monospace'
            fontSize={10}
            className={
              visible
                ? 'attnres-animate-fade-right attnres-delay-200'
                : 'opacity-0'
            }
          >
            [h&#x2080;, h&#x2081;]
          </text>

          {STEPS.slice(0, -1).map((_, i) => {
            const x1 = boxX(i) + BOX_W;
            const x2 = boxX(i + 1);
            const y = BOX_Y + BOX_H / 2;
            const arrowDelay = 400 + i * 350;

            return (
              <g
                key={`arrow-${i}`}
                className={visible ? 'attnres-animate-draw-line' : 'opacity-0'}
                style={visible ? { animationDelay: `${arrowDelay}ms` } : undefined}
              >
                <line
                  x1={x1 + 4}
                  y1={y}
                  x2={x2 - 4}
                  y2={y}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                <polygon
                  points={`${x2 - 4},${y - 5} ${x2 - 4},${y + 5} ${x2},${y}`}
                  fill="rgba(255,255,255,0.4)"
                />
              </g>
            );
          })}

          {STEPS.map((step, i) => {
            const x = boxX(i);
            const boxDelay = 200 + i * 350;
            const dataDelay = boxDelay + 250;

            return (
              <g key={step.label}>
                <rect
                  x={x}
                  y={BOX_Y}
                  width={BOX_W}
                  height={BOX_H}
                  rx={BOX_R}
                  ry={BOX_R}
                  fill="rgba(15,23,42,0.85)"
                  stroke={step.color}
                  strokeWidth={1.8}
                  className={visible ? 'attnres-animate-fade-right' : 'opacity-0'}
                  style={visible ? { animationDelay: `${boxDelay}ms` } : undefined}
                />

                <circle
                  cx={x + 18}
                  cy={BOX_Y + 16}
                  r={8}
                  fill={step.color}
                  fillOpacity={0.15}
                  stroke={step.color}
                  strokeWidth={0.8}
                  className={visible ? 'attnres-animate-fade-right' : 'opacity-0'}
                  style={visible ? { animationDelay: `${boxDelay}ms` } : undefined}
                />
                <text
                  x={x + 18}
                  y={BOX_Y + 20}
                  textAnchor="middle"
                  fill={step.color}
                  fontFamily='"JetBrains Mono", monospace'
                  fontSize={9}
                  fontWeight={500}
                  className={visible ? 'attnres-animate-fade-right' : 'opacity-0'}
                  style={visible ? { animationDelay: `${boxDelay}ms` } : undefined}
                >
                  {i + 1}
                </text>

                <text
                  x={x + BOX_W / 2 + 6}
                  y={BOX_Y + BOX_H / 2 + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontFamily='"JetBrains Mono", monospace'
                  fontSize={13}
                  fontWeight={500}
                  className={visible ? 'attnres-animate-fade-right' : 'opacity-0'}
                  style={visible ? { animationDelay: `${boxDelay}ms` } : undefined}
                >
                  {step.label}
                </text>

                <text
                  x={x + BOX_W / 2}
                  y={BOX_Y + BOX_H + 28}
                  textAnchor="middle"
                  fill={step.color}
                  fillOpacity={0.8}
                  fontFamily='"JetBrains Mono", monospace'
                  fontSize={9.5}
                  className={visible ? 'attnres-animate-fade-up' : 'opacity-0'}
                  style={visible ? { animationDelay: `${dataDelay}ms` } : undefined}
                >
                  {step.data}
                </text>

                {step.label === 'Score' && (
                  <g
                    className={visible ? 'attnres-animate-fade-up' : 'opacity-0'}
                    style={
                      visible ? { animationDelay: `${boxDelay + 150}ms` } : undefined
                    }
                  >
                    <rect
                      x={x + BOX_W / 2 - 18}
                      y={BOX_Y - 32}
                      width={36}
                      height={20}
                      rx={5}
                      fill="rgba(76,201,240,0.1)"
                      stroke="#4CC9F0"
                      strokeWidth={1}
                      strokeDasharray="3 2"
                    />
                    <text
                      x={x + BOX_W / 2}
                      y={BOX_Y - 18}
                      textAnchor="middle"
                      fill="#4CC9F0"
                      fontFamily='"JetBrains Mono", monospace'
                      fontSize={10}
                      fontWeight={500}
                    >
                      w&#x2097;
                    </text>
                    <line
                      x1={x + BOX_W / 2}
                      y1={BOX_Y - 12}
                      x2={x + BOX_W / 2}
                      y2={BOX_Y}
                      stroke="#4CC9F0"
                      strokeWidth={1}
                      strokeOpacity={0.35}
                      strokeDasharray="3 2"
                    />
                  </g>
                )}

                {step.label === 'Blend' && (
                  <text
                    x={x + BOX_W / 2}
                    y={BOX_Y - 16}
                    textAnchor="middle"
                    fill="rgba(244,132,95,0.55)"
                    fontFamily='"JetBrains Mono", monospace'
                    fontSize={9}
                    className={visible ? 'attnres-animate-fade-up' : 'opacity-0'}
                    style={
                      visible ? { animationDelay: `${boxDelay + 150}ms` } : undefined
                    }
                  >
                    uses raw history
                  </text>
                )}
              </g>
            );
          })}

          {(() => {
            const lastX = boxX(STEPS.length - 1) + BOX_W;
            const y = BOX_Y + BOX_H / 2;
            const arrowDelay = 400 + (STEPS.length - 1) * 350;

            return (
              <g
                className={visible ? 'attnres-animate-draw-line' : 'opacity-0'}
                style={visible ? { animationDelay: `${arrowDelay}ms` } : undefined}
              >
                <line
                  x1={lastX + 4}
                  y1={y}
                  x2={lastX + 36}
                  y2={y}
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
                <polygon
                  points={`${lastX + 32},${y - 5} ${lastX + 32},${y + 5} ${
                    lastX + 38
                  },${y}`}
                  fill="rgba(255,255,255,0.4)"
                />
                <text
                  x={lastX + 48}
                  y={y + 4}
                  fill="rgba(255,255,255,0.5)"
                  fontFamily='"JetBrains Mono", monospace'
                  fontSize={10}
                >
                  input
                </text>
              </g>
            );
          })()}

          <text
            x={SVG_W / 2}
            y={SVG_H - 18}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontFamily='"JetBrains Mono", monospace'
            fontSize={9}
            className={
              visible
                ? 'attnres-animate-fade-up attnres-delay-2000'
                : 'opacity-0'
            }
          >
            Example: MLP 1 routing over history = [embedding, MHA 1 output]
          </text>
        </svg>
      </div>

      <figcaption className="attnres-figure-caption">
        The alpha gate: a 4-step routing engine that runs before every MHA and
        MLP block.
      </figcaption>
    </figure>
  );
}
