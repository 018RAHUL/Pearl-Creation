import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import logo from "./assets/logo.png";
import heroCover from "./assets/hero-cover.png";
import heroCover2 from "./assets/hero-cover-2.png";
import sareeImage from "./assets/saree.png";
import designerSuitImage from "./assets/designer-suit.png";
import coordSetImage from "./assets/coord-set.png";
import coatImage from "./assets/coat.png";
import ethnicWearImage from "./assets/ethnic-wear.png";
import dressImage from "./assets/dress.png";
import kid1 from "./assets/kids/1.png";
import kid2 from "./assets/kids/2.png";
import kid3 from "./assets/kids/3.png";
import kid4 from "./assets/kids/4.png";
import kid5 from "./assets/kids/5.png";
import kid6 from "./assets/kids/6.png";
import kid7 from "./assets/kids/7.png";
import kid8 from "./assets/kids/8.png";
import kid9 from "./assets/kids/9.png";
import kid10 from "./assets/kids/10.png";
import kid11 from "./assets/kids/11.png";

const fallbackCollections = [
  {
    title: "Sarees",
    description:
      "Elegant sarees crafted with exquisite fabrics, intricate detailing, and timeless Indian artistry.",
    type: "sarees",
    image: sareeImage,
  },
  {
    title: "Designer Suits",
    description:
      "Refined designer suits featuring elegant silhouettes, intricate embroidery, and graceful craftsmanship.",
    type: "suits",
    image: designerSuitImage,
  },
  {
    title: "Co-ord Set",
    description:
      "Contemporary co-ord sets designed with coordinated silhouettes, modern details, and effortless elegance.",
    type: "coord",
    image: coordSetImage,
  },
  {
    title: "Coats",
    description:
      "Sophisticated coats blending refined tailoring, luxurious fabrics, and contemporary Indian style.",
    type: "coats",
    image: coatImage,
  },
  {
    title: "Ethnic Wear",
    description:
      "Graceful ethnic wear featuring traditional craftsmanship, elegant silhouettes, and timeless Indian details.",
    type: "tops",
    image: ethnicWearImage,
  },
  {
    title: "Dresses",
    description:
      "Elegant dresses designed with graceful silhouettes, refined details, and contemporary charm.",
    type: "dresses",
    image: dressImage,
  },  
];


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [collections, setCollections] = useState(
    fallbackCollections
  );

  const [loadingCollections, setLoadingCollections] = useState(true);


  const littleLuxeImages = [
    kid1,
    kid2,
    kid3,
    kid4,
    kid5,
    kid6,
    kid7,
    kid8,
    kid9,
    kid10,
    kid11,
  ];

  const littleLuxeWindowRef = useRef(null);
  const [littleLuxeIndex, setLittleLuxeIndex] = useState(11);
  const [littleLuxeStep, setLittleLuxeStep] = useState(0);
  const [littleLuxeDragOffset, setLittleLuxeDragOffset] = useState(0);
  const [littleLuxeDragging, setLittleLuxeDragging] = useState(false);
  const [littleLuxeInstant, setLittleLuxeInstant] = useState(false);
  const littleLuxeDragStart = useRef(0);

  const littleLuxeLoopImages = [
    ...littleLuxeImages,
    ...littleLuxeImages,
    ...littleLuxeImages,
  ];

  useEffect(() => {
    const updateLittleLuxeStep = () => {
      const windowElement = littleLuxeWindowRef.current;
      const firstItem = windowElement?.querySelector(".little-luxe-item");

      if (!windowElement || !firstItem) return;

      const itemWidth = firstItem.getBoundingClientRect().width;
      const styles = window.getComputedStyle(firstItem.parentElement);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");

      setLittleLuxeStep(itemWidth + gap);
    };

    updateLittleLuxeStep();
    window.addEventListener("resize", updateLittleLuxeStep);

    return () => {
      window.removeEventListener("resize", updateLittleLuxeStep);
    };
  }, []);

  const nextLittleLuxe = () => {
    setLittleLuxeIndex((prev) => prev + 1);
  };

  const prevLittleLuxe = () => {
    setLittleLuxeIndex((prev) => prev - 1);
  };

  const handleLittleLuxePointerDown = (event) => {
    setLittleLuxeDragging(true);
    littleLuxeDragStart.current = event.clientX;
    setLittleLuxeDragOffset(0);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleLittleLuxePointerMove = (event) => {
    if (!littleLuxeDragging) return;

    setLittleLuxeDragOffset(
      event.clientX - littleLuxeDragStart.current
    );
  };

  const handleLittleLuxePointerUp = () => {
    if (!littleLuxeDragging) return;

    const threshold = Math.max(littleLuxeStep * 0.2, 45);

    if (littleLuxeDragOffset < -threshold) {
      nextLittleLuxe();
    } else if (littleLuxeDragOffset > threshold) {
      prevLittleLuxe();
    }

    setLittleLuxeDragging(false);
    setLittleLuxeDragOffset(0);
  };

  const handleLittleLuxeTransitionEnd = () => {
    if (littleLuxeIndex >= 22 || littleLuxeIndex <= 0) {
      setLittleLuxeInstant(true);
      setLittleLuxeIndex(11);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLittleLuxeInstant(false);
        });
      });
    }
  };

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
              href="https://wa.me/917206111614"
              target="_blank"
              rel="noreferrer"
              className="mobile-cta"
              onClick={closeMenu}
            >
              CONTACT US
            </a>
          </div>


          <a
            href="https://wa.me/917206111614"
            target="_blank"
            rel="noreferrer"
            className="nav-cta desktop-cta"
          >
            CONTACT US
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
                href="https://www.instagram.com/creations_pearl/"
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



        <section className="section little-luxe" id="little-luxe">
          <div className="section-head">
            <p className="eyebrow">FOR OUR LITTLE ONES</p>

            <h2>Little Luxe</h2>

            <div className="divider"></div>
          </div>

          <div className="little-luxe-carousel">
            <button
              className="little-luxe-arrow"
              onClick={prevLittleLuxe}
              aria-label="Previous children's outfit"
            >
              <span>‹</span>
            </button>

            <div
              className={`little-luxe-window ${
                littleLuxeDragging ? "dragging" : ""
              }`}
              ref={littleLuxeWindowRef}
              onPointerDown={handleLittleLuxePointerDown}
              onPointerMove={handleLittleLuxePointerMove}
              onPointerUp={handleLittleLuxePointerUp}
              onPointerCancel={handleLittleLuxePointerUp}
              style={{
                cursor: "default",
              }}
            >
              <div
                className="little-luxe-track"
                onTransitionEnd={handleLittleLuxeTransitionEnd}
                style={{
                  transform: `translate3d(${
                    -(littleLuxeIndex * littleLuxeStep) + littleLuxeDragOffset
                  }px, 0, 0)`,
                  transition:
                    littleLuxeDragging || littleLuxeInstant
                      ? "none"
                      : "transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
              >
                {littleLuxeLoopImages.map((image, index) => (
                  <div className="little-luxe-item" key={index}>
                    <img
                      src={image}
                      alt={`Little Luxe children's outfit ${(index % 11) + 1}`}
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className="little-luxe-arrow"
              onClick={nextLittleLuxe}
              aria-label="Next children's outfit"
            >
              <span>›</span>
            </button>
          </div>

          <div className="little-luxe-dots">
            {littleLuxeImages.map((_, index) => (
              <button
                key={index}
                className={
                  index === (littleLuxeIndex - 11 + 11) % 11
                    ? "active"
                    : ""
                }
                onClick={() => setLittleLuxeIndex(11 + index)}
                aria-label={`Show outfit ${index + 1}`}
              />
            ))}
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
                      <a href="mailto:anupamabudhiraja22@gmail.com">
                        anupamabudhiraja22@gmail.com
                      </a>
                    </p>

                  </div>

                </div>


                <a
                  href="https://wa.me/917206111614"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-solid"
                >
                  CONTACT US
                </a>

              </div>


              <div className="map-visual">
                <iframe
                  title="Pearl Creations Location"
                  src="https://www.google.com/maps?q=Jagadhari+Gate,+Ambala+City,+Haryana,+India&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    display: "block",
                  }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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

            <a href="mailto:anupamabudhiraja22@gmail.com">
              Contact
            </a>

          </div>


          <div className="footer-links social">

            <h4>
              Follow
            </h4>

            <a
              href="https://www.instagram.com/creations_pearl/"
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
  return (
    <article className="card">
      <div className="card-visual">
        <img
          src={collection.image}
          alt={collection.title}
          className="collection-image"
        />
      </div>

      <div className="card-body">
        <h3>{collection.title}</h3>

        <p>{collection.description}</p>
      </div>
    </article>
  );
}


/* =========================
   COLLECTION ILLUSTRATION
========================= */

function CollectionIllustration({ type }) {

  /* =========================
     SAREE
  ========================= */

  if (type === "sarees") {
    return (
      <svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Head */}
        <circle
          cx="60"
          cy="27"
          r="14"
          fill="#C98B93"
        />

        {/* Saree silhouette */}
        <path
          d="
            M47 43
            C40 49 36 61 34 75
            L25 135
            C36 143 48 148 60 149
            C72 148 84 143 95 135
            L86 75
            C84 61 80 49 73 43
            C66 48 54 48 47 43Z
          "
          fill="#F7E9E6"
          stroke="#A85D68"
          strokeWidth="2"
        />

        {/* Saree drape */}
        <path
          d="
            M76 49
            C88 61 92 78 89 101
            L101 137
            C94 142 88 145 82 147
            L70 106
            C67 92 68 72 76 49Z
          "
          fill="#F1D7D4"
          stroke="#A85D68"
          strokeWidth="2"
        />

        {/* Saree borders */}
        <path
          d="
            M29 126
            C47 134 75 134 93 126
          "
          stroke="#B98A52"
          strokeWidth="3"
        />

        <path
          d="
            M34 82
            C47 88 72 88 86 82
          "
          stroke="#B98A52"
          strokeWidth="2"
        />

        {/* Blouse neckline */}
        <path
          d="
            M47 44
            C51 52 69 52 73 44
          "
          stroke="#B98A52"
          strokeWidth="2"
        />
      </svg>
    );
  }


  /* =========================
     DESIGNER SUITS
  ========================= */

  if (type === "suits") {
    return (
      <svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Head */}
        <circle
          cx="60"
          cy="27"
          r="14"
          fill="#C98B93"
        />

        {/* Suit */}
        <path
          d="
            M45 43
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
            L75 43
            C68 48 52 48 45 43Z
          "
          fill="#F7E9E6"
          stroke="#A85D68"
          strokeWidth="2"
        />

        {/* Neckline */}
        <path
          d="
            M45 44
            L60 67
            L75 44
          "
          stroke="#B98A52"
          strokeWidth="2"
        />

        {/* Waist detailing */}
        <path
          d="
            M47 87
            H73
          "
          stroke="#B98A52"
          strokeWidth="2"
        />

        {/* Suit detailing */}
        <path
          d="
            M39 73
            L48 65
            M81 73
            L72 65
          "
          stroke="#A85D68"
          strokeWidth="2"
        />
      </svg>
    );
  }


  /* =========================
     CO-ORD SET
  ========================= */

  if (type === "coord") {
    return (
      <svg
        viewBox="0 0 120 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Head */}
        <circle
          cx="60"
          cy="27"
          r="14"
          fill="#C98B93"
        />

        {/* Top */}
        <path
          d="
            M45 43
            L34 55
            L42 73
            L49 67
            L49 88
            H71
            L71 67
            L78 73
            L86 55
            L75 43
            C68 48 52 48 45 43Z
          "
          fill="#F7E9E6"
          stroke="#A85D68"
          strokeWidth="2"
        />

        {/* Top neckline */}
        <path
          d="
            M45 44
            L60 67
            L75 44
          "
          stroke="#B98A52"
          strokeWidth="2"
        />

        {/* Waist separation */}
        <path
          d="
            M49 88
            H71
          "
          stroke="#B98A52"
          strokeWidth="2"
        />

        {/* Pants */}
        <path
          d="
            M49 91
            H71
            L76 151
            H61
            L60 117
            L59 151
            H44
            L49 91Z
          "
          fill="#F1D7D4"
          stroke="#A85D68"
          strokeWidth="2"
        />

        {/* Pants center line */}
        <path
          d="
            M60 117
            V151
          "
          stroke="#B98A52"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  /* =========================
   COATS
========================= */

if (type === "coats") {
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
          L28 58
          L38 78
          L45 71
          L42 151
          H78
          L75 71
          L82 78
          L92 58
          L76 43
          C69 48 51 48 44 43Z
        "
        fill="#F7E9E6"
        stroke="#A85D68"
        strokeWidth="2"
      />

      <path
        d="
          M44 44
          L60 70
          L76 44
        "
        stroke="#B98A52"
        strokeWidth="2"
      />

      <path
        d="
          M60 70
          V151
        "
        stroke="#A85D68"
        strokeWidth="1.5"
      />

      <circle
        cx="60"
        cy="88"
        r="2"
        fill="#B98A52"
      />

      <circle
        cx="60"
        cy="101"
        r="2"
        fill="#B98A52"
      />

      <circle
        cx="60"
        cy="114"
        r="2"
        fill="#B98A52"
      />
    </svg>
  );
}


/* =========================
   TOPS
========================= */

if (type === "tops") {
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
          M45 43
          L30 57
          L40 76
          L48 69
          L48 112
          H72
          V69
          L80 76
          L90 57
          L75 43
          C68 48 52 48 45 43Z
        "
        fill="#F7E9E6"
        stroke="#A85D68"
        strokeWidth="2"
      />

      <path
        d="
          M45 44
          L60 65
          L75 44
        "
        stroke="#B98A52"
        strokeWidth="2"
      />

      <path
        d="
          M48 89
          H72
        "
        stroke="#B98A52"
        strokeWidth="2"
      />

      <path
        d="
          M48 100
          H72
        "
        stroke="#A85D68"
        strokeWidth="1"
      />
    </svg>
  );
}


  return null;
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