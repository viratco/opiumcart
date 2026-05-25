import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './ProductDetail.css';

// SVG Icons
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloverIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
    <path d="M12 2C10.5 2 9 3.5 9 5.5C9 8 11.5 10.5 12 12C12.5 10.5 15 8 15 5.5C15 3.5 13.5 2 12 2Z" />
    <path d="M22 12C22 10.5 20.5 9 18.5 9C16 9 13.5 11.5 12 12C13.5 12.5 16 15 18.5 15C20.5 15 22 13.5 22 12Z" />
    <path d="M12 22C13.5 22 15 20.5 15 18.5C15 16 12.5 13.5 12 12C11.5 13.5 9 16 9 18.5C9 20.5 10.5 22 12 22Z" />
    <path d="M2 12C2 13.5 3.5 15 5.5 15C8 15 10.5 12.5 12 12C10.5 11.5 8 9 5.5 9C3.5 9 2 10.5 2 12Z" />
  </svg>
);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartCount } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Dusk Black');
  const [activeTab, setActiveTab] = useState('desc');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [id]);

  const productsData = [
    { id: 1, name: "Oversized Utility Jacket", category: "Jacket", price: "$180", image: "/carousel-1.png", desc: "Heavyweight utility jacket featuring technical pocket configurations, asymmetrical high-collar fastening, and water-resistant nylon shell. Designed for modular layering in unstable urban climates." },
    { id: 2, name: "Technical Cargo Pants", category: "Pants", price: "$145", image: "/carousel-2.png", desc: "Relaxed-fit cargo pants engineered with multi-zip tactical compartments, adjustable hardware cuffs, and reinforced double-knees. Crafted for high-mobility comfort." },
    { id: 3, name: "Monochrome Knit Sweater", category: "Top", price: "$120", image: "/carousel-3.png", desc: "Midweight premium knit sweater with dynamic structural ribbed lines, tailored drop-shoulder, and double-layered neckband. Refined luxury meets street style." },
    { id: 4, name: "Urban Edge Trench", category: "Outer", price: "$220", image: "/carousel-4.png", desc: "Avant-garde double-breasted trench coat built from durable technical gabardine. Features custom geometric back ventilation slits and clean hardware buckles." },
    { id: 5, name: "Essential Heavyweight Tee", category: "Shirt", price: "$65", image: "/carousel-5.png", desc: "Pre-shrunk organic cotton heavyweight tee with clean dry-hand texture, tight collar construction, and perfect boxy silhouette." },
    { id: 6, name: "Layered Track Jacket", category: "Jacket", price: "$160", image: "/collections-right-1.png", desc: "Dual-texture panelled track jacket featuring breathable mesh lining, high-contrast block piping, and dynamic thumbhole cuffs." },
    { id: 7, name: "Parachute Trousers", category: "Pants", price: "$130", image: "/collections-right-2.png", desc: "Ultra-lightweight ripstop nylon trousers with dynamic knee gathers, adjustable elastic toggles, and oversized utility pockets." },
    { id: 8, name: "Ribbed Beanie Hat", category: "Accessories", price: "$45", image: "/testimonial-1.png", desc: "Warm merino wool-blend ribbed knit beanie featuring minimalist fold-over cuff and premium woven brand label." },
    { id: 9, name: "Off-Grid Parka Jacket", category: "Jacket", price: "$240", image: "/testimonial-2.png", desc: "Oversized insulated cold-weather parka featuring high-loft heat retention, dynamic storm hood design, and magnetic closures." },
    { id: 10, name: "Street Shell Windbreaker", category: "Jacket", price: "$195", image: "/testimonial-3.png", desc: "Packable windbreaker jacket featuring structural geometric panelling, storm-flap side pockets, and matte black toggles." },
    { id: 11, name: "Minimalist Mockneck Sweatshirt", category: "Top", price: "$110", image: "/model.png", desc: "Clean geometric silhouette fleece mockneck featuring seamless drop-shoulder, invisible side-seam pockets, and boxy cut." },
    { id: 12, name: "Dusk Cargo Shorts", category: "Pants", price: "$95", image: "/carousel-2.png", desc: "Sturdy technical canvas cargo shorts with reinforced belt loops, spacious modular gear pockets, and comfortable fit." },
    { id: 13, name: "Utility Vest Harness", category: "Accessories", price: "$85", image: "/carousel-1.png", desc: "Stealth mesh panel vest harness featuring dual chest pockets, adjustable quick-release utility buckles, and modular loops." },
    { id: 14, name: "Streetwear Fleece Hoodie", category: "Top", price: "$135", image: "/carousel-3.png", desc: "Thick double-faced loopback fleece hoodie featuring structured hood outline, kangaroo pocket, and clean ribbed cuffs." },
    { id: 15, name: "Stealth Tech Bomber", category: "Jacket", price: "$210", image: "/carousel-4.png", desc: "Sleek low-profile insulation bomber jacket featuring water-repellent shell, utility sleeve sleeve-zipper, and ribbed details." },
    { id: 16, name: "Relaxed Fit Denim Jeans", category: "Pants", price: "$115", image: "/collections-right-2.png", desc: "Washed technical denim jeans featuring architectural leg seams, industrial hardware details, and comfortable relaxed cut." },
  ];

  const product = productsData.find(p => p.id === parseInt(id)) || productsData[0];

  // Get 3 random recommended items
  const recommendations = productsData
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="product-detail-page">
      {/* Navigation Header */}
      <header className="detail-header">
        <Link to="/products" className="back-link">
          <ArrowLeftIcon />
          <span>Back to Catalog</span>
        </Link>
        <h1 className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>wear the vibe</h1>
        <div className="header-right">
          <button className="icon-btn" aria-label="Cart" style={{ position: 'relative' }} onClick={() => navigate('/cart')}>
            <BagIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Main Detail Section */}
      <section className="detail-main-container">
        {/* Left Side: Large Beveled Image */}
        <div className="detail-image-sec reveal-scale">
          <div className="detail-geometric-bg"></div>
          <div className="detail-image-wrapper">
            <div 
              className="detail-image" 
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>
          <div className="detail-image-tag">
            <CloverIcon />
            <span>CERTIFIED AUTHENTIC ©2026</span>
          </div>
        </div>

        {/* Right Side: Buying Options */}
        <div className="detail-info-sec reveal-up">
          <div className="detail-meta">
            <span className="detail-category">{product.category}</span>
            <span className="detail-price">{product.price}</span>
          </div>
          <h2 className="detail-name">{product.name}</h2>

          <p className="detail-intro">{product.desc}</p>

          {/* Color Selector */}
          <div className="detail-option-group">
            <span className="option-label">Color: <span className="option-val">{selectedColor}</span></span>
            <div className="color-selectors">
              {['Dusk Black', 'Off-White', 'Stealth Grey'].map(color => (
                <button 
                  key={color} 
                  className={`color-selector-btn ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={color}
                >
                  <span className={`color-dot ${color.toLowerCase().replace(' ', '-')}`}></span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="detail-option-group">
            <span className="option-label">Size: <span className="option-val">{selectedSize}</span></span>
            <div className="size-selectors">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button 
                  key={size} 
                  className={`size-selector-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add To Bag CTA */}
          <button 
            className={`detail-add-bag-btn ${addedFeedback ? 'added' : ''}`}
            onClick={() => {
              addToCart(product, selectedSize, selectedColor);
              setAddedFeedback(true);
              setTimeout(() => setAddedFeedback(false), 2000);
            }}
          >
            {addedFeedback ? '✓ SECURED' : `SECURE THIS PIECE — ${product.price}`}
          </button>

          {/* Interactive Drawers / Tabs */}
          <div className="detail-tabs">
            <div className="tab-headers">
              <button 
                className={`tab-header-btn ${activeTab === 'desc' ? 'active' : ''}`}
                onClick={() => setActiveTab('desc')}
              >
                SPECIFICATIONS
              </button>
              <button 
                className={`tab-header-btn ${activeTab === 'care' ? 'active' : ''}`}
                onClick={() => setActiveTab('care')}
              >
                FIT & CARE
              </button>
              <button 
                className={`tab-header-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                DELIVERY
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'desc' && (
                <ul className="spec-list">
                  <li>Technical water-resistant nylon composite shell</li>
                  <li>Structural 3D utility pocket arrays</li>
                  <li>Reinforced stress seams for active durability</li>
                  <li>Custom matte black brand zip pullers</li>
                </ul>
              )}
              {activeTab === 'care' && (
                <p className="tab-text">
                  Fits boxy and slightly oversized to facilitate layered aesthetics. 
                  Machine wash cold inside out on a gentle cycle. Hang dry in shade. Do not iron directly on branding.
                </p>
              )}
              {activeTab === 'shipping' && (
                <p className="tab-text">
                  Complimentary standard shipping worldwide on orders above $150. 
                  Dispatched from dispatch stations within 48 hours. Easy returns within 14 days.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended styles */}
      <section className="recommendations-sec">
        <h3 className="rec-title reveal-up">YOU MIGHT ALSO MESS WITH</h3>
        <div className="rec-grid">
          {recommendations.map((item, idx) => (
            <div 
              key={item.id} 
              className="rec-card reveal-up"
              style={{ transitionDelay: `${0.1 * idx}s` }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="rec-image-wrapper">
                <div 
                  className="rec-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
              </div>
              <div className="rec-info">
                <span className="rec-name">{item.name}</span>
                <span className="rec-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="detail-footer">
        © 2026 Velour All rights reserved
      </footer>
    </div>
  );
}
