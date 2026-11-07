import { siTypescript, siPython, siRust } from 'simple-icons'

type Lang = 'typescript' | 'python' | 'rust'

const icons: Record<Lang, { title: string; path: string; hex: string }> = {
  typescript: siTypescript,
  python: siPython,
  rust: siRust,
}

export type { Lang }

// Brand colours come from simple-icons. Rust's brand colour is pure black, which vanishes in
// dark mode, so it follows the text colour instead.
const colors: Record<Lang, string> = {
  typescript: `#${siTypescript.hex}`,
  python: `#${siPython.hex}`,
  rust: 'var(--fg)',
}

const LangIcon = ({ lang, size = 15 }: { lang: Lang; size?: number }) => {
  const icon = icons[lang]
  return (
    <svg
      className="lang-icon"
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={colors[lang]}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  )
}

export default LangIcon
