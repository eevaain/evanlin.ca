'use client';

import { useEffect, useRef, useState } from 'react';

interface TensorChunk {
  addr: string;
  blockX: number;
  blockY: number;
  color: string;
  key: string;
  listY: number;
}

const CHUNKS: TensorChunk[] = [
  {
    key: 'emb',
    listY: 82,
    blockX: 158,
    blockY: 62,
    color: '#52B788',
    addr: '0x1A4F',
  },
  {
    key: 'mha',
    listY: 170,
    blockX: 116,
    blockY: 150,
    color: '#4CC9F0',
    addr: '0x8C21',
  },
  {
    key: 'mlp',
    listY: 258,
    blockX: 176,
    blockY: 238,
    color: '#E2B714',
    addr: '0x57D9',
  },
];

const SVG_W = 920;
const SVG_H = 330;

const LIST_X = 36;
const LIST_W = 58;
const LIST_H = 28;

const CELL = 18;
const CELL_GAP = 4;
const COLS = 4;
const ROWS = 2;
const BLOCK_W = COLS * CELL + (COLS - 1) * CELL_GAP;
const BLOCK_H = ROWS * CELL + (ROWS - 1) * CELL_GAP;

const DEST_X = 600;
const DEST_Y = 58;
const DEST_PAD = 18;
const DEST_GAP = 10;
const DEST_W = BLOCK_W + DEST_PAD * 2;
const DEST_H =
  DEST_PAD * 2 + CHUNKS.length * BLOCK_H + (CHUNKS.length - 1) * DEST_GAP;

function renderCells(
  baseX: number,
  baseY: number,
  color: string,
  keyPrefix: string,
  fillOpacity = 0.92
) {
  return Array.from({ length: ROWS * COLS }, (_, index) => {
    const row = Math.floor(index / COLS);
    const col = index % COLS;

    return (
      <rect
        key={`${keyPrefix}-${index}`}
        x={baseX + col * (CELL + CELL_GAP)}
        y={baseY + row * (CELL + CELL_GAP)}
        width={CELL}
        height={CELL}
        rx={3}
        fill={color}
        fillOpacity={fillOpacity}
        stroke="rgba(15, 23, 42, 0.35)"
        strokeWidth={0.8}
      />
    );
  });
}

export default function MemoryCoalescing() {
  const figureRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figureRef} className="my-10">
      <div className="attnres-manim-canvas attnres-manim-grid relative">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ height: 330 }}
          role="img"
          aria-label="Animation showing append storing pointers to scattered tensors while torch.stack copies them into one contiguous allocation"
        >
          <text
            x={180}
            y={28}
            textAnchor="middle"
            fill="white"
            fontSize={14}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-out' }}
          >
            Python list + .append()
          </text>
          <text
            x={180}
            y={46}
            textAnchor="middle"
            fill="#94A3B8"
            fontSize={10}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-out 120ms' }}
          >
            O(1): just store addresses
          </text>

          <text
            x={676}
            y={28}
            textAnchor="middle"
            fill="white"
            fontSize={14}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-out 300ms' }}
          >
            torch.stack()
          </text>
          <text
            x={676}
            y={46}
            textAnchor="middle"
            fill="#94A3B8"
            fontSize={10}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-out 420ms' }}
          >
            Copy into one contiguous tensor
          </text>

          <rect
            x={DEST_X}
            y={DEST_Y}
            width={DEST_W}
            height={DEST_H}
            rx={12}
            fill="#0B1220"
            stroke="#475569"
            strokeWidth={1}
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-out 900ms' }}
          />
          <text
            x={DEST_X + DEST_W / 2}
            y={DEST_Y + DEST_H + 22}
            textAnchor="middle"
            fill="#CBD5E1"
            fontSize={10}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.5s ease-out 1200ms' }}
          >
            Tensor[S, B, T, D] in one fresh allocation
          </text>

          {CHUNKS.map((chunk, index) => {
            const sourceCenterY = chunk.listY + LIST_H / 2;
            const blockCenterY = chunk.blockY + BLOCK_H / 2;
            const destBlockX = DEST_X + DEST_PAD;
            const destBlockY = DEST_Y + DEST_PAD + index * (BLOCK_H + DEST_GAP);
            const dx = destBlockX - chunk.blockX;
            const dy = destBlockY - chunk.blockY;
            const copyDelay = 1300 + index * 220;
            const fadeDelay = index * 140;

            return (
              <g key={chunk.key}>
                <rect
                  x={LIST_X}
                  y={chunk.listY}
                  width={LIST_W}
                  height={LIST_H}
                  rx={6}
                  fill="#111827"
                  stroke="#475569"
                  strokeWidth={1}
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity 0.35s ease-out ${fadeDelay}ms`,
                  }}
                />
                <text
                  x={LIST_X + LIST_W / 2}
                  y={chunk.listY + LIST_H / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#E2E8F0"
                  fontSize={10}
                  fontFamily="'JetBrains Mono', Menlo, monospace"
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity 0.35s ease-out ${fadeDelay + 60}ms`,
                  }}
                >
                  ptr[{index}]
                </text>

                <line
                  x1={LIST_X + LIST_W + 8}
                  y1={sourceCenterY}
                  x2={chunk.blockX - 10}
                  y2={blockCenterY}
                  stroke="#64748B"
                  strokeWidth={1.4}
                  strokeDasharray="6 6"
                  strokeDashoffset={visible ? 0 : 120}
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `stroke-dashoffset 0.7s ease-out ${fadeDelay + 80}ms, opacity 0.35s ease-out ${fadeDelay + 80}ms`,
                  }}
                />
                <polygon
                  points={`${chunk.blockX - 10},${blockCenterY - 4} ${
                    chunk.blockX - 2
                  },${blockCenterY} ${chunk.blockX - 10},${blockCenterY + 4}`}
                  fill="#64748B"
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity 0.35s ease-out ${fadeDelay + 440}ms`,
                  }}
                />

                <g
                  opacity={visible ? 1 : 0}
                  transform={visible ? 'scale(1)' : 'scale(0.88)'}
                  style={{
                    transformOrigin: `${chunk.blockX + BLOCK_W / 2}px ${
                      chunk.blockY + BLOCK_H / 2
                    }px`,
                    transition: `opacity 0.35s ease-out ${fadeDelay + 180}ms, transform 0.35s ease-out ${fadeDelay + 180}ms`,
                  }}
                >
                  {renderCells(
                    chunk.blockX,
                    chunk.blockY,
                    chunk.color,
                    `${chunk.key}-source`,
                    0.88
                  )}
                </g>
                <text
                  x={chunk.blockX + BLOCK_W / 2}
                  y={chunk.blockY + BLOCK_H + 18}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize={9}
                  fontFamily="'JetBrains Mono', Menlo, monospace"
                  opacity={visible ? 1 : 0}
                  style={{
                    transition: `opacity 0.35s ease-out ${fadeDelay + 260}ms`,
                  }}
                >
                  {chunk.addr}
                </text>

                <g
                  opacity={visible ? 1 : 0}
                  transform={visible ? `translate(${dx} ${dy})` : 'translate(0 0)'}
                  style={{
                    transition: `opacity 0.2s ease-out ${copyDelay}ms, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${copyDelay}ms`,
                  }}
                >
                  {renderCells(
                    chunk.blockX,
                    chunk.blockY,
                    chunk.color,
                    `${chunk.key}-copy`
                  )}
                </g>
              </g>
            );
          })}

          <line
            x1={390}
            y1={164}
            x2={548}
            y2={164}
            stroke="#F8FAFC"
            strokeWidth={2}
            strokeDasharray="1000"
            strokeDashoffset={visible ? 0 : 1000}
            opacity={visible ? 1 : 0}
            style={{
              transition: 'stroke-dashoffset 0.7s ease-out 1000ms, opacity 0.3s ease-out 1000ms',
            }}
          />
          <polygon
            points="548,164 538,158 538,170"
            fill="#F8FAFC"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.3s ease-out 1500ms' }}
          />
          <rect
            x={420}
            y={126}
            width={96}
            height={26}
            rx={13}
            fill="#1E293B"
            stroke="#475569"
            strokeWidth={0.8}
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.4s ease-out 900ms' }}
          />
          <text
            x={468}
            y={143}
            textAnchor="middle"
            fill="#F8FAFC"
            fontSize={10}
            fontFamily="'JetBrains Mono', Menlo, monospace"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 0.4s ease-out 980ms' }}
          >
            torch.stack()
          </text>
        </svg>
      </div>
      <figcaption className="attnres-figure-caption">
        <code>.append()</code> only records three pointers to scattered tensor
        chunks. <code>torch.stack()</code> allocates a new contiguous buffer
        and copies those chunks into one aligned block the GPU kernel can read
        in a single pass.
      </figcaption>
    </figure>
  );
}
