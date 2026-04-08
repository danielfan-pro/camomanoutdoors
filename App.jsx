import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function useReveal(threshold = 0.18) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

function Nav({ title }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#values', label: 'Our Values' },
    { href: '#offer', label: 'What We Offer' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#get-started', label: 'Get Started' },
    { href: '#about', label: 'About Us' }
  ]

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a className="nav__brand" href="#hero" aria-label={title}>
          <img className="nav__brand-mark" src="/logo.png" alt="Camo Man Outdoors logo" />
          <span className="nav__brand-text">Camo Man Outdoors</span>
        </a>

        <button
          type="button"
          className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav__menu ${menuOpen ? 'nav__menu--open' : ''}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#get-started" className="nav__cta" onClick={() => setMenuOpen(false)}>
            Book Now
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero({ site }) {
  return (
    <section id="hero" className="hero">
      <div className="hero__backdrop" />
      <div className="hero__wash" />
      <div className="container hero__content">
        <div className="hero__copy">
          <p className="section-kicker">Licensed Guide Service</p>
          <h1>Camo Man Outdoors</h1>
          <p className="hero__title-detail">Licensed New York State Hunting and Fishing Guide</p>
          <p className="hero__slogan">
            <span>Making Your Memories</span>
            <strong>The Trophy</strong>
          </p>
          <p className="hero__service-area">{site.serviceArea}</p>
          <div className="hero__actions">
            <a href="#get-started" className="button button--primary">
              Start Planning
            </a>
            <a href="#offer" className="button button--secondary">
              Explore Services
            </a>
          </div>
          <ul className="hero__highlights" aria-label="Highlights">
            <li>Whitetail Deer Guidance</li>
            <li>Open Water Inland Fishing</li>
            <li>Ice Water Inland Fishing</li>
          </ul>
        </div>

        <div className="hero__brandmark" aria-hidden="true">
          <img src="/about.jpg" alt="" />
        </div>
      </div>
    </section>
  )
}

function Values() {
  const [ref, visible] = useReveal()
  const items = [
    {
      title: 'Mission',
      body: 'Create guided outdoor experiences that are welcoming, safe, and memorable for every client who trusts us with their season.'
    },
    {
      title: 'Principles',
      body: 'We lead with honesty, respect for wildlife, fair chase ethics, and a deep commitment to conservation and legal compliance.'
    },
    {
      title: 'Approach',
      body: 'Every trip is tailored to the group, the season, and the goal, whether that means patient coaching for a first-timer or strategic planning for a serious hunt.'
    }
  ]

  return (
    <section id="values" className="section section--light">
      <div className="container">
        <div ref={ref} className={`section-heading reveal ${visible ? 'reveal--visible' : ''}`}>
          <p className="section-kicker">Our Values</p>
          <h2>Guiding with purpose, patience, and respect for the outdoors.</h2>
          <p className="section-intro">
            Camo Man Outdoors is built around the belief that the best trips deliver more than a harvest or a limit. They create confidence, stories, and memories that last.
          </p>
        </div>

        <div className="card-grid">
          {items.map((item, index) => (
            <article
              key={item.title}
              className={`info-card reveal ${visible ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <p className="info-card__eyebrow">0{index + 1}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Offer({ offerings }) {
  const [ref, visible] = useReveal()

  return (
    <section id="offer" className="section section--dark">
      <div className="section__texture" />
      <div className="container">
        <div ref={ref} className={`section-heading section-heading--light reveal ${visible ? 'reveal--visible' : ''}`}>
          <p className="section-kicker">What We Offer</p>
          <h2>Guided hunting and fishing services across all of New York State.</h2>
          <p className="section-intro">
            We focus on practical local knowledge, clear communication, and trips designed around the season, conditions, and your experience level.
          </p>
        </div>

        <div className="service-grid">
          {offerings.map((offering, index) => (
            <article
              key={offering.id}
              className={`service-card reveal ${visible ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: `${index * 110}ms` }}
            >
              <p className="service-card__category">{offering.category}</p>
              <h3>{offering.title}</h3>
              <p>{offering.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  const [ref, visible] = useReveal()

  const entries = [
    {
      title: 'Whitetail Deer',
      subtitle: 'Scouting, stand placement, seasonal movement, and guided deer hunts built around mature-buck opportunities.'
    },
    {
      title: 'Inland Fishing (Open Water & Ice Fishing)',
      subtitle: 'From warm-weather lake days to hard-water winter setups, we guide adaptable trips for anglers of every level.'
    }
  ]

  return (
    <section id="portfolio" className="section section--sand">
      <div className="container">
        <div ref={ref} className={`section-heading reveal ${visible ? 'reveal--visible' : ''}`}>
          <p className="section-kicker">Portfolio</p>
          <h2>Seasonal experience built around New York whitetails and inland fisheries.</h2>
          <p className="section-intro">
            This site is ready for future field photos, but the portfolio categories are already structured around the two core lines of work below.
          </p>
        </div>

        <div className="portfolio-grid">
          {entries.map((entry, index) => (
            <article
              key={entry.title}
              className={`portfolio-panel reveal ${visible ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="portfolio-panel__badge">Featured</div>
              <h3>{entry.title}</h3>
              <p>{entry.subtitle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function GetStarted({ site }) {
  const [ref, visible] = useReveal()

  return (
    <section id="get-started" className="section section--cta">
      <div className="container">
        <div ref={ref} className={`cta-shell reveal ${visible ? 'reveal--visible' : ''}`}>
          <p className="section-kicker">Get Started</p>
          <h2>Choose your trip and reach out directly to lock in dates.</h2>
          <p className="section-intro">
            Use the appointment links below to start the conversation for your next guided trip.
          </p>

          <div className="booking-grid">
            <a className="booking-card" href={site.bookingLinks.fishing}>
              <span className="booking-card__label">Inland Fishing Appointments</span>
              <strong>Book Fishing</strong>
              <p>Open water and ice fishing inquiries sent straight to Camo Man Outdoors.</p>
            </a>

            <a className="booking-card" href={site.bookingLinks.whitetail}>
              <span className="booking-card__label">Whitetail Deer Appointments</span>
              <strong>Book Whitetail</strong>
              <p>Start planning a guided deer hunt with your preferred season and goals.</p>
            </a>
          </div>

          <p className="cta-shell__contact">
            Direct contact: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
      </div>
    </section>
  )
}

function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="section section--light">
      <div className="container">
        <div ref={ref} className={`about reveal ${visible ? 'reveal--visible' : ''}`}>
          <figure className="about__media">
            <img src="/about.jpg" alt="Camo Man and Camo Lady outdoors together" />
            <figcaption>Camo Man &amp; Camo Lady</figcaption>
          </figure>

          <div className="about__content">
            <p className="section-kicker">About Us</p>
            <h2>The people behind the brand.</h2>
            <p>
              Camo Man Outdoors is centered on a husband-and-wife team who love helping clients enjoy the woods, the water, and the stories that come with both.
            </p>
            <p>
              We combine licensed New York State guiding with a friendly, hands-on style that works for beginners, families, and experienced outdoorsmen alike.
            </p>
            <p>
              Whether the goal is a first fish through the ice or a hard-earned whitetail memory, the focus stays the same: making your memories the trophy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ site }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img className="footer__logo" src="/logo.png" alt="Camo Man Outdoors logo" />
          <p>{site.slogan}</p>
        </div>
        <div className="footer__contact">
          <p className="footer__title">Contact</p>
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          <p>{site.serviceArea}</p>
        </div>
      </div>
    </footer>
  )
}

const fallbackSite = {
  title: 'Camo Man Outdoors - Licensed New York State Hunting and Fishing Guide',
  slogan: 'Making your memories the trophy',
  serviceArea: 'Covering all of New York State',
  contactEmail: 'camomanoutdoors@gmail.com',
  bookingLinks: {
    fishing: 'mailto:camomanoutdoors@gmail.com?subject=Inland%20Fishing%20Appointment%20Request',
    whitetail: 'mailto:camomanoutdoors@gmail.com?subject=Whitetail%20Deer%20Appointment%20Request'
  },
  offerings: [
    {
      id: 'whitetail',
      category: 'Hunting',
      title: 'Whitetail Deer',
      summary: 'Guided whitetail deer hunts with planning, scouting insight, and in-season support.'
    },
    {
      id: 'open-water',
      category: 'Fishing',
      title: 'Inland Fishing (Open Water)',
      summary: 'Guided inland fishing trips for bass, trout, walleye, pike, and panfish.'
    },
    {
      id: 'ice-fishing',
      category: 'Fishing',
      title: 'Inland Fishing (Ice Fishing)',
      summary: 'Cold-weather guided ice fishing trips across New York waters.'
    }
  ]
}

export default function App() {
  const [site, setSite] = useState(fallbackSite)

  useEffect(() => {
    let active = true

    fetch('/api/site')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load site data')
        }
        return response.json()
      })
      .then((data) => {
        if (active) {
          setSite(data)
        }
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <Nav title={site.title} />
      <main>
        <Hero site={site} />
        <Values />
        <Offer offerings={site.offerings} />
        <Portfolio />
        <GetStarted site={site} />
        <About />
      </main>
      <Footer site={site} />
    </>
  )
}
