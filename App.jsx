import React, { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const GALLERIES = {
  '/portfolio/whitetail-deer': {
    title: 'Whitetail Deer',
    eyebrow: 'Whitetail Gallery',
    intro: '',
    cta: 'mailto:camomanoutdoors@gmail.com?subject=Whitetail%20Deer%20Appointment%20Request',
    ctaLabel: 'Book a Whitetail Hunt',
    photos: [
      { src: '/galleries/deer/img-3608-fixed.jpg', alt: 'Whitetail deer hunting photo 1', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-3744-fixed.jpg', alt: 'Whitetail deer hunting photo 2', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-3901-fixed.jpg', alt: 'Whitetail deer hunting photo 3', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-3915-fixed.jpg', alt: 'Whitetail deer hunting photo 4', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-1172.jpeg', alt: 'Whitetail deer hunting photo 5', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-1173.jpeg', alt: 'Whitetail deer hunting photo 6', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-2421.jpg', alt: 'Whitetail deer hunting photo 7', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-4195.jpeg', alt: 'Whitetail deer hunting photo 8', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-5445.jpg', alt: 'Whitetail deer hunting photo 9', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-5446.jpg', alt: 'Whitetail deer hunting photo 10', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-5447.jpg', alt: 'Whitetail deer hunting photo 11', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-5448.jpg', alt: 'Whitetail deer hunting photo 12', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-6133.jpg', alt: 'Whitetail deer hunting photo 13', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-6185.jpg', alt: 'Whitetail deer hunting photo 14', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-6306.jpg', alt: 'Whitetail deer hunting photo 15', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-0266.jpg', alt: 'Whitetail deer hunting photo 16', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-3928.png', alt: 'Whitetail deer hunting photo 18', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-4067.png', alt: 'Whitetail deer hunting photo 19', caption: 'Whitetail Deer Gallery' },
      { src: '/galleries/deer/img-4093.png', alt: 'Whitetail deer hunting photo 20', caption: 'Whitetail Deer Gallery' }
    ]
  },
  '/portfolio/inland-fishing': {
    title: 'Inland Fishing',
    eyebrow: 'Fishing Gallery',
    intro: '',
    cta: 'mailto:camomanoutdoors@gmail.com?subject=Inland%20Fishing%20Appointment%20Request',
    ctaLabel: 'Book a Fishing Trip',
    photos: [
      { src: '/galleries/fish/img-0156-fixed.jpg', alt: 'Inland fishing photo 1', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-0170-fixed.jpg', alt: 'Inland fishing photo 2', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-0138.jpg', alt: 'Inland fishing photo 3', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-e6bc9120.jpg', alt: 'Inland fishing photo 4', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2437.jpg', alt: 'Inland fishing photo 5', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2489.jpg', alt: 'Inland fishing photo 6', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2491.jpg', alt: 'Inland fishing photo 7', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2522.png', alt: 'Inland fishing photo 8', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2612.jpg', alt: 'Inland fishing photo 9', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2643.jpg', alt: 'Inland fishing photo 10', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-5450.jpg', alt: 'Inland fishing photo 11', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-5451.jpg', alt: 'Inland fishing photo 12', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-5452.jpg', alt: 'Inland fishing photo 13', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-5453.jpg', alt: 'Inland fishing photo 14', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-5454.jpg', alt: 'Inland fishing photo 15', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-5455.jpg', alt: 'Inland fishing photo 16', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-6055.jpg', alt: 'Inland fishing photo 17', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2420.jpg', alt: 'Inland fishing photo 18', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-2276.jpg', alt: 'Inland fishing photo 19', caption: 'Inland Fishing Gallery' },
      { src: '/galleries/fish/img-0743.jpg', alt: 'Inland fishing photo 20', caption: 'Inland Fishing Gallery' }
    ]
  }
}

function navigateTo(path) {
  if (window.location.pathname === path) {
    return
  }

  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'instant' })
}

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

function Nav({ title, pathname }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const homeLinks = [
    { href: '#values', label: 'Our Values', type: 'hash' },
    { href: '#offer', label: 'What We Offer', type: 'hash' },
    { href: '#portfolio', label: 'Portfolio', type: 'hash' },
    { href: '#news', label: 'In The News', type: 'hash' },
    { href: '#get-started', label: 'Get Started', type: 'hash' }
  ]

  const galleryLinks = [
    { href: '/', label: 'Home', type: 'route' },
    { href: '/portfolio/whitetail-deer', label: 'Whitetail Gallery', type: 'route' },
    { href: '/portfolio/inland-fishing', label: 'Fishing Gallery', type: 'route' }
  ]

  const links = onHome ? homeLinks : galleryLinks

  const handleNav = (event, link) => {
    setMenuOpen(false)

    if (link.type === 'route') {
      event.preventDefault()
      navigateTo(link.href)
      return
    }

    if (!onHome) {
      event.preventDefault()
      navigateTo('/')
      window.setTimeout(() => {
        const target = document.querySelector(link.href)
        target?.scrollIntoView({ behavior: 'smooth' })
      }, 60)
    }
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a
          className="nav__brand"
          href={onHome ? '#hero' : '/'}
          aria-label={title}
          onClick={(event) => {
            if (!onHome) {
              event.preventDefault()
              navigateTo('/')
            }
          }}
        >
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
            <a key={link.href} href={link.href} onClick={(event) => handleNav(event, link)}>
              {link.label}
            </a>
          ))}
          <a href={onHome ? '#get-started' : '/#get-started'} className="nav__cta" onClick={(event) => handleNav(event, { href: '#get-started', type: 'hash' })}>
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
          <p className="hero__slogan">
            <span>Making Your Memories</span>
            <strong>The Trophy</strong>
          </p>
          <p className="hero__title-detail">
            Charles Florczyk - Licensed New York State Hunting and Fishing Guide #10023
          </p>
          <p className="hero__credential-detail">
            New York State DEC Certified Hunter Education Instructor for Archery &amp; Firearm
          </p>
          <p className="hero__service-area">{site.serviceArea}</p>
          <p className="hero__disclaimer">
            Tentative charter bookings to begin June 1, 2026, pending confirmation of the USCG OUPV (Operator of Uninspected Passenger Vessels) license.
          </p>
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

function PortfolioCard({ entry, visible, index }) {
  return (
    <a
      href={entry.href}
      className={`portfolio-panel portfolio-panel--link reveal ${visible ? 'reveal--visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onClick={(event) => {
        event.preventDefault()
        navigateTo(entry.href)
      }}
    >
      <div className="portfolio-panel__badge">Featured</div>
      <h3>{entry.title}</h3>
      <p>{entry.subtitle}</p>
      <span className="portfolio-panel__cta">View Full Gallery</span>
    </a>
  )
}

function Portfolio() {
  const [ref, visible] = useReveal()

  const entries = [
    {
      title: 'Whitetail Deer',
      subtitle: 'Scouting, stand placement, seasonal movement, and guided deer hunts built around mature-buck opportunities.',
      href: '/portfolio/whitetail-deer'
    },
    {
      title: 'Inland Fishing (Open Water & Ice Fishing)',
      subtitle: 'From warm-weather lake days to hard-water winter setups, we guide adaptable trips for anglers of every level.',
      href: '/portfolio/inland-fishing'
    }
  ]

  return (
    <section id="portfolio" className="section section--sand">
      <div className="container">
        <div ref={ref} className={`section-heading reveal ${visible ? 'reveal--visible' : ''}`}>
          <p className="section-kicker">Portfolio</p>
          <h2>Seasonal experience built around New York whitetails and inland fisheries.</h2>
          <p className="section-intro">
            Click either gallery below to view the full photo collection.
          </p>
        </div>

        <div className="portfolio-grid">
          {entries.map((entry, index) => (
            <PortfolioCard key={entry.title} entry={entry} visible={visible} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogLinks() {
  const [ref, visible] = useReveal()

  const links = [
    {
      title: 'Husband and Wife Team Up to Take Two Deer During Bow Season',
      source: 'NewYorkUpstate.com',
      href: 'https://www.newyorkupstate.com/outdoors/2022/10/husband-and-wife-team-up-to-take-two-deer-during-bow-season.html?outputType=amp'
    },
    {
      title: 'The $4,500 Fish: Cicero Angler Wins Big in Weekend Oneida Lake Walleye Derby',
      source: 'Syracuse.com',
      href: 'https://www.syracuse.com/outdoors/2021/05/the-4500-fish-cicero-angler-wins-big-in-weekend-oneida-lake-walleye-derby.html?outputType=amp'
    },
    {
      title: "Facebook Feature on Sandy Spencer Florczyk and Chuck's Bow Season Bucks",
      source: 'Upstate NY Outdoors on Facebook',
      href: 'https://www.facebook.com/upstatenyoutdoors/posts/sandy-spencer-florczyk-of-cicero-ny-and-her-husband-chuck-each-took-down-a-buck-/2042000922641222/'
    },
    {
      title: 'Troutland 2021: Upstate NY Anglers Share Photos of Their Impressive Catches',
      source: 'NewYorkUpstate.com',
      href: 'https://www.newyorkupstate.com/outdoors/2021/04/troutland-2021-upstate-ny-anglers-share-photos-of-their-impressive-catches.html?outputType=amp'
    },
    {
      title: 'Upstate NY Angler Reels in Two River Monsters Days Apart',
      source: 'NewYorkUpstate.com',
      href: 'https://www.newyorkupstate.com/outdoors/2022/07/upstate-ny-angler-reels-in-two-river-monsters-days-apart.html?outputType=amp'
    },
    {
      title: 'Deer of the Day',
      source: 'Newzjunky',
      href: 'https://www.newzjunky.com/page-2-deer-of-the-day/'
    }
  ]

  return (
    <section id="news" className="section section--news">
      <div className="container">
        <div ref={ref} className={`section-heading reveal ${visible ? 'reveal--visible' : ''}`}>
          <p className="section-kicker">In The News</p>
          <h2>Articles, features, and outdoor coverage connected to Camo Man Outdoors.</h2>
          <p className="section-intro">
            Browse media features, outdoor stories, and published highlights for more background on the experiences behind the brand.
          </p>
        </div>

        <div className="news-grid">
          {links.map((link, index) => (
            <a
              key={link.href}
              className={`news-card reveal ${visible ? 'reveal--visible' : ''}`}
              style={{ transitionDelay: `${index * 70}ms` }}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="news-card__source">{link.source}</span>
              <strong>{link.title}</strong>
              <span className="news-card__cta">Open Story</span>
            </a>
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
          <a
            className="footer__social"
            href="https://www.facebook.com/share/17Np1RGPYJ/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Camo Man Outdoors on Facebook"
          >
            <img src="/facebook-logo.svg" alt="" />
            <span>Follow on Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

function Lightbox({ items, activeIndex, setActiveIndex, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((index) => (index + 1) % items.length)
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((index) => (index - 1 + items.length) % items.length)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [items.length, onClose, setActiveIndex])

  const activeItem = items[activeIndex]

  if (!activeItem) {
    return null
  }

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Expanded gallery image">
      <button className="lightbox__close" type="button" onClick={onClose} aria-label="Close image viewer">
        Close
      </button>
      <button
        className="lightbox__nav lightbox__nav--prev"
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          setActiveIndex((index) => (index - 1 + items.length) % items.length)
        }}
        aria-label="Previous photo"
      >
        ‹
      </button>
      <figure className="lightbox__figure" onClick={(event) => event.stopPropagation()}>
        <img src={activeItem.src} alt={activeItem.alt} />
        {activeItem.caption ? <figcaption>{activeItem.caption}</figcaption> : null}
      </figure>
      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          setActiveIndex((index) => (index + 1) % items.length)
        }}
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  )
}

function GalleryPage({ site, pathname }) {
  const gallery = GALLERIES[pathname]
  const [activeIndex, setActiveIndex] = useState(null)
  const hasPhotos = gallery.photos.length > 0

  return (
    <>
      <main className="gallery-page">
        <section className="gallery-hero">
          <div className="container gallery-hero__inner">
            <p className="section-kicker">{gallery.eyebrow}</p>
            <h1>{gallery.title}</h1>
            {gallery.intro ? <p className="gallery-hero__intro">{gallery.intro}</p> : null}
            <div className="gallery-hero__actions">
              <button type="button" className="button button--primary" onClick={() => navigateTo('/')}>
                Back to Home
              </button>
              <a href={gallery.cta} className="button button--secondary">
                {gallery.ctaLabel}
              </a>
            </div>
          </div>
        </section>

        <section className="section section--light">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Full Gallery</p>
              <h2>{hasPhotos ? 'Browse the full collection below.' : 'Gallery layout is ready for your uploaded photos.'}</h2>
              {!hasPhotos ? (
                <p className="section-intro">
                  Once you send the photo collection, each image will appear here in a responsive grid with full-screen expansion, left and right navigation, and mobile-friendly browsing.
                </p>
              ) : null}
            </div>

            {hasPhotos ? (
              <div className="gallery-grid">
                {gallery.photos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    className="gallery-card"
                    onClick={() => setActiveIndex(index)}
                  >
                    <img src={photo.src} alt={photo.alt} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="gallery-empty">
                <div className="gallery-empty__panel">
                  <p className="gallery-empty__eyebrow">Coming Soon</p>
                  <h3>{gallery.title} photos will appear here.</h3>
                  <p>Send over the image files and this page is already set up to become the full interactive gallery.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer site={site} />
      {activeIndex !== null ? (
        <Lightbox
          items={gallery.photos}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </>
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
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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

  const isGalleryRoute = useMemo(() => Object.hasOwn(GALLERIES, pathname), [pathname])

  return (
    <>
      <Nav title={site.title} pathname={pathname} />
      {isGalleryRoute ? (
        <GalleryPage site={site} pathname={pathname} />
      ) : (
        <>
          <main>
            <Hero site={site} />
            <Values />
            <Offer offerings={site.offerings} />
            <Portfolio />
            <BlogLinks />
            <GetStarted site={site} />
            <About />
          </main>
          <Footer site={site} />
        </>
      )}
    </>
  )
}
