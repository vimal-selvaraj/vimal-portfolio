import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { FileText, MessageSquareText, ShieldCheck, Zap } from 'lucide-react'
import type { ProjectVisual as VisualKind } from '../../data/portfolio'
import './ProjectVisual.css'

/*
 * Illustrative, brand-free UI compositions — deliberately abstract so they
 * never reproduce any real (confidential) product screen.
 */

function CrmVisual() {
  return (
    <div className="pv-crm">
      <div className="pv-side">
        <span className="pv-logo" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`pv-side-item ${i === 1 ? 'is-active' : ''}`} />
        ))}
      </div>
      <div className="pv-main">
        <div className="pv-tabs">
          {['Unit A', 'Unit B', 'Unit C', 'Unit D'].map((t, i) => (
            <span key={t} className={`pv-tab ${i === 0 ? 'is-active' : ''}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="pv-kpis">
          {[72, 48, 86].map((w, i) => (
            <div key={i} className="pv-kpi">
              <span className="pv-line pv-line--sm" />
              <span className="pv-kpi-num" />
              <span className="pv-kpi-bar" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="pv-table">
          {[0, 1, 2, 3, 4].map((r) => (
            <div key={r} className="pv-row" style={{ animationDelay: `${r * 0.12}s` }}>
              <span className="pv-avatar" />
              <span className="pv-line" style={{ width: `${40 + ((r * 17) % 30)}%` }} />
              <span className="pv-line pv-line--dim" style={{ width: `${18 + ((r * 11) % 14)}%` }} />
              <span className={`pv-chip pv-chip--${r % 3}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="pv-float pv-float--rbac">
        <ShieldCheck size="1.3em" aria-hidden="true" />
        <span>
          <b>SSO</b> · role scoped
        </span>
      </div>
    </div>
  )
}

function CatalogVisual() {
  return (
    <div className="pv-catalog">
      <div className="pv-tiles">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`pv-tile ${i === 2 ? 'is-active' : ''}`}>
            <span className="pv-tile-icon" />
            <span className="pv-line" />
            <span className="pv-line pv-line--dim pv-line--sm" />
          </div>
        ))}
      </div>
      <div className="pv-builder">
        <p className="pv-label">Template · fields</p>
        {['Text', 'Select', 'Date', 'Approver'].map((f, i) => (
          <div key={f} className="pv-field" style={{ animationDelay: `${i * 0.9}s` }}>
            <span className="pv-field-type">{f}</span>
            <span className="pv-line pv-line--dim" />
            <span className={`pv-toggle ${i !== 2 ? 'is-on' : ''}`} />
          </div>
        ))}
        <div className="pv-field pv-field--ghost">+ Add field</div>
      </div>
    </div>
  )
}

function TicketingVisual() {
  const cols = ['New', 'Assigned', 'In progress', 'Closed']
  return (
    <div className="pv-ticket">
      <div className="pv-board">
        {cols.map((c, ci) => (
          <div key={c} className="pv-col">
            <p className="pv-label">{c}</p>
            {Array.from({ length: 3 - (ci % 2) }).map((_, i) => (
              <div key={i} className="pv-card">
                <span className="pv-line" />
                <span className="pv-line pv-line--dim pv-line--sm" />
                <span className="pv-card-foot">
                  <span className="pv-avatar pv-avatar--xs" />
                  <span className={`pv-chip pv-chip--${(ci + i) % 3}`} />
                </span>
              </div>
            ))}
          </div>
        ))}
        {/* A ticket travelling through the workflow */}
        <div className="pv-card pv-card--moving">
          <span className="pv-line" />
          <span className="pv-line pv-line--dim pv-line--sm" />
        </div>
      </div>
      <div className="pv-bus">
        <Zap size="1.1em" aria-hidden="true" />
        <span className="pv-bus-track">
          <span className="pv-bus-dot" />
        </span>
        <span>event · status.changed</span>
      </div>
    </div>
  )
}

function DashboardVisual() {
  const bars = [38, 62, 48, 80, 56, 92, 70, 84]
  return (
    <div className="pv-dash">
      <div className="pv-kpis pv-kpis--4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="pv-kpi">
            <span className="pv-line pv-line--sm" />
            <span className="pv-kpi-num" />
          </div>
        ))}
      </div>
      <div className="pv-charts">
        <div className="pv-panel">
          <p className="pv-label">Tickets · by week</p>
          <div className="pv-bars">
            {bars.map((h, i) => (
              <span key={i} className="pv-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        </div>
        <div className="pv-panel pv-panel--split">
          <p className="pv-label">Resolution</p>
          <svg viewBox="0 0 42 42" className="pv-donut" aria-hidden="true">
            <circle cx="21" cy="21" r="15.9" className="pv-donut-track" />
            <circle cx="21" cy="21" r="15.9" className="pv-donut-a" strokeDasharray="62 38" strokeDashoffset="25" />
            <circle cx="21" cy="21" r="15.9" className="pv-donut-b" strokeDasharray="24 76" strokeDashoffset="63" />
          </svg>
          <svg viewBox="0 0 100 40" className="pv-spark" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 32 L14 26 L28 29 L42 18 L56 21 L70 10 L84 14 L100 4" />
          </svg>
        </div>
      </div>
      <div className="pv-filters">
        {['Priority', 'Team', 'Status', 'Date'].map((f) => (
          <span key={f} className="pv-filter">
            {f} ▾
          </span>
        ))}
      </div>
    </div>
  )
}

function KnowledgeVisual() {
  return (
    <div className="pv-know">
      <div className="pv-stage">
        <p className="pv-label">Ingest</p>
        {['policy.pdf', 'guide.docx', 'article'].map((d, i) => (
          <span key={d} className="pv-doc" style={{ animationDelay: `${i * 0.25}s` }}>
            <FileText size="1.1em" aria-hidden="true" /> {d}
          </span>
        ))}
      </div>
      <span className="pv-flow" aria-hidden="true">
        <span className="pv-flow-dot" />
      </span>
      <div className="pv-stage pv-stage--vec">
        <p className="pv-label">Embed · index</p>
        <div className="pv-vectors">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={`pv-vec ${[5, 9, 14].includes(i) ? 'is-hit' : ''}`}
              style={{ animationDelay: `${(i % 6) * 0.15}s` }}
            />
          ))}
        </div>
      </div>
      <span className="pv-flow" aria-hidden="true">
        <span className="pv-flow-dot" style={{ animationDelay: '0.8s' }} />
      </span>
      <div className="pv-stage pv-stage--chat">
        <p className="pv-label">Retrieve</p>
        <span className="pv-bubble pv-bubble--q">How do I request access?</span>
        <span className="pv-bubble pv-bubble--a">
          <MessageSquareText size="1em" aria-hidden="true" />
          <span className="pv-line" />
          <span className="pv-line pv-line--sm" />
        </span>
      </div>
    </div>
  )
}

const visuals: Record<VisualKind, () => React.JSX.Element> = {
  crm: CrmVisual,
  catalog: CatalogVisual,
  ticketing: TicketingVisual,
  dashboard: DashboardVisual,
  knowledge: KnowledgeVisual,
}

/** Browser-style frame around an illustrative composition; animations run only while on screen. */
export function ProjectVisual({ kind, label }: { kind: VisualKind; label: string }) {
  const [inView, setInView] = useState(false)
  const reduce = useReducedMotion()
  const Visual = visuals[kind]

  return (
    <motion.figure
      className={`pv ${inView && !reduce ? 'is-live' : ''}`}
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ amount: 0.25 }}
    >
      <div className="pv__chrome" aria-hidden="true">
        <span className="pv__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pv__url">{label}</span>
      </div>
      <div className="pv__screen" role="img" aria-label={`Illustrative interface concept for ${label}`}>
        <Visual />
      </div>
      <figcaption className="pv__caption mono">Illustrative concept · not a product screenshot</figcaption>
    </motion.figure>
  )
}
