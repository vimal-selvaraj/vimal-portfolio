import { ArrowUp } from 'lucide-react'
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
          <p className="mono footer__built">Designed &amp; built with React · TypeScript · Motion</p>
          <a href="#top" className="footer__top-link mono">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
