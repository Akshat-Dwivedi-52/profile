import { getLinesAddedThisYear } from '@/lib/linesAdded'

const USERNAME = 'akshat-dwivedi-52'

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
type ApiResponse = { total: Record<string, number>; contributions: Day[] }

async function getContributions(): Promise<{ days: Day[]; total: number } | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null
    const data: ApiResponse = await res.json()
    if (!Array.isArray(data.contributions) || data.contributions.length === 0) return null
    return { days: data.contributions, total: Object.values(data.total)[0] ?? 0 }
  } catch {
    return null
  }
}

function getStreaks(days: Day[]) {
  let longest = 0
  let run = 0
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0
    longest = Math.max(longest, run)
  }

  // Today may not have a contribution yet, so a streak is still alive if yesterday had one.
  let i = days.length - 1
  if (i >= 0 && days[i].count === 0) i--
  let current = 0
  while (i >= 0 && days[i].count > 0) {
    current++
    i--
  }
  return { current, longest }
}

const plural = (n: number) => `${n} day${n === 1 ? '' : 's'}`

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })

const ContributionGraph = async () => {
  const [data, lines] = await Promise.all([getContributions(), getLinesAddedThisYear()])
  if (!data) return null

  // Rows are weekdays (Sun-Sat), so pad the first column up to the first day's weekday.
  const offset = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay()
  const { current, longest } = getStreaks(data.days)
  const weeks = Math.ceil((offset + data.days.length) / 7)

  return (
    <section className="contributions" aria-label="GitHub contributions">
      <div className="contributions-head">
        <span>
          {data.total.toLocaleString('en-US')} contributions in the last year
          {current > 0 && <> · {plural(current)} streak</>}
        </span>
        <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">
          @{USERNAME}
        </a>
      </div>

        <div
          className="contributions-grid"
          style={{ '--weeks': weeks } as React.CSSProperties}
          role="img" aria-label={`${data.total} contributions in the last year`}>
          {Array.from({ length: offset }, (_, i) => (
            <span key={`pad-${i}`} className="cell empty" />
          ))}
          {data.days.map((d) => (
            <span
              key={d.date}
              className={`cell level-${d.level}`}
              title={`${d.count} contribution${d.count === 1 ? '' : 's'} on ${formatDate(d.date)}`}
            />
          ))}
        </div>

      <div className="contributions-foot">
        <div className="contributions-stats">
          <span>Current streak <strong>{plural(current)}</strong></span>
          <span>Longest streak <strong>{plural(longest)}</strong></span>
          {lines && lines.lines > 0 && (
            <span title="Approximate, public repositories only">
              Lines added in {lines.year} <strong>{lines.lines.toLocaleString('en-US')}</strong>
            </span>
          )}
        </div>

        <div className="contributions-legend" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`cell level-${l}`} />
          ))}
          More
        </div>
      </div>
    </section>
  )
}

export default ContributionGraph
