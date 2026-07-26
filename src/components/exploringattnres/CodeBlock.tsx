import {
  normalizeTokens,
  Prism,
  themes,
  type PrismTheme,
} from 'prism-react-renderer';

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
  const normalizedLanguage = language.toLowerCase();
  const grammar =
    Prism.languages[normalizedLanguage] ?? Prism.languages.plain;
  const lines = normalizeTokens(
    Prism.tokenize(code.trim(), grammar),
  );

  const tokenStyles = (types: string[]) =>
    types.reduce<React.CSSProperties>((style, type) => {
      for (const entry of vsCodeTheme.styles) {
        if (
          entry.types.includes(type) &&
          (!entry.languages ||
            entry.languages.includes(normalizedLanguage))
        ) {
          Object.assign(style, entry.style);
        }
      }

      return style;
    }, {});

  return (
    <pre
      className="my-8 overflow-x-auto rounded-lg p-5 font-mono text-sm leading-relaxed"
      style={vsCodeTheme.plain}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {line.map((token, tokenIndex) => (
            <span key={tokenIndex} style={tokenStyles(token.types)}>
              {token.content}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}
