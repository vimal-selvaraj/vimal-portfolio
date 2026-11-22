import { ArrowUp, Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { navItems, profile } from '../../data/portfolio'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#top" className="footer__brand" aria-label={`${profile.name} — back to top`}>
            <span className="footer__mark">{profile.initials}</span>
            <span>
              {profile.name}
              <span className="footer__role mono">{profile.title}</span>
            </span>
          </a>

          <nav aria-label="Footer">
            <ul role="list" className="footer__links">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="mono">
            © {year} {profile.name}
          </p>
          <ul role="list" className="footer__social">
            <li>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail size={16} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <LinkedInIcon size={16} />
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                <GitHubIcon size={16} />
              </a>
            </li>
          </ul>
          <a href="#top" className="footer__top-link mono">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
