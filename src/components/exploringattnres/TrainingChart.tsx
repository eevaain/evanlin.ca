'use client';

import { useEffect, useRef, useState } from 'react';

const LOSS_ON = [
  0.9564, 0.9052, 0.8947, 0.8853, 0.8811, 0.8769, 0.8663, 0.8583, 0.856,
  0.8547, 0.853, 0.8507, 0.8496, 0.8485, 0.8477, 0.8469, 0.8456, 0.8456,
  0.8446, 0.8439, 0.8428, 0.8427, 0.8417, 0.8414, 0.8414, 0.8407, 0.8395,
  0.8401, 0.8397, 0.8384, 0.8388, 0.8379, 0.8372, 0.8369, 0.8366, 0.8354,
  0.8351, 0.8353, 0.8353, 0.8347, 0.8344, 0.8341, 0.8338, 0.8338, 0.833,
  0.8326, 0.8326, 0.832, 0.8313, 0.8303,
];

const LOSS_OFF = [
  0.997, 0.9408, 0.9241, 0.9131, 0.9059, 0.9003, 0.8938, 0.8897, 0.8888,
  0.8869, 0.8859, 0.8842, 0.8832, 0.8821, 0.8811, 0.8804, 0.8796, 0.8785,
  0.8786, 0.8775, 0.8766, 0.876, 0.8758, 0.8748, 0.8744, 0.8743, 0.8733,
  0.8731, 0.8733, 0.8723, 0.8723, 0.8714, 0.8709, 0.8707, 0.8701, 0.8695,
  0.8691, 0.8696, 0.8695, 0.8685, 0.8686, 0.8685, 0.8682, 0.8679, 0.8671,
  0.8672, 0.8665, 0.8661, 0.8656, 0.8654,
];

const GRAD_ON = [
  0.000107, 0.00014, 0.00019, 0.000286, 0.00037, 0.000434, 0.00051,
  0.000577, 0.000612, 0.000651, 0.000688, 0.000739, 0.000772, 0.000776,
  0.000811, 0.000833, 0.000852, 0.000877, 0.000882, 0.000902, 0.000944,
  0.000919, 0.00097, 0.000961, 0.000992, 0.001017, 0.001, 0.001019,
  0.001031, 0.001031, 0.001049, 0.00106, 0.001104, 0.001078, 0.001103,
  0.001104, 0.001113, 0.001123, 0.001137, 0.001131, 0.001121, 0.001162,
  0.001176, 0.001175, 0.001171, 0.001204, 0.00118, 0.001209, 0.001197,
  0.00123,
];

const GRAD_OFF = [
  0.000541, 0.000563, 0.000726, 0.000842, 0.000872, 0.000913, 0.000956,
  0.000959, 0.000971, 0.000944, 0.000979, 0.000971, 0.000968, 0.000974,
  0.00096, 0.000968, 0.000955, 0.000967, 0.000956, 0.000958, 0.000947,
  0.00094, 0.000949, 0.000932, 0.000935, 0.000937, 0.000948, 0.000934,
  0.000925, 0.000937, 0.000938, 0.000945, 0.000944, 0.000926, 0.000952,
  0.00094, 0.000938, 0.000953, 0.000932, 0.000921, 0.000956, 0.000928,
  0.000942, 0.000954, 0.000956, 0.000961, 0.000951, 0.000972, 0.000972,
  0.000971,
];

const YELLOW = '#E2B714';
const CYAN = '#4CC9F0';

interface ChartLayout {
  svgW: number;
  svgH: number;
  padL: number;
  padR: number;
  padT: number;
  padB: number;
}

function buildPolyline(
  data: number[],
  yMin: number,
  yMax: number,
  layout: ChartLayout
): string {
  const { svgW, svgH, padL, padR, padT, padB } = layout;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  return data
    .map((v, i) => {
      const x = padL + (i / (data.length - 1)) * plotW;
      const y = padT + ((yMax - v) / (yMax - yMin)) * plotH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function yTicks(yMin: number, yMax: number, count: number): number[] {
  const step = (yMax - yMin) / (count - 1);
  return Array.from({ length: count }, (_, i) => yMin + step * i);
}

function yPos(
  val: number,
  yMin: number,
  yMax: number,
  layout: ChartLayout
): number {
  const plotH = layout.svgH - layout.padT - layout.padB;
  return layout.padT + ((yMax - val) / (yMax - yMin)) * plotH;
}

function xPos(epoch: number, total: number, layout: ChartLayout): number {
  const plotW = layout.svgW - layout.padL - layout.padR;
  return layout.padL + ((epoch - 1) / (total - 1)) * plotW;
}

function Chart({
  title,
  yLabel,
  dataOn,
  dataOff,
  yMin,
  yMax,
  formatTick,
  visible,
  delayMs,
}: {
  title: string;
  yLabel: string;
  dataOn: number[];
  dataOff: number[];
  yMin: number;
  yMax: number;
  formatTick: (v: number) => string;
  visible: boolean;
  delayMs: number;
}) {
  const layout: ChartLayout = {
    svgW: 640,
    svgH: 240,
    padL: 72,
    padR: 24,
    padT: 32,
    padB: 36,
  };

  const epochs = dataOn.length;
  const ticks = yTicks(yMin, yMax, 5);
  const xTickValues = [1, 10, 20, 30, 40, 50];

  const polyOn = buildPolyline(dataOn, yMin, yMax, layout);
  const polyOff = buildPolyline(dataOff, yMin, yMax, layout);

  const plotLeft = layout.padL;
  const plotRight = layout.svgW - layout.padR;
  const plotTop = layout.padT;
  const plotBottom = layout.svgH - layout.padB;

  return (
    <div className="relative">
      <p
        className={`mb-2 pl-[72px] font-mono text-sm text-white transition-all duration-500 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
        style={{ transitionDelay: `${delayMs}ms` }}
      >
        {title}
      </p>

      <svg
        viewBox={`0 0 ${layout.svgW} ${layout.svgH}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {ticks.map((t) => {
          const y = yPos(t, yMin, yMax, layout);
          return (
            <line
              key={`h-${t}`}
              x1={plotLeft}
              y1={y}
              x2={plotRight}
              y2={y}
              stroke="rgba(100,116,139,0.12)"
              strokeWidth={0.5}
            />
          );
        })}

        {xTickValues.map((ep) => {
          const x = xPos(ep, epochs, layout);
          return (
            <line
              key={`v-${ep}`}
              x1={x}
              y1={plotTop}
              x2={x}
              y2={plotBottom}
              stroke="rgba(100,116,139,0.08)"
              strokeWidth={0.5}
            />
          );
        })}

        <line
          x1={plotLeft}
          y1={plotBottom}
          x2={plotRight}
          y2={plotBottom}
          stroke="rgba(148,163,184,0.3)"
          strokeWidth={1}
        />
        <line
          x1={plotLeft}
          y1={plotTop}
          x2={plotLeft}
          y2={plotBottom}
          stroke="rgba(148,163,184,0.3)"
          strokeWidth={1}
        />

        {ticks.map((t) => {
          const y = yPos(t, yMin, yMax, layout);
          return (
            <text
              key={`yl-${t}`}
              x={plotLeft - 8}
              y={y + 3.5}
              textAnchor="end"
              className="font-mono"
              fill="#94a3b8"
              fontSize={10}
            >
              {formatTick(t)}
            </text>
          );
        })}

        <text
          x={16}
          y={(plotTop + plotBottom) / 2}
          textAnchor="middle"
          className="font-mono"
          fill="#94a3b8"
          fontSize={10}
          transform={`rotate(-90, 16, ${(plotTop + plotBottom) / 2})`}
        >
          {yLabel}
        </text>

        {xTickValues.map((ep) => {
          const x = xPos(ep, epochs, layout);
          return (
            <text
              key={`xl-${ep}`}
              x={x}
              y={plotBottom + 16}
              textAnchor="middle"
              className="font-mono"
              fill="#94a3b8"
              fontSize={10}
            >
              {ep}
            </text>
          );
        })}

        <text
          x={(plotLeft + plotRight) / 2}
          y={layout.svgH - 2}
          textAnchor="middle"
          className="font-mono"
          fill="#94a3b8"
          fontSize={10}
        >
          Epoch
        </text>

        <polyline
          points={polyOff}
          fill="none"
          stroke={CYAN}
          strokeWidth={1.8}
          strokeLinejoin="round"
          strokeLinecap="round"
          className={visible ? 'attnres-animate-draw-line' : ''}
          style={{
            strokeDasharray: 1200,
            strokeDashoffset: visible ? undefined : 1200,
            animationDelay: `${delayMs + 200}ms`,
          }}
          opacity={0.85}
        />
        <polyline
          points={polyOn}
          fill="none"
          stroke={YELLOW}
          strokeWidth={1.8}
          strokeLinejoin="round"
          strokeLinecap="round"
          className={visible ? 'attnres-animate-draw-line' : ''}
          style={{
            strokeDasharray: 1200,
            strokeDashoffset: visible ? undefined : 1200,
            animationDelay: `${delayMs + 400}ms`,
          }}
          opacity={0.95}
        />

        <circle
          cx={xPos(epochs, epochs, layout)}
          cy={yPos(dataOn[dataOn.length - 1], yMin, yMax, layout)}
          r={3}
          fill={YELLOW}
          className={`transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: `${delayMs + 1400}ms` }}
        />
        <circle
          cx={xPos(epochs, epochs, layout)}
          cy={yPos(dataOff[dataOff.length - 1], yMin, yMax, layout)}
          r={3}
          fill={CYAN}
          className={`transition-opacity duration-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: `${delayMs + 1400}ms` }}
        />
      </svg>
    </div>
  );
}

function Legend({ visible }: { visible: boolean }) {
  return (
    <div
      className={`mb-2 mt-1 flex items-center justify-center gap-6 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
      style={{ transitionDelay: '300ms' }}
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-[2px] w-4 rounded"
          style={{ background: YELLOW }}
        />
        <span className="font-mono text-xs text-slate-300">AttnRes ON</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-[2px] w-4 rounded"
          style={{ background: CYAN }}
        />
        <span className="font-mono text-xs text-slate-300">
          Standard Residual
        </span>
      </div>
    </div>
  );
}

export default function TrainingChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className="my-10">
      <div className="attnres-manim-canvas attnres-manim-grid px-6 py-5">
        <Legend visible={visible} />

        <Chart
          title="Loss Curves"
          yLabel="Loss"
          dataOn={LOSS_ON}
          dataOff={LOSS_OFF}
          yMin={0.82}
          yMax={1.0}
          formatTick={(v) => v.toFixed(2)}
          visible={visible}
          delayMs={0}
        />

        <div className="h-4" />

        <Chart
          title="Layer-1 Gradient Magnitude"
          yLabel="Gradient Mag."
          dataOn={GRAD_ON}
          dataOff={GRAD_OFF}
          yMin={0}
          yMax={0.0014}
          formatTick={(v) => v.toFixed(4)}
          visible={visible}
          delayMs={600}
        />
      </div>

      <figcaption className="attnres-figure-caption">
        Training curves over 50 epochs. Attention Residuals achieve lower loss
        and sustain growing gradients in Layer 1 - standard residuals plateau.
      </figcaption>
    </figure>
  );
}
