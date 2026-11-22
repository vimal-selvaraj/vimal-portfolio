import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import type { ComponentType } from 'react'
import { ArrowUpRight, Check, Copy, Download, Mail, Phone } from 'lucide-react'
import { contact, profile } from '../../data/portfolio'
import { Reveal } from '../../components/ui/Reveal'
import { MagneticLink } from '../../components/ui/MagneticLink'
import './Contact.css'

const EASE = [0.22, 1, 0.36, 1] as const

type IconProps = { size?: number; strokeWidth?: number }

/** Lucide dropped brand marks, so the LinkedIn glyph is drawn inline in the same outline style. */
function LinkedInIcon({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
      <path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5" />
    </svg>
  )
}

type Channel = { label: string; value: string; href: string; icon: ComponentType<IconProps>; external?: boolean; download?: string }

const channels: Channel[] = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, icon: Phone },
  { label: 'LinkedIn', value: 'vimal-selvaraj', href: profile.linkedin, icon: LinkedInIcon, external: true },
  { label: 'Resume', value: 'Download PDF', href: profile.resume, icon: Download, download: profile.resumeFileName },
]

/** Copies the email address and confirms it to sighted and screen-reader users alike. */
function CopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (insecure context, permissions) — fall back to the mail client.
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button type="button" className={`contact__copy ${copied ? 'is-copied' : ''}`} onClick={copy}>
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span>{copied ? 'Copied' : 'Copy email'}</span>
      <span className="sr-only" role="status">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </button>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="contact__label mono">
          <span className="contact__index">08</span>
          <span className="contact__rule" aria-hidden="true" />
          <span>Contact</span>
          <span className="contact__avail">
            <span className="contact__dot" aria-hidden="true" />
            Open to new opportunities
          </span>
        </Reveal>

        {/* The heading (not each line) watches the viewport: lines start clipped by their mask,
            so observing them directly would never report them as visible. */}
        <motion.h2
          className="contact__title"
          id="contact-title"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        >
          {contact.headline.map((line, i) => (
            <span key={line} className="contact__line">
              <motion.span
                className={i === 1 ? 'serif accent' : undefined}
                variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <div className="contact__lead">
          <Reveal as="p" className="contact__desc" delay={0.15}>
            {contact.description}
          </Reveal>
          <Reveal className="contact__actions" delay={0.2}>
            <MagneticLink href={`mailto:${profile.email}`}>
              Say hello <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticLink>
            <CopyEmail />
          </Reveal>
        </div>

        <ul role="list" className="contact__channels">
          {channels.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={c.label} as="li" delay={0.05 * i}>
                <a
                  className="channel"
                  href={c.href}
                  download={c.download}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                >
                  <span className="channel__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="channel__text">
                    <span className="channel__label mono">{c.label}</span>
                    <span className="channel__value">{c.value}</span>
                  </span>
                  <ArrowUpRight className="channel__arrow" size={18} aria-hidden="true" />
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
