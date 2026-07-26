'use client';

import {
  type ComponentType,
  useEffect,
  useRef,
  useState,
} from 'react';

const visualizations = {
  residualComparison: () => import('./ResidualComparison'),
  databaseGrowth: () => import('./DatabaseGrowth'),
  alphaGatePipeline: () => import('./AlphaGatePipeline'),
  trainingChart: () => import('./TrainingChart'),
  memoryCoalescing: () => import('./MemoryCoalescing'),
} satisfies Record<
  string,
  () => Promise<{ default: ComponentType<Record<string, never>> }>
>;

const placeholderHeights = {
  residualComparison: 'clamp(280px, 72vw, 520px)',
  databaseGrowth: 'clamp(170px, 41vw, 350px)',
  alphaGatePipeline: 'clamp(160px, 40vw, 330px)',
  trainingChart: 'clamp(340px, 78vw, 620px)',
  memoryCoalescing: 'clamp(180px, 44vw, 370px)',
} satisfies Record<keyof typeof visualizations, string>;

type VisualizationName = keyof typeof visualizations;

export default function LazyVisualization({
  name,
}: {
  name: VisualizationName;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [Visualization, setVisualization] =
    useState<ComponentType<Record<string, never>> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const load = () => {
      visualizations[name]().then((module) => {
        if (!cancelled) {
          setVisualization(() => module.default);
        }
      });
    };

    if (!('IntersectionObserver' in window)) {
      load();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: '700px 0px' },
    );

    observer.observe(container);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [name]);

  return (
    <div ref={containerRef}>
      {Visualization ? (
        <Visualization />
      ) : (
        <div
          aria-hidden="true"
          style={{ minHeight: placeholderHeights[name] }}
        />
      )}
    </div>
  );
}
