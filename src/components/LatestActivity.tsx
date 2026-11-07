import { GitCommitHorizontal, GitPullRequest } from 'lucide-react'

const USERNAME = 'akshat-dwivedi-52'
const GH_HEADERS = { Accept: 'application/vnd.github+json' }
const CACHE = { next: { revalidate: 1800 } } as const

type GhEvent = {
  type: string
  created_at: string
  repo: { name: string; url: string }
  payload: { head?: string; pull_request?: { url: string; number: number } }
}

type Activity = {
  kind: 'commit' | 'pr'
  title: string
  href: string
  repo: string
  ref: string // short sha or "PR #n"
  date: string
}

const getJson = async (url: string) => {
  const res = await fetch(url, { headers: GH_HEADERS, ...CACHE })
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

// The events feed has no commit messages or PR titles, so the newest event is resolved
// with one extra request. If that fails (e.g. a deleted branch) the next event is tried.
async function resolve(e: GhEvent): Promise<Activity | null> {
  const repo = e.repo.name.split('/')[1]
  try {
    if (e.type === 'PushEvent' && e.payload.head) {
      const c = await getJson(`${e.repo.url}/commits/${e.payload.head}`)
      return {
        kind: 'commit',
        title: String(c.commit.message).split('\n')[0],
        href: c.html_url,
        repo,
        ref: String(c.sha).slice(0, 7),
        date: e.created_at,
      }
    }
    if (e.type === 'PullRequestEvent' && e.payload.pull_request) {
      const pr = await getJson(e.payload.pull_request.url)
      return {
        kind: 'pr',
        title: pr.title,
        href: pr.html_url,
        repo,
        ref: `PR #${pr.number}`,
        date: e.created_at,
      }
    }
  } catch {}
  return null
}

async function getLatest(): Promise<Activity | null> {
  try {
    const events: GhEvent[] = await getJson(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=30`,
    )
    // The feed is not guaranteed to be in order, so sort newest first.
    const candidates = events
      .filter((e) => e.type === 'PushEvent' || e.type === 'PullRequestEvent')
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 3)
    for (const e of candidates) {
      const found = await resolve(e)
      if (found) return found
    }
  } catch {}
  return null
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

const LatestActivity = async () => {
  const a = await getLatest()
  if (!a) return null

  const Icon = a.kind === 'commit' ? GitCommitHorizontal : GitPullRequest
  const label = a.kind === 'commit' ? 'Latest commit' : 'Latest pull request'

  return (
    <a
      className="latest"
      href={a.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${a.title}`}
      title={label}
    >
      <Icon size={20} strokeWidth={1.75} />
      <span className="latest-title">{a.title}</span>
      <span className="latest-meta">
        {a.repo} · {a.ref} · {formatDate(a.date)}
      </span>
    </a>
  )
}

export default LatestActivity
