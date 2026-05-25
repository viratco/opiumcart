import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Products.css';

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

export default function Products() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    // Scroll to top when loading the products page
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const productsData = [
    { id: 1, name: "Oversized Utility Jacket", category: "Jacket", price: "$180", image: "/carousel-1.png" },
    { id: 2, name: "Technical Cargo Pants", category: "Pants", price: "$145", image: "/carousel-2.png" },
    { id: 3, name: "Monochrome Knit Sweater", category: "Top", price: "$120", image: "/carousel-3.png" },
    { id: 4, name: "Urban Edge Trench", category: "Outer", price: "$220", image: "/carousel-4.png" },
    { id: 5, name: "Essential Heavyweight Tee", category: "Shirt", price: "$65", image: "/carousel-5.png" },
    { id: 6, name: "Layered Track Jacket", category: "Jacket", price: "$160", image: "/collections-right-1.png" },
    { id: 7, name: "Parachute Trousers", category: "Pants", price: "$130", image: "/collections-right-2.png" },
    { id: 8, name: "Ribbed Beanie Hat", category: "Accessories", price: "$45", image: "/testimonial-1.png" },
    { id: 9, name: "Off-Grid Parka Jacket", category: "Jacket", price: "$240", image: "/testimonial-2.png" },
    { id: 10, name: "Street Shell Windbreaker", category: "Jacket", price: "$195", image: "/testimonial-3.png" },
    { id: 11, name: "Minimalist Mockneck Sweatshirt", category: "Top", price: "$110", image: "/model.png" },
    { id: 12, name: "Dusk Cargo Shorts", category: "Pants", price: "$95", image: "/carousel-2.png" },
    { id: 13, name: "Utility Vest Harness", category: "Accessories", price: "$85", image: "/carousel-1.png" },
    { id: 14, name: "Streetwear Fleece Hoodie", category: "Top", price: "$135", image: "/carousel-3.png" },
    { id: 15, name: "Stealth Tech Bomber", category: "Jacket", price: "$210", image: "/carousel-4.png" },
    { id: 16, name: "Relaxed Fit Denim Jeans", category: "Pants", price: "$115", image: "/collections-right-2.png" },
  ];

  return (
    <div className="products-page">
      {/* Navigation Header */}
      <header className="products-header">
        <Link to="/" className="back-link">
          <ArrowLeftIcon />
          <span>Back to Home</span>
        </Link>
        <h1 className="logo">wear the vibe</h1>
        <div className="header-right">
          <button className="icon-btn" aria-label="Cart" style={{ position: 'relative' }} onClick={() => navigate('/cart')}>
            <BagIcon />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Hero Header for Products */}
      <section className="products-hero">
        <h2 className="p-hero-title reveal-up">The Drop List</h2>
        <p className="p-hero-subtitle reveal-up" style={{ transitionDelay: '0.1s' }}>
          Everything we've got. No skips. Just straight heat for your daily rotation.
        </p>
      </section>

      {/* Filters & Count */}
      <div className="products-toolbar reveal-up" style={{ transitionDelay: '0.2s' }}>
        <div className="p-filter-group">
          <button className="p-filter-btn active">All</button>
          <button className="p-filter-btn">Jackets</button>
          <button className="p-filter-btn">Pants</button>
          <button className="p-filter-btn">Outerwear</button>
        </div>
        <div className="p-count">Showing {productsData.length} items</div>
      </div>

      {/* Products Grid */}
      <section className="products-grid">
        {productsData.map((item, idx) => (
          <div 
            key={item.id} 
            className="product-card reveal-up"
            style={{ transitionDelay: `${0.1 * (idx % 4)}s` }}
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="p-card-image-wrapper">
              <div 
                className="p-card-image" 
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="p-card-overlay">
                <button 
                  className="p-add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added to bag!");
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
            <div className="p-card-info">
              <div className="p-card-header">
                <span className="p-category">{item.category}</span>
                <span className="p-price">{item.price}</span>
              </div>
              <h3 className="p-name">{item.name}</h3>
            </div>
          </div>
        ))}
      </section>

      {/* Simple Footer */}
      <footer className="products-footer">
        © 2026 Velour All rights reserved
      </footer>
    </div>
  );
}
