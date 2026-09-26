import React, { useEffect, useState } from "react";
import axios from "axios";

import logo from "./assets/logo.png";
import heroCover from "./assets/hero-cover.png";
import heroCover2 from "./assets/hero-cover-2.png";


const fallbackCollections = [
  {
    title: "Sarees",
    description: "Statement bridal pieces crafted for your most memorable moments.",
    type: "bridal",
  },
  {
    title: "Designer Suits",
    description: "Elegant silhouettes with intricate detailing and timeless appeal.",
    type: "suits",
  },
  {
    title: "Indo-Western",
    description: "Contemporary designs blending Indian craftsmanship with modern style.",
    type: "indo-western",
  },
];


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [collections, setCollections] = useState(
    fallbackCollections
  );

  const [loadingCollections, setLoadingCollections] = useState(true);


  /* =========================
     HERO SLIDER
  ========================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  /* =========================
     COLLECTIONS API
  ========================= */

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/collections"
        );

        if (
          response.data &&
          Array.isArray(response.data.collections) &&
          response.data.collections.length > 0
        ) {
          setCollections(response.data.collections);
        }
      } catch (error) {
        console.log(
          "Using fallback collection data. Backend is not connected."
        );
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []);


  /* =========================
     CLOSE MOBILE MENU
  ========================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <>
      {/* =========================
          HEADER
      ========================= */}

      <header>
        <nav>

          <a
            href="#home"
            className="brand"
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="Pearl Creations"
              className="brand-mark"
            />

            <div>
              <div className="brand-name">
                Pearl Creations
              </div>

              <div className="brand-sub">
                Bespoke Bridal & Designer Wear
              </div>
            </div>
          </a>


          <div
            className={`nav-links ${
              menuOpen ? "open" : ""
            }`}
          >
            <a href="#home" onClick={closeMenu}>
              Home
            </a>

            <a href="#about" onClick={closeMenu}>
              About
            </a>

            <a href="#collections" onClick={closeMenu}>
              Collections
            </a>

            <a href="#process" onClick={closeMenu}>
              Process
            </a>

            <a href="#visit" onClick={closeMenu}>
              Visit Us
            </a>

            <a
              href="#visit"
              className="mobile-cta"
              onClick={closeMenu}
            >
              Book Appointment
            </a>
          </div>


          <a
            href="#visit"
            className="nav-cta desktop-cta"
          >
            Book Appointment
          </a>


          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </nav>
      </header>


      {/* =========================
          HERO
      ========================= */}

      <main>

        <section
          id="home"
          className="hero-banner"
        >

          {/* Blurred background */}
          <div className="hero-bg"></div>


          {/* Image slider */}
          <div className="hero-media">

            <div className="hero-slider">

              <img
                src={heroCover}
                alt="Pearl Creations bridal collection"
                className={`hero-slide ${
                  currentSlide === 0
                    ? "active"
                    : ""
                }`}
              />

              <img
                src={heroCover2}
                alt="Pearl Creations designer collection"
                className={`hero-slide ${
                  currentSlide === 1
                    ? "active"
                    : ""
                }`}
              />

            </div>

          </div>


          {/* Overlay */}
          <div className="hero-scrim"></div>


          {/* Hero content */}
          <div className="hero-content">

            <p className="eyebrow">
              BESPOKE BRIDAL & DESIGNER WEAR · AMBALA CITY
            </p>

            <h1>
              Crafted to <em>Twirl,</em>
              <br />
              Made to Shine
            </h1>


            <div className="btn-row">

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="btn light-solid"
              >
                View Our Instagram
              </a>

              <a
                href="#collections"
                className="btn light-outline"
              >
                Explore Collections →
              </a>

            </div>

          </div>


          {/* Slider indicators */}

          <div className="hero-dots">

            <button
              className={
                currentSlide === 0
                  ? "active"
                  : ""
              }
              aria-label="Show first image"
              onClick={() => setCurrentSlide(0)}
            />

            <button
              className={
                currentSlide === 1
                  ? "active"
                  : ""
              }
              aria-label="Show second image"
              onClick={() => setCurrentSlide(1)}
            />

          </div>

        </section>


        {/* =========================
            ABOUT
        ========================= */}

        <section
          id="about"
          className="about"
        >

          <div className="wrap">

            <div className="about-grid">

              <div className="about-visual">

                <img
                  src={logo}
                  alt="Pearl Creations"
                />

              </div>


              <div className="about-text">

                <p className="eyebrow">
                  OUR STORY
                </p>

                <h2>
                  Where Craft Meets
                  <br />
                  Contemporary Elegance
                </h2>

                <p>
                  Pearl Creations is a bespoke bridal
                  and designer wear studio dedicated to
                  creating pieces that feel as special as
                  the occasions they celebrate.
                </p>

                <p>
                  From intricate embroidery to carefully
                  selected fabrics, every creation is
                  developed with attention to detail,
                  individuality and timeless elegance.
                </p>


                <div className="stat-row">

                  <div className="stat">
                    <b>10+</b>
                    <span>
                      Years of Craft
                    </span>
                  </div>

                  <div className="stat">
                    <b>500+</b>
                    <span>
                      Designs Created
                    </span>
                  </div>

                  <div className="stat">
                    <b>100%</b>
                    <span>
                      Bespoke
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            COLLECTIONS
        ========================= */}

        <section
          id="collections"
          className="section"
        >

          <div className="wrap">

            <div className="section-head">

              <p className="eyebrow">
                THE COLLECTION
              </p>

              <h2>
                Designed for Your Moment
              </h2>

              <div className="divider"></div>

            </div>


            {loadingCollections ? (
              <div className="grid">

                {fallbackCollections.map(
                  (collection) => (
                    <CollectionCard
                      key={collection.title}
                      collection={collection}
                    />
                  )
                )}

              </div>
            ) : (

              <div className="grid">

                {collections.map(
                  (collection, index) => (
                    <CollectionCard
                      key={
                        collection._id ||
                        collection.id ||
                        collection.title ||
                        index
                      }
                      collection={collection}
                    />
                  )
                )}

              </div>

            )}

          </div>

        </section>


        {/* =========================
            QUOTE
        ========================= */}

        <section className="quote">

          <p>
            "Every woman deserves to feel
            extraordinary in what she wears."
          </p>

          <div className="divider"></div>

        </section>


        {/* =========================
            PROCESS
        ========================= */}

        <section
          id="process"
          className="section"
        >

          <div className="wrap">

            <div className="section-head">

              <p className="eyebrow">
                OUR PROCESS
              </p>

              <h2>
                From Vision to Creation
              </h2>

              <div className="divider"></div>

            </div>


            <div className="process-grid">

              <ProcessItem
                number="01"
                title="Consultation"
                description="We understand your occasion, personal style, preferences and vision."
              />

              <ProcessItem
                number="02"
                title="Design"
                description="Our designs are carefully developed around your requirements and measurements."
              />

              <ProcessItem
                number="03"
                title="Craft"
                description="Our artisans bring the design to life with detailed finishing and craftsmanship."
              />

            </div>

          </div>

        </section>


        {/* =========================
            VISIT
        ========================= */}

        <section
          id="visit"
          className="visit section"
        >

          <div className="wrap">

            <div className="section-head">

              <p className="eyebrow">
                COME VISIT US
              </p>

              <h2>
                Let's Create Something
                Beautiful
              </h2>

              <div className="divider"></div>

            </div>


            <div className="visit-grid">

              <div className="visit-card">

                <div className="visit-row">

                  <div className="icon">
                    📍
                  </div>

                  <div>

                    <h4>
                      Studio
                    </h4>

                    <p>
                      Ambala City,
                      Haryana, India
                    </p>

                  </div>

                </div>


                <div className="visit-row">

                  <div className="icon">
                    🕐
                  </div>

                  <div>

                    <h4>
                      Studio Hours
                    </h4>

                    <p>
                      Monday – Saturday
                      <br />
                      10:00 AM – 7:00 PM
                    </p>

                  </div>

                </div>


                <div className="visit-row">

                  <div className="icon">
                    ✉
                  </div>

                  <div>

                    <h4>
                      Get in Touch
                    </h4>

                    <p>
                      <a href="mailto:hello@pearlcreations.in">
                        hello@pearlcreations.in
                      </a>
                    </p>

                  </div>

                </div>


                <a
                  href="mailto:hello@pearlcreations.in"
                  className="btn btn-solid"
                >
                  Book an Appointment
                </a>

              </div>


              <div className="map-visual">

                <div className="map-pin">

                  <span className="map-pin-icon">
                    📍
                  </span>

                  <span>
                    PEARL CREATIONS
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <div className="footer-grid">

          <div className="footer-brand">

            <h3>
              Pearl Creations
            </h3>

            <p>
              Bespoke bridal and designer wear
              crafted with detail, elegance and
              individuality.
            </p>

          </div>


          <div className="footer-links">

            <h4>
              Explore
            </h4>

            <a href="#home">
              Home
            </a>

            <a href="#about">
              About
            </a>

            <a href="#collections">
              Collections
            </a>

            <a href="#process">
              Process
            </a>

          </div>


          <div className="footer-links">

            <h4>
              Visit
            </h4>

            <a href="#visit">
              Studio
            </a>

            <a href="#visit">
              Appointment
            </a>

            <a href="mailto:hello@pearlcreations.in">
              Contact
            </a>

          </div>


          <div className="footer-links social">

            <h4>
              Follow
            </h4>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              ◎
            </a>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} Pearl
            Creations. All rights reserved.
          </span>

          <span>
            Crafted with elegance.
          </span>

        </div>

      </footer>

    </>
  );
}


/* =========================
   COLLECTION CARD
========================= */

function CollectionCard({ collection }) {

  const type =
    collection.type || "collection";


  return (
    <article className="card">

      <div
        className={`card-visual card-${type}`}
      >

        <CollectionIllustration
          type={type}
        />

      </div>


      <div className="card-body">

        <h3>
          {collection.title}
        </h3>

        <p>
          {collection.description}
        </p>

      </div>

    </article>
  );
}


/* =========================
   COLLECTION ILLUSTRATION
========================= */

function CollectionIllustration({ type }) {

  if (type === "bridal") {

    return (
      <svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >

        <circle
          cx="60"
          cy="28"
          r="14"
          fill="#C98B93"
        />

        <path
          d="
            M46 43
            C35 55 31 72 27 95
            L16 145
            C30 153 44 157 60 157
            C76 157 90 153 104 145
            L93 95
            C89 72 85 55 74 43
            C67 48 53 48 46 43Z
          "
          fill="#F7E9E6"
          stroke="#A85D68"
          strokeWidth="2"
        />

        <path
          d="
            M37 74
            C49 82 71 82 83 74
          "
          stroke="#B98A52"
          strokeWidth="3"
        />

        <path
          d="
            M24 128
            C42 136 78 136 96 128
          "
          stroke="#B98A52"
          strokeWidth="3"
        />

      </svg>
    );
  }


  if (type === "suits") {

    return (
      <svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >

        <circle
          cx="60"
          cy="27"
          r="14"
          fill="#C98B93"
        />

        <path
          d="
            M45 42
            L30 57
            L39 73
            L44 68
            L44 115
            L30 151
            H90
            L76 115
            V68
            L81 73
            L90 57
            L75 42
            C68 48 52 48 45 42Z
          "
          fill="#F7E9E6"
          stroke="#A85D68"
          strokeWidth="2"
        />

        <path
          d="
            M45 44
            L60 67
            L75 44
          "
          stroke="#B98A52"
          strokeWidth="2"
        />

        <path
          d="
            M48 87
            H72
          "
          stroke="#B98A52"
          strokeWidth="2"
        />

      </svg>
    );
  }


  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >

      <circle
        cx="60"
        cy="27"
        r="14"
        fill="#C98B93"
      />

      <path
        d="
          M44 43
          C35 52 31 69 34 85
          L40 115
          L28 151
          H52
          L60 116
          L68 151
          H92
          L80 115
          L86 85
          C89 69 85 52 76 43
          C67 48 53 48 44 43Z
        "
        fill="#F7E9E6"
        stroke="#A85D68"
        strokeWidth="2"
      />

      <path
        d="
          M44 48
          L60 72
          L76 48
        "
        stroke="#B98A52"
        strokeWidth="2"
      />

    </svg>
  );
}


/* =========================
   PROCESS ITEM
========================= */

function ProcessItem({
  number,
  title,
  description,
}) {

  return (
    <div className="process-item">

      <div className="process-num">
        {number}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </div>
  );
}


export default App;