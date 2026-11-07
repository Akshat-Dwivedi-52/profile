import { MapPin, ArrowUpRight } from 'lucide-react'
import ContributionGraph from '@/components/ContributionGraph'
import LatestActivity from '@/components/LatestActivity'
import ThemeToggle from '@/components/ThemeToggle'
import LangIcon, { type Lang } from '@/components/LangIcon'

const socials = [
  { label: 'X', href: 'https://x.com/akshatxsashvat' },
  { label: 'Mail', href: 'mailto:akshatdiwedi151@gmail.com' },
  { label: 'Github', href: 'https://github.com/akshat-dwivedi-52' },
  { label: 'Instagram', href: 'https://www.instagram.com/akshat_dwivedi_ceo/' },
]

const projects: {
  title: string
  shortDesc: string
  langs?: Lang[]
  status?: string
  href: string
  description: string
}[] = [
    {
      title: 'Agent Accelerator',
      shortDesc: 'Agents SDK',
      langs: ['typescript'],
      href: 'https://github.com/sashvat-bharat/agent-accelerator',
      description:
        'High-performance SDK for building AI agents with a unified API across AI providers. Optimized for observability, and seamless agent orchestration. Built to power production-grade agentic systems and harnesses for teams at any scale.',
    },
    {
      title: 'JIT Tool Spawning Protocol',
      shortDesc: 'LLM Routing',
      langs: ['python'],
      href: 'https://github.com/sashvat-bharat/jit-tool-protocol',
      description:
        'A server-side routing architecture that lets AI agents scale to thousands of tools without context bloat, hallucinations, or spiraling API costs while saving up to ~88.8% tokens.',
    },
    {
      title: 'Micro-GPT-50M',
      shortDesc: 'SLM, GPT, Dense',
      langs: ['python'],
      href: 'https://huggingface.co/Akshat-Dwivedi/micro-gpt',
      description:
        'Micro-GPT is a compact 50M parameter dense, decoder-only GPT model pre-trained on ~1B tokens with a token density of ~20.5 tokens per parameter.',
    },
    {
      title: 'Self Evolving Memory for AI Agent',
      shortDesc: 'Vector DB',
      langs: ['rust', 'typescript'],
      status: 'In progress',
      href: 'https://github.com/',
      description:
        'A memory system inspired by the human brain. Able to manage itself by removing unwanted facts and memories, keeping only valuable facts, and connecting/organizing them as the corpus grows.',
    },
  ]

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const

const page = () => {
  return (
    <main className="wrapper">
      <ThemeToggle />
      <div className="container">

        <header className="profile-section">

          <div className="picture-and-name">
            <div className="profile-picture">
              <img src="/profile-pic.jpg" alt="Akshat Dwivedi" />
            </div>
            <h1 className="profile-name">Akshat Dwivedi</h1>
          </div>

          <div className="description">
            <p className="role">
              Founder &amp; CEO{' '}
              <a href="https://sashvat.com" {...externalProps}>
                @Sashvat Bharat
                <ArrowUpRight size={14} />
              </a>
            </p>
            <p className="text">
              Frontend, Backend &amp; AI Engineer. building high-performance, durable agentic architectures from scratch.
            </p>
            <p className="normal-text">
              Currently working on a super app powered by a stack I built myself from scratch, including the Agents SDK, the Harness, the Editor and more.
            </p>
            <div className="location">
              <MapPin size={16} />
              Nagpur, Maharashtra, Bharat
            </div>
          </div>

          <nav className="button-group" aria-label="Social links">
            {socials.map((s) => (
              // mailto: hands off to the mail app, so it must not open a new tab.
              <a key={s.label} className="button" href={s.href} {...(s.href.startsWith('mailto:') ? {} : externalProps)}>
                {s.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>

        </header>

        <ContributionGraph />
        <LatestActivity />

        <section className="projects-catalouge" aria-label="Projects">
          <h2 className="section-label">Projects</h2>
          {projects.map((p, i) => (
            <a key={p.title} className="project" href={p.href} {...externalProps}>
              <div className="number">{String(i + 1).padStart(2, '0')}</div>

              <div className="about">
                <div className="title-shrtdesc-lang">
                  <div className="left">
                    <div className="title">{p.title}</div>
                    <div className="short-desc">{p.shortDesc}</div>
                    {p.langs && (
                      <div className="langs">
                        {p.langs.map((l) => <LangIcon key={l} lang={l} />)}
                      </div>
                    )}
                  </div>
                  {p.status && <span className="status">{p.status}</span>}
                </div>

                <p className="description">{p.description}</p>
              </div>
            </a>
          ))}
        </section>

        <footer className="footer-quote">
          <blockquote>Execute with intent, or don&rsquo;t execute at all.</blockquote>
        </footer>

      </div>
    </main>
  )
}

export default page
