import React, { useState, useEffect, useRef } from 'react'
import './App.css'

// ── Utility: simple intersection observer hook ──────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#values', label: 'Our Values' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#get-started', label: 'Get Started' },
    { href: '#about', label: 'About Us' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#hero" className="nav__logo">
          <img src="/logo.png" alt="Camo Man Outdoors" />
        </a>
        <button
          className={`nav__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li><a href="#get-started" className="nav__cta" onClick={() => setMenuOpen(false)}>Book Now</a></li>
        </ul>
      </div>
    </nav>
  )
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="hero__content container">
        <div className="hero__logo-wrap">
          <img src="/logo.png" alt="Camo Man Outdoors logo" className="hero__logo" />
        </div>
        <div className="hero__text">
          <p className="hero__eyebrow">Licensed New York State Hunting &amp; Fishing Guide</p>
          <h1 className="hero__headline">
            Making Your Memories<br /><em>The Trophy</em>
          </h1>
          <p className="hero__sub">Covering all of New York State</p>
          <div className="hero__actions">
            <a href="#get-started" className="btn btn--gold">Book a Trip</a>
            <a href="#portfolio" className="btn btn--outline">See Our Work</a>
          </div>
        </div>
      </div>
      <div className="hero__scroll-hint">
        <span>↓</span>
      </div>
    </section>
  )
}

// ── VALUES ───────────────────────────────────────────────────────────────────
function Values() {
  const [ref, visible] = useReveal()

  const values = [
    {
      icon: '🦌',
      title: 'Passion for the Outdoors',
      body: 'We live and breathe every season. Our guides are lifelong hunters and anglers who bring genuine enthusiasm to every trip — not just a job, but a calling.'
    },
    {
      icon: '🤝',
      title: 'Client-First Guiding',
      body: 'Your experience is our priority. We customize each trip around your skill level, goals, and preferences, ensuring you feel confident and comfortable from the first cast to the last stand.'
    },
    {
      icon: '🗺️',
      title: 'Deep Local Knowledge',
      body: 'Years of hunting and fishing every corner of New York State have given us unmatched insight into terrain, patterns, and prime locations across all regions.'
    },
    {
      icon: '⚖️',
      title: 'Ethical & Legal Practice',
      body: 'As NY Licensed Hunting and Fishing Guides, we operate with full legal compliance and deep respect for wildlife conservation, fair chase, and responsible harvest.'
    },
    {
      icon: '📸',
      title: 'Memory-Making Moments',
      body: 'A trophy isn\'t just what you mount on the wall. It\'s the story, the moment, the people beside you. We make sure those memories last a lifetime.'
    },
    {
      icon: '🌲',
      title: 'Respect for the Land',
      body: 'We leave every field, forest, and waterway better than we found it — stewardship of the land is fundamental to everything we do.'
    },
  ]

  return (
    <section id="values" className="values-section">
      <div className="container">
        <div ref={ref} className={`values-header reveal ${visible ? 'revealed' : ''}`}>
          <p className="section-label">Who We Are</p>
          <h2 className="section-title values-title">Our Values</h2>
          <div className="gold-rule"><span className="gold-rule-icon">✦</span></div>
          <p className="values-intro">
            Camo Man Outdoors was built on a simple belief: every person who steps into the New York wilderness deserves a guide who cares as much about their experience as they do about the harvest.
          </p>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className={`value-card reveal ${visible ? 'revealed' : ''}`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="value-card__icon">{v.icon}</div>
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__body">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  const [ref, visible] = useReveal()

  const services = [
    {
      category: 'Hunting',
      title: 'Whitetail Deer',
      description: 'From early bow season through late firearms season, we put you in position for mature bucks across private and public New York land. Archery, crossbow, and rifle hunts available.',
      details: ['Archery / Crossbow Hunts', 'Rifle & Muzzleloader Season', 'Scouting & Pre-Season Prep', 'Field Dressing Assistance', 'All Regions of New York State'],
      cta: '#get-started',
      ctaText: 'Book a Deer Hunt',
      accent: 'var(--forest-light)',
    },
    {
      category: 'Fishing',
      title: 'Inland Open Water Fishing',
      description: 'From bass and walleye to trout and pike, New York\'s inland lakes, rivers, and reservoirs hold incredible fisheries. We know where they are and how to catch them.',
      details: ['Bass, Walleye & Pike', 'Trout Streams & Rivers', 'Reservoir Fishing', 'Catch & Release or Harvest', 'Beginner-Friendly Trips'],
      cta: '#get-started',
      ctaText: 'Book Open Water',
      accent: 'var(--olive)',
    },
    {
      category: 'Fishing',
      title: 'Ice Fishing',
      description: 'Don\'t let winter shut down your season. New York\'s frozen lakes are alive with perch, walleye, northern pike, and more. We handle all the gear — you just show up and fish.',
      details: ['Perch, Walleye & Pike', 'All Gear Provided', 'Heated Shelter Available', 'Tip-Up & Jigging Methods', 'Family & Group Trips Welcome'],
      cta: '#get-started',
      ctaText: 'Book Ice Fishing',
      accent: 'var(--bark)',
    },
  ]

  return (
    <section id="services" className="services-section">
      <div className="services-bg-texture" />
      <div className="container">
        <div ref={ref} className={`services-header reveal ${visible ? 'revealed' : ''}`}>
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Guided Experiences</h2>
          <div className="gold-rule"><span className="gold-rule-icon">✦</span></div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card reveal ${visible ? 'revealed' : ''}`} style={{ animationDelay: `${i * 120}ms` }}>
              <div className="service-card__eyebrow">{s.category}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
              <ul className="service-card__list">
                {s.details.map((d, j) => <li key={j}><span className="check">✓</span>{d}</li>)}
              </ul>
              <a href={s.cta} className="btn btn--gold service-card__btn">{s.ctaText}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PORTFOLIO ────────────────────────────────────────────────────────────────
function Portfolio() {
  const [ref, visible] = useReveal()
  const [activeTab, setActiveTab] = useState('deer')

  const tabs = [
    { id: 'deer', label: 'Whitetail Deer' },
    { id: 'fishing', label: 'Inland Fishing' },
  ]

  const placeholders = {
    deer: [
      { caption: 'Opening Weekend Buck', sub: 'Southern Tier, NY' },
      { caption: 'First Deer – Youth Hunt', sub: 'Catskill Mountains' },
      { caption: 'Late Season 10-Point', sub: 'Hudson Valley' },
      { caption: 'Bow Season Trophy', sub: 'Finger Lakes Region' },
      { caption: 'Family Hunt Success', sub: 'Adirondack Foothills' },
      { caption: 'Public Land Giant', sub: 'Western New York' },
    ],
    fishing: [
      { caption: 'Monster Walleye', sub: 'Oneida Lake' },
      { caption: 'Ice Fishing Perch', sub: 'Lake Champlain' },
      { caption: 'Summer Bass', sub: 'Finger Lakes' },
      { caption: 'Trophy Northern Pike', sub: 'St. Lawrence Region' },
      { caption: 'Trout Season Opener', sub: 'Catskill Streams' },
      { caption: 'Ice Fishing Walleye', sub: 'Lake Ontario Tributaries' },
    ],
  }

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div ref={ref} className={`portfolio-header reveal ${visible ? 'revealed' : ''}`}>
          <p className="section-label">Trophy Moments</p>
          <h2 className="section-title">Portfolio</h2>
          <div className="gold-rule"><span className="gold-rule-icon">✦</span></div>
          <p className="portfolio-intro">Every trip tells a story. These are some of ours.</p>
        </div>

        <div className="portfolio-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`portfolio-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {placeholders[activeTab].map((item, i) => (
            <div key={`${activeTab}-${i}`} className={`portfolio-card reveal ${visible ? 'revealed' : ''}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="portfolio-card__img-wrap">
                <div className="portfolio-card__placeholder">
                  <span className="portfolio-card__icon">{activeTab === 'deer' ? '🦌' : '🎣'}</span>
                  <p className="portfolio-card__placeholder-text">Your Photo Here</p>
                </div>
              </div>
              <div className="portfolio-card__info">
                <p className="portfolio-card__caption">{item.caption}</p>
                <p className="portfolio-card__sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-note">
          <p>📸 Photo gallery coming soon — real client memories in the field.</p>
        </div>
      </div>
    </section>
  )
}

// ── GET STARTED ──────────────────────────────────────────────────────────────
function GetStarted() {
  const [ref, visible] = useReveal()

  return (
    <section id="get-started" className="getstarted-section">
      <div className="getstarted-bg" />
      <div className="container">
        <div ref={ref} className={`getstarted-inner reveal ${visible ? 'revealed' : ''}`}>
          <p className="section-label" style={{ color: 'var(--gold-light)' }}>Ready to Go?</p>
          <h2 className="section-title getstarted-title">Let's Plan Your Trip</h2>
          <div className="gold-rule"><span className="gold-rule-icon">✦</span></div>
          <p className="getstarted-sub">
            Choose your adventure below and book directly. Spots are limited — don't miss your season.
          </p>

          <div className="booking-cards">
            <div className="booking-card">
              <div className="booking-card__icon">🦌</div>
              <h3>Whitetail Deer Hunts</h3>
              <p>Archery, crossbow, and firearm hunts. All skill levels welcome across New York State.</p>
              <a
                href="mailto:camomanoutdoors@gmail.com?subject=Whitetail Deer Hunt Inquiry"
                className="btn btn--gold"
              >
                Book a Deer Hunt
              </a>
            </div>
            <div className="booking-card booking-card--feature">
              <div className="booking-card__badge">Most Popular</div>
              <div className="booking-card__icon">🎣</div>
              <h3>Inland Fishing Trips</h3>
              <p>Open water and ice fishing for bass, walleye, pike, perch, and trout — year-round.</p>
              <a
                href="mailto:camomanoutdoors@gmail.com?subject=Inland Fishing Trip Inquiry"
                className="btn btn--gold"
              >
                Book a Fishing Trip
              </a>
            </div>
          </div>

          <div className="getstarted-contact">
            <p>Questions? Reach us directly:</p>
            <a href="mailto:camomanoutdoors@gmail.com" className="contact-email">
              camomanoutdoors@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div ref={ref} className={`about-inner reveal ${visible ? 'revealed' : ''}`}>
          <div className="about-photo-col">
            <div className="about-photo-frame">
              <img src="/about.jpg" alt="Camo Man & Camo Lady" className="about-photo" />
              <div className="about-photo-caption">
                <span>Camo Man &amp; Camo Lady</span>
              </div>
            </div>
          </div>
          <div className="about-text-col">
            <p className="section-label">The Guides</p>
            <h2 className="section-title about-title">About Us</h2>
            <div className="gold-rule"><span className="gold-rule-icon">✦</span></div>
            <p className="about-body">
              We are a husband and wife team who have spent a lifetime pursuing whitetail deer, chasing fish through every season, and falling in love with the wild places New York has to offer.
            </p>
            <p className="about-body">
              As New York State Licensed Hunting and Fishing Guides, we bring professional expertise together with a genuine passion for getting people outdoors. Whether you're a first-timer who's never held a rod, or a seasoned hunter looking to unlock new ground, we tailor every experience to you.
            </p>
            <p className="about-body">
              For us, the trophy isn't just the animal — it's the story you'll tell for the rest of your life. That's what we're here to help you create.
            </p>
            <div className="about-badges">
              <div className="badge">🏷️ NY State Licensed Guide</div>
              <div className="badge">🗺️ All of New York State</div>
              <div className="badge">📅 Year-Round Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/logo.png" alt="Camo Man Outdoors" className="footer-logo" />
            <p className="footer-tagline">Making your memories the trophy</p>
          </div>
          <div className="footer-links">
            <h4>Navigate</h4>
            <ul>
              <li><a href="#values">Our Values</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#get-started">Get Started</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <a href="mailto:camomanoutdoors@gmail.com">camomanoutdoors@gmail.com</a>
            <p>Licensed New York State<br />Hunting &amp; Fishing Guide</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Camo Man Outdoors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Values />
        <Services />
        <Portfolio />
        <GetStarted />
        <About />
      </main>
      <Footer />
    </>
  )
}
