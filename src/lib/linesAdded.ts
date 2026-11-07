const USERNAME = 'akshat-dwivedi-52'
const HEADERS = { Accept: 'application/vnd.github+json' }
const CACHE = { next: { revalidate: 3600 } } as const

type Week = { w: number; a: number; d: number; c: number }
type Contributor = { author: { login: string } | null; weeks: Week[] }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Every public repo that has a commit by the user so far this year.
async function reposWithCommits(year: number): Promise<string[]> {
  const q = encodeURIComponent(`author:${USERNAME} author-date:>=${year}-01-01`)
  const repos = new Set<string>()
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(
      `https://api.github.com/search/commits?q=${q}&per_page=100&page=${page}`,
      { headers: HEADERS, ...CACHE },
    )
    if (!res.ok) break
    const data = await res.json()
    const items: { repository: { full_name: string } }[] = data.items ?? []
    for (const i of items) repos.add(i.repository.full_name)
    if (items.length < 100) break
  }
  return [...repos]
}

// GitHub computes contributor stats lazily: the first request answers 202 with an empty body.
async function additionsInRepo(repo: string, since: number): Promise<number> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`https://api.github.com/repos/${repo}/stats/contributors`, {
      headers: HEADERS,
      ...CACHE,
    })
    if (res.status === 202) {
      await sleep(1500)
      continue
    }
    if (!res.ok) return 0
    const data: Contributor[] = await res.json()
    const me = data.find((c) => c.author?.login.toLowerCase() === USERNAME)
    if (!me) return 0
    return me.weeks.filter((w) => w.w >= since).reduce((sum, w) => sum + w.a, 0)
  }
  return 0
}

/**
 * Approximate lines added this calendar year across public repos. Weekly stats start on
 * Sundays, so the week that straddles 1 Jan is left out. Returns null if GitHub can't answer.
 */
export async function getLinesAddedThisYear(): Promise<{ year: number; lines: number } | null> {
  try {
    const year = new Date().getUTCFullYear()
    const since = Date.UTC(year, 0, 1) / 1000
    const repos = await reposWithCommits(year)
    if (repos.length === 0) return null
    const counts = await Promise.all(repos.map((r) => additionsInRepo(r, since)))
    return { year, lines: counts.reduce((a, b) => a + b, 0) }
  } catch {
    return null
  }
}
