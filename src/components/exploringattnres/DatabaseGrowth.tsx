'use client';

import { useEffect, useRef, useState } from 'react';

interface DbEntry {
  label: string;
  abbrev: string;
  color: string;
}

const EMBEDDING: DbEntry = {
  label: 'Embedding',
  abbrev: 'Emb',
  color: '#52B788',
};
const MHA1: DbEntry = { label: 'MHA₁ out', abbrev: 'MHA₁', color: '#4CC9F0' };
const MLP1: DbEntry = { label: 'MLP₁ out', abbrev: 'MLP₁', color: '#E2B714' };
const MHA2: DbEntry = { label: 'MHA₂ out', abbrev: 'MHA₂', color: '#4CC9F0' };
const MLP2: DbEntry = { label: 'MLP₂ out', abbrev: 'MLP₂', color: '#E2B714' };

interface Phase {
  title: string;
  entries: DbEntry[];
}

const PHASES: Phase[] = [
  { title: 'Start', entries: [EMBEDDING] },
  { title: 'After MHA 1', entries: [EMBEDDING, MHA1] },
  { title: 'After MLP 1', entries: [EMBEDDING, MHA1, MLP1] },
  { title: 'After MHA 2', entries: [EMBEDDING, MHA1, MLP1, MHA2] },
  { title: 'After MLP 2', entries: [EMBEDDING, MHA1, MLP1, MHA2, MLP2] },
];

const SVG_W = 820;
const SVG_H = 300;

const PHASE_GAP = 150;
const PHASE_X_START = 85;
const DB_TOP_Y = 70;
const ENTRY_H = 28;
const ENTRY_W = 68;
const ENTRY_GAP = 6;
const LABEL_Y = 250;
const ARROW_Y = 155;

function phaseX(i: number) {
  return PHASE_X_START + i * PHASE_GAP;
}

export default function DatabaseGrowth() {
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function entryDelay(
    phaseIdx: number,
    entryIdx: number,
    phaseEntries: number
  ) {
    const isNew = entryIdx === phaseEntries - 1 && phaseIdx > 0;
    const phaseBase = phaseIdx * 450;
    const entryOffset = entryIdx * 80;
    return phaseBase + entryOffset + (isNew ? 120 : 0);
  }

  function arrowDelay(phaseIdx: number) {
    return phaseIdx * 450 + 100;
  }

  return (
    <figure ref={containerRef}>
      <div className="attnres-manim-canvas attnres-manim-grid relative">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ height: 300 }}
          role="img"
          aria-label="Diagram showing the history database growing across transformer layers"
        >
          <text
            x={SVG_W / 2}
            y={30}
            textAnchor="middle"
            className="font-mono"
            fill="white"
            fontSize={14}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{
              transition: 'opacity 0.5s ease-out',
            }}
          >
            The History Database
          </text>

          <text
            x={SVG_W / 2}
            y={50}
            textAnchor="middle"
            fill="#94A3B8"
            fontSize={10}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{
              transition: 'opacity 0.5s ease-out 0.2s',
            }}
          >
            previous_states: list[Tensor]
          </text>

          {PHASES.map((phase, pi) => {
            const cx = phaseX(pi);
            const colX = cx - ENTRY_W / 2;

            return (
              <g key={pi}>
                {pi > 0 && (
                  <g>
                    <line
                      x1={phaseX(pi - 1) + ENTRY_W / 2 + 8}
                      y1={ARROW_Y}
                      x2={cx - ENTRY_W / 2 - 8}
                      y2={ARROW_Y}
                      stroke="#475569"
                      strokeWidth={1.5}
                      strokeDasharray="1000"
                      strokeDashoffset={visible ? 0 : 1000}
                      style={{
                        transition: `stroke-dashoffset 0.6s ease-out ${arrowDelay(
                          pi
                        )}ms`,
                      }}
                    />
                    <polygon
                      points={`${cx - ENTRY_W / 2 - 8},${ARROW_Y - 4} ${
                        cx - ENTRY_W / 2 - 2
                      },${ARROW_Y} ${cx - ENTRY_W / 2 - 8},${ARROW_Y + 4}`}
                      fill="#475569"
                      opacity={visible ? 1 : 0}
                      style={{
                        transition: `opacity 0.3s ease-out ${
                          arrowDelay(pi) + 500
                        }ms`,
                      }}
                    />
                  </g>
                )}

                {phase.entries.map((entry, ei) => {
                  const ey = DB_TOP_Y + ei * (ENTRY_H + ENTRY_GAP);
                  const delay = entryDelay(pi, ei, phase.entries.length);
                  const isNewEntry =
                    ei === phase.entries.length - 1 && pi > 0;

                  return (
                    <g
                      key={ei}
                      opacity={visible ? 1 : 0}
                      transform={visible ? 'scale(1)' : 'scale(0.85)'}
                      style={{
                        transformOrigin: `${cx}px ${ey + ENTRY_H / 2}px`,
                        transition: `opacity 0.4s ease-out ${delay}ms, transform 0.4s ease-out ${delay}ms`,
                      }}
                    >
                      <rect
                        x={colX}
                        y={ey}
                        width={ENTRY_W}
                        height={ENTRY_H}
                        rx={5}
                        ry={5}
                        fill={entry.color}
                        fillOpacity={isNewEntry ? 0.95 : 0.7}
                        stroke={isNewEntry ? entry.color : 'transparent'}
                        strokeWidth={isNewEntry ? 1.5 : 0}
                      />
                      <text
                        x={cx}
                        y={ey + ENTRY_H / 2 + 1}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#0F172A"
                        fontSize={10}
                        fontFamily="'JetBrains Mono', Menlo, monospace"
                        fontWeight={500}
                      >
                        {entry.abbrev}
                      </text>
                    </g>
                  );
                })}

                <text
                  x={cx}
                  y={LABEL_Y}
                  textAnchor="middle"
                  fill="#CBD5E1"
                  fontSize={10}
                  fontFamily="'JetBrains Mono', Menlo, monospace"
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity 0.5s ease-out ${pi * 450 + 200}ms`,
                  }}
                >
                  {phase.title}
                </text>

                <text
                  x={cx}
                  y={LABEL_Y + 16}
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize={9}
                  fontFamily="'JetBrains Mono', Menlo, monospace"
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity 0.5s ease-out ${pi * 450 + 300}ms`,
                  }}
                >
                  {phase.entries.length}{' '}
                  {phase.entries.length === 1 ? 'entry' : 'entries'}
                </text>
              </g>
            );
          })}

          <g
            opacity={visible ? 1 : 0}
            style={{
              transition: 'opacity 0.6s ease-out 2400ms',
            }}
          >
            <line
              x1={phaseX(4) + ENTRY_W / 2 + 12}
              y1={DB_TOP_Y}
              x2={phaseX(4) + ENTRY_W / 2 + 12}
              y2={DB_TOP_Y + 4 * (ENTRY_H + ENTRY_GAP) + ENTRY_H}
              stroke="#94A3B8"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <line
              x1={phaseX(4) + ENTRY_W / 2 + 12}
              y1={ARROW_Y}
              x2={phaseX(4) + ENTRY_W / 2 + 24}
              y2={ARROW_Y}
              stroke="#94A3B8"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <rect
              x={phaseX(4) + ENTRY_W / 2 + 26}
              y={ARROW_Y - 12}
              width={92}
              height={24}
              rx={4}
              fill="#1E293B"
              stroke="#475569"
              strokeWidth={0.5}
            />
            <text
              x={phaseX(4) + ENTRY_W / 2 + 72}
              y={ARROW_Y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#4CC9F0"
              fontSize={10}
              fontFamily="'JetBrains Mono', Menlo, monospace"
            >
              torch.stack()
            </text>
          </g>

          <text
            x={SVG_W / 2}
            y={SVG_H - 12}
            textAnchor="middle"
            fill="#64748B"
            fontSize={8.5}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{
              transition: 'opacity 0.6s ease-out 2600ms',
            }}
          >
            Each entry is a [B, T, D] tensor. The list only stores pointers —
            torch.stack() creates contiguous memory when needed.
          </text>
        </svg>
      </div>
      <figcaption className="attnres-figure-caption">
        The database grows by two entries per layer: one from MHA, one from
        MLP. Layer 2&apos;s MHA can directly query Layer 1&apos;s embedding.
      </figcaption>
    </figure>
  );
}
