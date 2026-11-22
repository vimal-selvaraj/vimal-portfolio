import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import './SectionHeading.css'

type SectionHeadingProps = {
  index: string
  label: string
  title: ReactNode
  intro?: ReactNode
  id?: string
}

/** Editorial section header: numbered label rule + large title + optional intro. */
export function SectionHeading({ index, label, title, intro, id }: SectionHeadingProps) {
  return (
    <header className="shead">
      <Reveal className="shead__label mono">
        <span className="shead__index">{index}</span>
        <span className="shead__rule" aria-hidden="true" />
        <span>{label}</span>
      </Reveal>
      <div className="shead__body">
        <Reveal delay={0.05}>
          <h2 className="shead__title" id={id}>
            {title}
          </h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.12} className="shead__intro muted">
            {intro}
          </Reveal>
        )}
      </div>
    </header>
  )
}
