'use client';

import { Highlight, themes, type PrismTheme } from 'prism-react-renderer';

const vsCodeTheme: PrismTheme = {
  ...themes.vsDark,
  styles: [
    ...themes.vsDark.styles,
    { types: ['function'], style: { color: '#DCDCAA' } },
    { types: ['method', 'property-access'], style: { color: '#D4D4D4' } },
    {
      types: ['class-name', 'maybe-class-name', 'builtin'],
      style: { color: '#4EC9B0' },
    },
  ],
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({
  code,
  language = 'python',
}: CodeBlockProps) {
  return (
    <Highlight theme={vsCodeTheme} code={code.trim()} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="my-8 overflow-x-auto rounded-lg p-5 font-mono text-sm leading-relaxed"
          style={{ ...style }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
