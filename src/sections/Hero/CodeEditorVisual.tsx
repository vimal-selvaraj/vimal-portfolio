import { useEffect, useReducer, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { GitBranch } from 'lucide-react'
import './CodeEditorVisual.css'

/** A token is [syntax class, text]. A line is a list of tokens. */
type Tok = [string, string]
type Snippet = { file: string; lang: string; lines: Tok[][]; cmd: string; out: Tok[][] }

const SNIPPETS: Snippet[] = [
  {
    file: 'tickets.route.ts',
    lang: 'TypeScript',
    lines: [
      [['v', 'router'], ['p', '.'], ['fn', 'get'], ['p', '('], ['str', "'/tickets'"], ['p', ', '], ['v', 'auth'], ['p', ',']],
      [['p', '  '], ['kw', 'async'], ['p', ' ('], ['v', 'req'], ['p', ', '], ['v', 'res'], ['p', ') => {']],
      [['p', '    '], ['kw', 'const'], ['p', ' { '], ['v', 'tenantId'], ['p', ' } = '], ['v', 'req'], ['p', '.'], ['v', 'user']],
      [['p', '    '], ['kw', 'const'], ['p', ' '], ['v', 'rows'], ['p', ' = '], ['kw', 'await'], ['p', ' '], ['v', 'db'], ['p', '.'], ['fn', 'query'], ['p', '(']],
      [['p', '      '], ['str', "'SELECT * FROM get_tickets($1)'"], ['p', ',']],
      [['p', '      ['], ['v', 'tenantId'], ['p', '],']],
      [['p', '    )']],
      [['p', '    '], ['v', 'res'], ['p', '.'], ['fn', 'json'], ['p', '('], ['v', 'rows'], ['p', ')']],
      [['p', '  })']],
    ],
    cmd: 'curl localhost:3000/tickets',
    out: [
      [['dim', '→ '], ['t', 'UI      '], ['dim', 'React · TypeScript']],
      [['dim', '→ '], ['t', 'Gateway '], ['dim', 'Node · Express']],
      [['dim', '→ '], ['t', 'Services'], ['dim', ' REST · RBAC · SSO']],
      [['dim', '→ '], ['t', 'Data    '], ['dim', 'PostgreSQL']],
      [['ok', '✓ 200 OK']],
    ],
  },
  {
    file: 'TicketList.tsx',
    lang: 'TSX',
    lines: [
      [['kw', 'export function'], ['p', ' '], ['fn', 'TicketList'], ['p', '() {']],
      [['p', '  '], ['kw', 'const'], ['p', ' { '], ['v', 'data'], ['p', ', '], ['v', 'isLoading'], ['p', ' } =']],
      [['p', '    '], ['fn', 'useTickets'], ['p', '({ '], ['v', 'status'], ['p', ': '], ['str', "'open'"], ['p', ' })']],
      [['p', '  '], ['kw', 'if'], ['p', ' ('], ['v', 'isLoading'], ['p', ') '], ['kw', 'return'], ['p', ' <'], ['tag', 'Skeleton'], ['p', ' />']],
      [['p', '  '], ['kw', 'return'], ['p', ' (']],
      [['p', '    <'], ['tag', 'Table']],
      [['p', '      '], ['attr', 'rows'], ['p', '={'], ['v', 'data'], ['p', '}']],
      [['p', '      '], ['attr', 'onRowClick'], ['p', '={'], ['fn', 'openTicket'], ['p', '}']],
      [['p', '    />']],
      [['p', '  )']],
      [['p', '}']],
    ],
    cmd: 'npm test',
    out: [
      [['ok', '✓ '], ['t', 'renders open tickets']],
      [['ok', '✓ '], ['t', 'shows a skeleton while loading']],
      [['ok', '✓ '], ['t', 'opens a ticket on row click']],
      [['dim', 'Tests: '], ['ok', '3 passed']],
    ],
  },
  {
    file: 'indexes.sql',
    lang: 'PostgreSQL',
    lines: [
      [['kw', 'CREATE INDEX'], ['p', ' '], ['v', 'idx_tickets_tenant']],
      [['p', '  '], ['kw', 'ON'], ['p', ' '], ['v', 'tickets'], ['p', ' ('], ['v', 'tenant_id'], ['p', ', '], ['v', 'status'], ['p', ');']],
      [],
      [['kw', 'SELECT'], ['p', ' '], ['v', 'id'], ['p', ', '], ['v', 'title'], ['p', ', '], ['v', 'status']],
      [['kw', 'FROM'], ['p', ' '], ['v', 'tickets']],
      [['kw', 'WHERE'], ['p', ' '], ['v', 'tenant_id'], ['p', ' = '], ['num', '$1']],
      [['kw', 'ORDER BY'], ['p', ' '], ['v', 'updated_at'], ['p', ' '], ['kw', 'DESC']],
      [['kw', 'LIMIT'], ['p', ' '], ['num', '20'], ['p', ';']],
    ],
    cmd: 'npm run migrate',
    out: [
      [['ok', '✓ '], ['t', 'CREATE INDEX idx_tickets_tenant']],
      [['ok', '✓ '], ['t', 'plan: Index Scan on tickets']],
    ],
  },
]

const lineLength = (line: Tok[]) => line.reduce((n, [, t]) => n + t.length, 0)
const codeLength = (s: Snippet) => s.lines.reduce((n, l) => n + lineLength(l) + 1, 0)

type State = { snip: number; code: number; cmd: number; out: number; hold: number }
const START: State = { snip: 0, code: 0, cmd: 0, out: 0, hold: 0 }

/** One tick of the typing machine: code → command → output lines → hold → next tab. */
function tick(s: State): State {
  const snippet = SNIPPETS[s.snip]
  if (s.code < codeLength(snippet)) return { ...s, code: Math.min(codeLength(snippet), s.code + 2) }
  if (s.cmd < snippet.cmd.length) return { ...s, cmd: s.cmd + 1 }
  if (s.out < snippet.out.length) return { ...s, hold: s.hold + 1, ...(s.hold % 7 === 6 ? { out: s.out + 1 } : {}) }
  if (s.hold < 120) return { ...s, hold: s.hold + 1 }
  return { ...START, snip: (s.snip + 1) % SNIPPETS.length }
}

/** Render the first `budget` characters of a snippet's code (syntax-coloured), with the caret inline. */
function renderCode(lines: Tok[][], budget: number, caret: boolean) {
  let left = budget
  return lines.map((line, i) => {
    if (left <= 0 && i > 0) return null
    const parts: React.ReactNode[] = []
    for (const [cls, text] of line) {
      if (left <= 0) break
      const shown = text.slice(0, left)
      left -= shown.length
      parts.push(
        <span key={parts.length} className={`ce-${cls}`}>
          {shown}
        </span>,
      )
    }
    const isCurrent = left <= 0 || (left === 1 && i === lines.length - 1)
    left -= 1 // newline
    return (
      <div key={i} className="ce-line">
        <span className="ce-gutter">{i + 1}</span>
        <span className="ce-text">
          {parts}
          {caret && isCurrent && <span className="ce-caret" />}
        </span>
      </div>
    )
  })
}

/**
 * Code editor that types real-looking code from the stack (Express, React, PostgreSQL),
 * then "runs" it in a terminal. Pauses off screen and while the page scrolls;
 * reduced motion shows the first file complete.
 */
export function CodeEditorVisual() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2 })
  const full: State = { snip: 0, code: codeLength(SNIPPETS[0]), cmd: SNIPPETS[0].cmd.length, out: SNIPPETS[0].out.length, hold: 0 }
  const [state, dispatch] = useReducer(tick, START)
  const s = reduce ? full : state
  const snippet = SNIPPETS[s.snip]
  const typingDone = s.code >= codeLength(snippet)

  useEffect(() => {
    if (reduce || !inView) return
    const id = window.setInterval(() => {
      // Hold still while the page is scrolling, so scrolling gets every frame.
      if (document.documentElement.classList.contains('is-scrolling')) return
      dispatch()
    }, 32)
    return () => window.clearInterval(id)
  }, [reduce, inView])

  return (
    <div ref={ref} className="ce" role="img" aria-label="Code editor typing an Express route, a React component and a PostgreSQL query">
      <div className="ce-tabs" aria-hidden="true">
        <span className="ce-dots">
          <i />
          <i />
          <i />
        </span>
        {SNIPPETS.map((sn, i) => (
          <span key={sn.file} className={`ce-tab ${i === s.snip ? 'is-active' : ''}`}>
            {sn.file}
          </span>
        ))}
      </div>

      <div className="ce-code" aria-hidden="true">
        {renderCode(snippet.lines, s.code, !typingDone)}
      </div>

      <div className="ce-term" aria-hidden="true">
        <p className="ce-term-title">terminal</p>
        {typingDone && (
          <div className="ce-term-line">
            <span className="ce-prompt">$</span> {snippet.cmd.slice(0, s.cmd)}
            {s.cmd < snippet.cmd.length && <span className="ce-caret ce-caret--term" />}
          </div>
        )}
        {snippet.out.slice(0, s.out).map((line, i) => (
          <div key={i} className="ce-term-line ce-term-out">
            {line.map(([cls, text], j) => (
              <span key={j} className={`ce-${cls}`}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="ce-status" aria-hidden="true">
        <span>
          <GitBranch size={11} /> main
        </span>
        <span>{snippet.lang}</span>
        <span className="ce-status-ok">● ready</span>
      </div>
    </div>
  )
}
