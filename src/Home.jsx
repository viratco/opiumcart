import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons as pure SVGs for perfect rendering
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloverIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10.5 2 9 3.5 9 5.5C9 8 11.5 10.5 12 12C12.5 10.5 15 8 15 5.5C15 3.5 13.5 2 12 2Z" />
    <path d="M22 12C22 10.5 20.5 9 18.5 9C16 9 13.5 11.5 12 12C13.5 12.5 16 15 18.5 15C20.5 15 22 13.5 22 12Z" />
    <path d="M12 22C13.5 22 15 20.5 15 18.5C15 16 12.5 13.5 12 12C11.5 13.5 9 16 9 18.5C9 20.5 10.5 22 12 22Z" />
    <path d="M2 12C2 13.5 3.5 15 5.5 15C8 15 10.5 12.5 12 12C10.5 11.5 8 9 5.5 9C3.5 9 2 10.5 2 12Z" />
  </svg>
);

export default function Home() {
  const mainWrapperRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Dismiss preloader after 2.4s
    const timer = setTimeout(() => setLoaded(true), 2400);

    // 1. Scroll Reveal Observer (Viewport relative)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    // Give React a tiny bit of time to render DOM nodes
    setTimeout(() => {
      document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => observer.observe(el));
    }, 100);

    // 2. Smooth Parallax with requestAnimationFrame + lerp
    const elementStates = new Map();
    let rafId = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      const parallaxImages = document.querySelectorAll('.parallax-img');
      const vh = window.innerHeight;

      parallaxImages.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Skip if completely out of view
        if (rect.top > vh * 1.5 || rect.bottom < -vh * 0.5) return;

        const speed = parseFloat(el.getAttribute('data-speed') || '0.1');
        // data-no-scale elements only translateY (e.g. the model img tag)
        const noScale = el.hasAttribute('data-no-scale');
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - vh / 2;
        const targetY = -distanceFromCenter * speed;

        // Initialise smoothed state on first sight
        if (!elementStates.has(el)) {
          elementStates.set(el, targetY);
        }
        const currentY = elementStates.get(el);

        // Lerp towards target — 0.07 = silky smooth
        const smoothY = lerp(currentY, targetY, 0.07);
        elementStates.set(el, smoothY);

        // Only write to DOM if movement is meaningful
        if (Math.abs(smoothY - currentY) > 0.01) {
          el.style.transform = noScale
            ? `translateY(${smoothY}px)`
            : `translateY(${smoothY}px) scale(1.12)`;
        }
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const [activeCategory, setActiveCategory] = useState(1);
  const categories = [
    { num: "[01]", name: "Shirt", count: 174 },
    { num: "[02]", name: "Jacket", count: 361 },
    { num: "[03]", name: "Jeans", count: 368 },
    { num: "[04]", name: "Outer", count: 117 },
    { num: "[05]", name: "Shoes", count: 78 }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      num: "01/8",
      name: "Emma Williams",
      role: "Fashion Stylist",
      quote: `Everything is absolutely
perfect! From the fabric quality to the
flawless fit every piece feels premium.
This brand has completely
transformed my wardrobe.`,
      rating: "5.0 (49 Reviews)",
      image: "/testimonial-1.png"
    },
    {
      num: "02/8",
      name: "Marcus Thorne",
      role: "Creative Director",
      quote: `The visual language and
tailoring are pristine. It’s street energy
refined to the absolute highest aesthetic.
Incredible construction and
fast shipping.`,
      rating: "5.0 (32 Reviews)",
      image: "/testimonial-2.png"
    },
    {
      num: "03/8",
      name: "Aria Sterling",
      role: "Model & Designer",
      quote: `Layering these chains and
blazers has redefined my street style.
The geometric shapes feel alive and bring
high-end art directly into
my fits.`,
      rating: "5.0 (28 Reviews)",
      image: "/testimonial-3.png"
    }
  ];

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const [activeSlide, setActiveSlide] = useState(2);
  const carouselSlides = [
    { id: 1, text: "[Tech Structure]", image: "/carousel-1.png" },
    { id: 2, text: "[Future Utility]", image: "/carousel-2.png" },
    { id: 3, text: "[Wear the Moment]", image: "/carousel-3.png" },
    { id: 4, text: "[Layered Aesthetics]", image: "/carousel-4.png" },
    { id: 5, text: "[Core Silhouette]", image: "/carousel-5.png" }
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };
  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  const [activeCollection, setActiveCollection] = useState(0);
  const collectionsData = [
    {
      id: 'statement',
      title: 'Statement Pieces 2025',
      description: 'Your go-to wardrobe staples, crafted for comfort and effortless style.',
      buttonText: 'GET STARTED',
      leftImage: '/collections-left-1.png',
      rightImage: '/collections-right-1.png'
    },
    {
      id: 'essentials',
      title: 'Everyday Essentials 2026',
      description: 'Durable basics engineered for dynamic daily wear in urban environments.',
      buttonText: 'EXPLORE STAPLES',
      leftImage: '/carousel-1.png',
      rightImage: '/carousel-2.png'
    },
    {
      id: 'timeless',
      title: 'Timeless Classics 2026',
      description: 'Heritage tailoring refined with technical fabrics for enduring elegance.',
      buttonText: 'VIEW CLASSICS',
      leftImage: '/carousel-4.png',
      rightImage: '/carousel-5.png'
    },
    {
      id: 'seasonal',
      title: 'Seasonal Collections 2025',
      description: 'Avant-garde winter silhouettes blending lightweight heat-retention with style.',
      buttonText: 'DISCOVER SEASONAL',
      leftImage: '/carousel-3.png',
      rightImage: '/collections-right-1.png'
    }
  ];

  return (
    <>
      {/* PRELOADER 
      <div className={`preloader ${loaded ? 'preloader-out' : ''}`}>
        <div className="preloader-inner">
          <span className="preloader-word">wear</span>
          <span className="preloader-word">the</span>
          <span className="preloader-word">vibe</span>
        </div>
        <div className="preloader-bar"><div className="preloader-bar-fill"></div></div>
      </div>
      */}

      <div className="main-wrapper" ref={mainWrapperRef}>
      {/* SECTION 1: HERO */}
      <section className="app-container">
        {/* Background Dashed Grid Lines */}
        <div className="grid-lines">
          <div className="grid-line-v1"></div>
          <div className="grid-line-v2"></div>
          <div className="grid-line-h1"></div>
          <div className="grid-line-h2"></div>
        </div>

        {/* Header Navigation */}
        <header className="hero-anim-down">
          <div className="header-left">
            <button className="icon-btn" aria-label="Menu">
              <MenuIcon />
            </button>
            <span 
              className="shop-nav-link" 
              onClick={() => navigate('/products')} 
              style={{ cursor: 'pointer', marginLeft: '20px', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-color)', transition: 'opacity 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Shop
            </span>
          </div>
          <h1 className="logo" onClick={() => navigate('/products')} style={{ cursor: 'pointer' }}>opiumcart</h1>
          <div className="header-right">
            <button className="icon-btn" aria-label="Search">
              <SearchIcon />
            </button>
            <button className="icon-btn" aria-label="Cart">
              <BagIcon />
            </button>
            <button className="icon-btn" aria-label="Profile">
              <UserIcon />
            </button>
          </div>
        </header>

        {/* Giant Typography (Behind Model) */}
        <div className="giant-text text-where hero-anim-up" style={{ animationDelay: '0.1s' }}>where</div>
        <div className="giant-text text-style hero-anim-up" style={{ animationDelay: '0.2s' }}>- style</div>
        <div className="giant-text text-lives hero-anim-up" style={{ animationDelay: '0.3s' }}>lives</div>
        <div className="giant-text text-now hero-anim-up" style={{ animationDelay: '0.4s' }}>- now</div>

        {/* Main Model Image */}
        <div className="model-container hero-anim-scale">
          <img
            src="/model-new.png"
            alt="Fashion Model in Sunglasses"
            className="model-img parallax-img"
            data-speed="0.08"
            data-no-scale="true"
          />
        </div>

        {/* Small UI Labels & Paragraphs */}
        <div className="small-label label-fashion hero-anim-up" style={{ animationDelay: '0.5s' }}>//FASHION</div>
        <div className="small-label label-styled hero-anim-up" style={{ animationDelay: '0.6s' }}>
        //STYLED FOR<br />LIFE.
        </div>

        <div className="desc-text hero-anim-up" style={{ animationDelay: '0.7s' }}>
          Explore curated collections<br />
          exclusive drops and everyday<br />
          essentials all thoughtfully<br />
          designed in one stylish<br />
          shopping destination.
        </div>

        <div className="collection-text hero-anim-up" style={{ animationDelay: '0.8s' }}>
          / New<br />
          Collection 2026
        </div>

        {/* Right Side UI Elements */}
        <div className="avatars-container hero-anim-scale" style={{ animationDelay: '0.9s' }}>
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User 1" className="avatar" />
          <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User 2" className="avatar" />
          <div className="add-btn">+</div>
        </div>

        <div className="orange-icon">
          <CloverIcon />
        </div>

        <div className="stats-container hero-anim-up" style={{ animationDelay: '1s' }}>
          <div className="stats-number">280K</div>
          <div className="stats-label">PEOPLE WE INSPIRE</div>
        </div>
      </section>

      {/* SECTION 2: MARQUEE (Transition Strip) */}
      <section className="marquee-section">
        <div className="marquee-content">
          <span><CloverIcon /> slack</span>
          <span><CloverIcon /> Dropbox</span>
          <span><CloverIcon /> Webflow</span>
          <span><CloverIcon /> Spotify</span>
          <span><CloverIcon /> Dropbox</span>
          <span><CloverIcon /> Remessa</span>
        </div>
      </section>

      {/* SECTION 3: ABOUT */}
      <section className="about-section">
        {/* Giant Heading */}
        <h2 className="giant-text-about reveal-up">
          All - about<br />
          summers ©26
        </h2>

        {/* Learn More Group */}
        <div className="learn-more-group reveal-up" style={{ transitionDelay: '0.1s' }}>
          <div className="dots">
            <span className="dot orange-dot"></span>
            <span className="dot grey-dot"></span>
          </div>
          <button className="learn-more-btn">LEARN MORE <span className="arrow">→</span></button>
        </div>

        {/* Large Left Image with S-shaped bg and split */}
        <div className="large-image-group reveal-scale" style={{ transitionDelay: '0.2s' }}>
          <div className="geometric-shape"></div>
          {/* Clover Icon — locks directly to top-left of the S-shape bg */}
          <div className="orange-icon-about">
            <CloverIcon />
          </div>
          <div className="image-inner-container">
            {/* Clean, premium centered campaign fashion model */}
            <div className="large-placeholder parallax-img" data-speed="0.12"></div>
          </div>
          {/* The white stripe gap cuts right through the image and background */}
          <div className="image-stripe-gap"></div>
          <div className="caption">©International - going distance 2026</div>
        </div>

        {/* Middle Text */}
        <div className="middle-text reveal-up" style={{ transitionDelay: '0.3s' }}>
          Where Elegance Meets<br />
          Sustainability Luxury<br />
          Made Accessible
        </div>

        {/* Small Top Right Image */}
        <div className="small-image-group reveal-scale" style={{ transitionDelay: '0.4s' }}>
          <div className="image-placeholder small-tall-placeholder parallax-img" data-speed="0.18"></div>
          <div className="price-tag">($120)</div>
        </div>

        {/* Wide Bottom Right Image */}
        <div className="wide-image-group">
          <div className="wide-geometric-shape"></div>
          <div className="wide-image-container">
            <div className="image-placeholder wide-placeholder parallax-img" data-speed="0.08"></div>
          </div>
          <div className="caption">©International - just do it 2026</div>
        </div>

        {/* 45% Tag */}
        <div className="percent-tag">(45%)</div>
      </section>

      {/* SECTION 4: PAGE 3 (CATEGORIES & RHYTHM) */}
      <section className="page-three-section">

        {/* Left Content */}
        <div className="page3-left-content reveal-up" style={{ transitionDelay: '0.2s' }}>
          <p className="page3-desc">
            Every piece carries rhythm beyond<br />
            clothing it's motion and meaning<br />
            where street energy meets
          </p>
          <button className="see-product-btn" onClick={() => navigate('/products')}>
            SEE PRODUCT <span className="arrow">→</span>
          </button>
        </div>

        {/* Center Image */}
        <div className="page3-center-image reveal-scale">
          <div className="page3-image-inner"></div>
        </div>

        {/* Right Categories */}
        <div className="page3-right-categories reveal-up" style={{ transitionDelay: '0.4s' }}>
          <ul className="category-list">
            {categories.map((cat, idx) => {
              const distance = Math.abs(idx - activeCategory);
              let distanceClass = "distance-0";
              if (distance === 1) distanceClass = "distance-1";
              else if (distance === 2) distanceClass = "distance-2";
              else if (distance >= 3) distanceClass = "distance-3";

              return (
                <li
                  key={idx}
                  className={`${idx === activeCategory ? 'active' : 'inactive'} ${distanceClass}`}
                  onMouseEnter={() => setActiveCategory(idx)}
                >
                  <span className="cat-num">{cat.num}</span>
                  {cat.name} ({cat.count})
                </li>
              );
            })}
          </ul>
          <div className="category-label-container">
            <span className="cat-label-text">[CATEGORIES]</span>
            <span className="cat-label-dash"></span>
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="page3-marquee-container">
          <div className="page3-marquee-content">
            {/* First Set */}
            <span>STYLING</span> <span className="plus">+</span>
            <span>CRAFTED STORIES</span> <span className="plus">+</span>
            <span>PREMIUM MATERIALS</span> <span className="plus">+</span>
            <span>PREMIUM FABRICS</span> <span className="plus">+</span>
            <span>TIMELESS CUTS</span> <span className="plus">+</span>
            <span>URBAN INFLUENCE</span> <span className="plus">+</span>
            {/* Duplicated for seamless scrolling */}
            <span>STYLING</span> <span className="plus">+</span>
            <span>CRAFTED STORIES</span> <span className="plus">+</span>
            <span>PREMIUM MATERIALS</span> <span className="plus">+</span>
            <span>PREMIUM FABRICS</span> <span className="plus">+</span>
            <span>TIMELESS CUTS</span> <span className="plus">+</span>
            <span>URBAN INFLUENCE</span> <span className="plus">+</span>
          </div>
        </div>

      </section>

      {/* SECTION 4: TESTIMONIALS */}
      <section className="testimonial-section">
        {/* Background Dashed Grid Lines */}
        <div className="grid-lines">
          <div className="grid-line-v1"></div>
          <div className="grid-line-v2"></div>
          <div className="grid-line-h1"></div>
          <div className="grid-line-h2"></div>
        </div>

        {/* Top Header Row */}
        <div className="testimonial-header">
          <div className="t-header-left">
            <span className="t-index-current">{testimonials[activeTestimonial].num.split('/')[0]}</span>
            <span className="t-index-divider">/</span>
            <span className="t-index-total">{testimonials[activeTestimonial].num.split('/')[1]}</span>
          </div>
          <div className="t-header-center">
            <span className="t-header-label">[Testimonial]</span>
          </div>
          <div className="t-header-right">
            <div className="t-quote-circle-top">
              <span>“</span>
            </div>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="testimonial-body">
          {/* Left Column: Reviewer Info + Cut Portrait */}
          <div className="testimonial-left-col">
            <div className="reviewer-meta">
              <h4 className="reviewer-name">[{testimonials[activeTestimonial].name}]</h4>
              <span className="reviewer-role">{testimonials[activeTestimonial].role}</span>
            </div>
            
            {/* Beveled Custom Portrait Frame */}
            <div className="testimonial-image-container">
              <div 
                className="testimonial-image-inner parallax-img"
                data-speed="0.08"
                style={{ backgroundImage: `url(${testimonials[activeTestimonial].image})` }}
              ></div>
            </div>
          </div>

          {/* Right Column: Dynamic Large Quote + Star Rating */}
          <div className="testimonial-right-col">
            <blockquote className="testimonial-quote">
              {testimonials[activeTestimonial].quote}
            </blockquote>
            
            {/* Stars & Reviews */}
            <div className="rating-container">
              <div className="stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="rating-text">{testimonials[activeTestimonial].rating}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Row */}
        <div className="testimonial-footer">
          <button className="nav-circle-btn prev-btn" onClick={handlePrevTestimonial} aria-label="Previous Testimonial">
            ←
          </button>
          <span className="t-footer-tagline">See What Our Customers Are Saying</span>
          <div className="t-quote-bottom">”</div>
          <button className="nav-circle-btn next-btn" onClick={handleNextTestimonial} aria-label="Next Testimonial">
            →
          </button>
        </div>
      </section>

      {/* SECTION 5: CAROUSEL */}
      <section className="carousel-section">
        {/* Background Dashed Grid Lines */}
        <div className="grid-lines">
          <div className="grid-line-v1"></div>
          <div className="grid-line-v2"></div>
          <div className="grid-line-h1"></div>
          <div className="grid-line-h2"></div>
        </div>

        {/* Top Header Row */}
        <div className="carousel-header">
          <div className="c-header-col-1 reveal-up">
            <h2>©opiumcart -<br />jacket momento</h2>
          </div>
          <div className="c-header-col-2 reveal-up" style={{ transitionDelay: '0.1s' }}>
            <span className="c-header-year">2026</span>
          </div>
          <div className="c-header-col-3 reveal-up" style={{ transitionDelay: '0.2s' }}>
            <span className="c-header-label">[Other]</span>
          </div>
          <div className="c-header-col-4 reveal-up" style={{ transitionDelay: '0.3s' }}>
            <div className="c-nav-buttons">
              <button className="nav-circle-btn prev-btn" onClick={handlePrevSlide} aria-label="Previous Slide">
                ←
              </button>
              <button className="nav-circle-btn next-btn" onClick={handleNextSlide} aria-label="Next Slide">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Image Track */}
        <div className="carousel-body reveal-up" style={{ transitionDelay: '0.4s' }}>
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(calc(50vw - var(--card-half-width) - (var(--card-width) + var(--card-gap)) * ${activeSlide}))` }}
          >
            {carouselSlides.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <div key={slide.id} className={`carousel-card ${isActive ? 'active' : ''}`}>
                  <div 
                    className="carousel-image" 
                    style={{ backgroundImage: `url(${slide.image})` }}
                  ></div>
                  <div className={`carousel-caption ${isActive ? 'visible' : ''}`}>
                    <p>{slide.text}</p>
                    {/* Carousel Progress Indicators */}
                    <div className="slide-indicators">
                      {carouselSlides.map((_, idx) => (
                        <div
                          key={idx}
                          className={`indicator ${idx === activeSlide ? 'active' : ''}`}
                          onClick={() => setActiveSlide(idx)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Marquee Reused */}
        <div className="page3-marquee-container carousel-footer-marquee">
          <div className="page3-marquee-content">
            {/* First Set */}
            <span>STYLING</span> <span className="plus">+</span>
            <span>CRAFTED STORIES</span> <span className="plus">+</span>
            <span>PREMIUM MATERIALS</span> <span className="plus">+</span>
            <span>PREMIUM FABRICS</span> <span className="plus">+</span>
            <span>TIMELESS CUTS</span> <span className="plus">+</span>
            <span>URBAN INFLUENCE</span> <span className="plus">+</span>
            {/* Duplicated for seamless scrolling */}
            <span>STYLING</span> <span className="plus">+</span>
            <span>CRAFTED STORIES</span> <span className="plus">+</span>
            <span>PREMIUM MATERIALS</span> <span className="plus">+</span>
            <span>PREMIUM FABRICS</span> <span className="plus">+</span>
            <span>TIMELESS CUTS</span> <span className="plus">+</span>
            <span>URBAN INFLUENCE</span> <span className="plus">+</span>
          </div>
        </div>
      </section>

      {/* SECTION 6: COLLECTIONS SPLIT ACCORDION */}
      <section className="collections-section">
        {/* Background Dashed Grid Lines */}
        <div className="grid-lines">
          <div className="grid-line-v1"></div>
          <div className="grid-line-v2"></div>
          <div className="grid-line-h1"></div>
          <div className="grid-line-h2"></div>
        </div>

        <div className="collections-split-container">
          {/* Left Column: Sliced Large Campaign Graphic */}
          <div className="c-split-left-col">
            <span className="c-split-tagline reveal-up" style={{ transitionDelay: '0.1s' }}>
              From enduring classics to daring statement<br />
              pieces, our collections are crafted with intention.
            </span>

            <div className="c-split-image-container reveal-scale" style={{ transitionDelay: '0.2s' }}>
              {/* Sliced Top Half */}
              <div 
                className="c-split-image-top" 
                style={{ backgroundImage: `url(${collectionsData[activeCollection].leftImage})` }}
              ></div>
              {/* Sliced Bottom Half */}
              <div 
                className="c-split-image-bottom" 
                style={{ backgroundImage: `url(${collectionsData[activeCollection].leftImage})` }}
              ></div>
            </div>

            <span className="c-split-bottom-label reveal-up" style={{ transitionDelay: '0.3s' }}>Being Part Of Our journey.</span>
          </div>

          {/* Right Column: Interactive Accordion list */}
          <div className="c-split-right-col">
            <div className="c-accordion-list">
              {collectionsData.map((item, idx) => {
                const isOpen = idx === activeCollection;
                return (
                  <div 
                    key={item.id} 
                    className={`c-accordion-item reveal-up ${isOpen ? 'open' : ''}`}
                    style={{ transitionDelay: `${0.4 + idx * 0.1}s` }}
                    onClick={() => setActiveCollection(idx)}
                  >
                    {/* Collapsed Row Header */}
                    <div className="c-accordion-header">
                      <h3>{item.title}</h3>
                      {!isOpen && (
                        <div className="c-accordion-arrow-btn">
                          <span>→</span>
                        </div>
                      )}
                    </div>

                    {/* Expanded Content Grid */}
                    {isOpen && (
                      <div className="c-accordion-expanded-body">
                        <div className="c-expanded-body-left">
                          <p className="c-expanded-description">{item.description}</p>
                          <button className="c-expanded-get-started-btn">
                            {item.buttonText} <span className="arrow-right">→</span>
                          </button>
                        </div>
                        <div className="c-expanded-body-right">
                          <div 
                            className="c-expanded-inset-image"
                            style={{ backgroundImage: `url(${item.rightImage})` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: EDITORIAL FOOTER */}
      <footer className="editorial-footer">
        <div className="footer-top-grid">
          {/* Left Column: Big Contact Callout */}
          <div className="footer-left-col">
            <span className="footer-label-gray reveal-up">CONTACT US</span>
            <h2 className="footer-big-heading reveal-up" style={{ transitionDelay: '0.1s' }}>
              Fast Selling Urban<br />
              <span className="footer-heading-line"></span>Fashion Collection
            </h2>

            <div className="footer-email-row reveal-up" style={{ transitionDelay: '0.2s' }}>
              <span className="footer-email-text">Send email to us</span>
              <button className="footer-email-arrow-btn" aria-label="Submit Email">
                →
              </button>
            </div>

            <div className="footer-socials-wrapper reveal-up" style={{ transitionDelay: '0.3s' }}>
              <span className="footer-label-socials">Follow Us</span>
              <div className="footer-social-icons">
                <a href="#" className="footer-social-btn" aria-label="Facebook">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3 0-5 2-5 5v2z"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-btn" aria-label="Instagram">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.182c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-btn" aria-label="X">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="footer-social-btn" aria-label="YouTube">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact info & Links grid */}
          <div className="footer-right-col">
            {/* Top row: Contact info */}
            <div className="footer-contact-row reveal-up" style={{ transitionDelay: '0.4s' }}>
              <div className="footer-info-block">
                <span className="footer-label-gray">LOCATION</span>
                <p className="footer-info-value">
                  5567 Washington Ave,<br />
                  America, 32289
                </p>
              </div>
              <div className="footer-info-block">
                <span className="footer-label-gray">CALL US</span>
                <p className="footer-info-value">+016 76234396</p>
              </div>
              <div className="footer-info-block">
                <span className="footer-label-gray">EMAIL</span>
                <p className="footer-info-value">hello@orbix.studio</p>
              </div>
              <div className="footer-info-block">
                <span className="footer-label-gray">OPEN TIME</span>
                <p className="footer-info-value">08.00 - 11.00 pm</p>
              </div>
            </div>

            {/* Bottom row: Nav sitemaps */}
            <div className="footer-nav-sitemaps reveal-up" style={{ transitionDelay: '0.5s' }}>
              <div className="footer-nav-col">
                <span className="footer-nav-title">MENU</span>
                <ul>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Industries</a></li>
                  <li><a href="#">Product</a></li>
                  <li><a href="#">Categories</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <span className="footer-nav-title">SHOP</span>
                <ul>
                  <li><a href="#">Jacket</a></li>
                  <li><a href="#">Totebag</a></li>
                  <li><a href="#">Hat</a></li>
                  <li><a href="#">Blouse</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <span className="footer-nav-title">CART</span>
                <ul>
                  <li><a href="#">Blog</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Terms</a></li>
                  <li><a href="#">Tutorials</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar separator & Copyright */}
        <div className="footer-bottom-bar reveal-up" style={{ transitionDelay: '0.6s' }}>
          <div className="footer-bottom-links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
          <span className="footer-copyright">
            © 2026 opiumcart All rights reserved
          </span>
        </div>
      </footer>
    </div>
    </>
  );
}

