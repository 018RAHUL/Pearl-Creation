import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './assets/logo.png';
import heroClean from './assets/hero-clean.png';
import heroCover from './assets/hero-cover.png';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackCollections = [
  ['Back Neck Designs', 'Intricate, statement-making backs for blouses & suits', 'linear-gradient(160deg,#e8b4bc,#c98b93)'],
  ['Peplum Dhoti Sets', 'Contemporary silhouettes with a traditional drape', 'linear-gradient(160deg,#d9c3a6,#b98a52)'],
  ['Lehenga Choli', 'Festive, bridal & party-ready ensembles', 'linear-gradient(160deg,#e3a1ae,#a85d68)'],
  ['Kids Wear', "Miniature couture for little ones' special days", 'linear-gradient(160deg,#f0d6c8,#d99e7c)'],
  ['Maxi Dresses', 'Flowing, printed & embroidered everyday elegance', 'linear-gradient(160deg,#b7c9b0,#7f9c78)'],
  ['Bridal Edit', 'Custom trousseau pieces designed around you', 'linear-gradient(160deg,#c9a6c2,#8f6389)']
];

function App() {
  const [collections, setCollections] = useState(fallbackCollections);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get(`${API}/collections`)
      .then(({ data }) => {
        if (Array.isArray(data) && data.length) {
          setCollections(data.map(x => [x.name, x.description, x.gradient]));
        }
      })
      .catch(() => {});
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header>
        <nav>
          <a className="brand" href="#top" onClick={closeMenu}>
            <img className="brand-mark" src={logo} alt="Pearl Creations logo" />
            <span>
              <span className="brand-name">Pearl Creations</span>
              <br />
              <span className="brand-sub">Ambala</span>
            </span>
          </a>

          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>
            <span></span><span></span><span></span>
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#collections" onClick={closeMenu}>Collections</a>
            <a href="#process" onClick={closeMenu}>Craft</a>
            <a href="#visit" onClick={closeMenu}>Visit</a>
            <a className="mobile-cta" href="https://www.instagram.com/creations_pearl/" target="_blank" rel="noreferrer">DM to Order</a>
          </div>
          <a className="nav-cta desktop-cta" href="https://www.instagram.com/creations_pearl/" target="_blank" rel="noreferrer">DM to Order</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-banner">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="hero-media">
  <img
    className="hero-photo"
    src={heroCover}
    alt="Pearl Creations designer lehenga"
  />
</div>
          <div className="hero-scrim"></div>
          <div className="hero-content">
            <div className="eyebrow">Bespoke Bridal & Designer Wear · Ambala City</div>
            <h1>Crafted to <em>Twirl</em>,<br />Made to Shine</h1>
            <div className="btn-row">
              <a className="btn light-solid" href="https://www.instagram.com/creations_pearl/" target="_blank" rel="noreferrer">View Our Instagram</a>
              <a className="btn light-outline" href="#collections">Explore Collections</a>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="wrap about-grid">
            <div className="about-visual">
              <img src={logo} alt="" />
            </div>
            <div className="about-text">
              <div className="eyebrow">Our Story</div>
              <h2>Where every stitch tells a story</h2>
              <p>Tucked near Sohanlal School, Jagadhri Gate in Ambala City, Pearl Creations has grown into a name customers trust for thoughtful, personalised design — from delicate back-neck detailing and peplum dhoti sets to festive lengha cholis and playful kids' wear.</p>
              <p>Every piece begins as a conversation. We listen to your vision, your occasion, and your silhouette, then bring it to life with hand-finished detailing and fabrics chosen to flatter.</p>
              <div className="stat-row">
                <div className="stat"><b>636+</b><span>Designs Created</span></div>
                <div className="stat"><b>200+</b><span>Happy Clients</span></div>
                <div className="stat"><b>100%</b><span>Made to Order</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="collections">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">What We Craft</div>
              <h2>Our Collections</h2>
              <div className="divider"></div>
            </div>
            <div className="grid">
              {collections.map(([name, desc, gradient]) => (
                <article className="card" key={name}>
                  <div className="card-visual" style={{ background: gradient }}>
                    <svg viewBox="0 0 100 100" aria-hidden="true">
                      <path d="M50 15 C35 30 30 55 38 80 C42 90 50 95 50 95 C50 95 58 90 62 80 C70 55 65 30 50 15 Z" fill="none" stroke="#fff" strokeWidth="1.6"/>
                    </svg>
                  </div>
                  <div className="card-body"><h3>{name}</h3><p>{desc}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote">
          <p>"Merging imagination and creativity to create a designer world."</p>
          <div className="divider"></div>
        </section>

        <section className="section" id="process">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">How It Works</div>
              <h2>From Idea to Outfit</h2>
              <div className="divider"></div>
            </div>
            <div className="process-grid">
              {[
                ['1', 'Share Your Vision', 'DM us on Instagram with your occasion, inspiration or reference images.'],
                ['2', 'Design & Fitting', 'We discuss fabric, silhouette and detailing, then take measurements.'],
                ['3', 'Handcrafted for You', 'Your piece is stitched and finished by hand at our Ambala studio.']
              ].map(([num, title, text]) => (
                <div className="process-item" key={num}>
                  <div className="process-num">{num}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section visit" id="visit">
          <div className="wrap visit-grid">
            <div className="visit-card">
              <div className="visit-row"><span className="icon">⌖</span><div><h4>Studio Address</h4><p>Near Sohanlal School, Jagadhri Gate,<br/>Ambala City, Haryana</p></div></div>
              <div className="visit-row"><span className="icon">◎</span><div><h4>Instagram</h4><p><a href="https://www.instagram.com/creations_pearl/" target="_blank" rel="noreferrer">@creations_pearl</a> — DM for orders & enquiries</p></div></div>
              <div className="visit-row"><span className="icon">✉</span><div><h4>Orders</h4><p>All pieces are made to order — reach out with your requirements and timeline.</p></div></div>
              <a className="btn btn-solid" href="https://www.instagram.com/creations_pearl/" target="_blank" rel="noreferrer">Message Us on Instagram</a>
            </div>
            <div className="map-visual">
              <div className="map-pin"><span className="map-pin-icon">⌖</span><span>Jagadhri Gate, Ambala City</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <img className="brand-mark" src={logo} alt="" />
              <h3>Pearl Creations</h3>
              <p>A designer boutique in Ambala City crafting custom ethnic wear with imagination and care.</p>
            </div>
            <div className="footer-links"><h4>Explore</h4><a href="#about">About</a><a href="#collections">Collections</a><a href="#visit">Visit Us</a></div>
            <div className="footer-links"><h4>Connect</h4><div className="social"><a href="https://www.instagram.com/creations_pearl/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a></div></div>
          </div>
          <div className="footer-bottom"><span>© 2026 Pearl Creations, Ambala. All rights reserved.</span><span>Designed with care</span></div>
        </div>
      </footer>
    </>
  );
}

export default App;
