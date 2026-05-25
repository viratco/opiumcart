import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Cart.css';

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24">
    <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="16" height="16">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="18" height="18">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloverIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor">
    <path d="M12 2C10.5 2 9 3.5 9 5.5C9 8 11.5 10.5 12 12C12.5 10.5 15 8 15 5.5C15 3.5 13.5 2 12 2Z" />
    <path d="M22 12C22 10.5 20.5 9 18.5 9C16 9 13.5 11.5 12 12C13.5 12.5 16 15 18.5 15C20.5 15 22 13.5 22 12Z" />
    <path d="M12 22C13.5 22 15 20.5 15 18.5C15 16 12.5 13.5 12 12C11.5 13.5 9 16 9 18.5C9 20.5 10.5 22 12 22Z" />
    <path d="M2 12C2 13.5 3.5 15 5.5 15C8 15 10.5 12.5 12 12C10.5 11.5 8 9 5.5 9C3.5 9 2 10.5 2 12Z" />
  </svg>
);

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  // Scroll to top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Re-observe reveal elements whenever the cart count changes
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [cartItems.length]);

  const shipping = cartItems.length > 0 ? (cartTotal > 150 ? 0 : 12) : 0;
  const total = cartTotal + shipping;

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="cart-header">
        <Link to="/products" className="back-link">
          <ArrowLeftIcon />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>wear the vibe</h1>
        <div className="cart-header-right">
          <span className="cart-item-count">{cartItems.reduce((s, i) => s + i.quantity, 0)} items</span>
        </div>
      </header>

      {cartItems.length === 0 ? (
        /* Empty State */
        <div className="cart-empty reveal-up">
          <div className="empty-bag-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="empty-title">Your rotation is looking kinda dry...</h2>
          <p className="empty-subtitle">Time to secure the bag. Go find your next favorite piece.</p>
          <button className="empty-browse-btn" onClick={() => navigate('/products')}>
            FIND SOME HEAT <span>→</span>
          </button>
        </div>
      ) : (
        /* Cart Layout */
        <div className="cart-body">
          {/* Left: Cart Items */}
          <div className="cart-items-col">
            <div className="cart-col-header reveal-up">
              <h2 className="cart-page-title">The Haul</h2>
              <button className="clear-cart-btn" onClick={clearCart}>Clear all</button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item, idx) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="cart-item reveal-up"
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  {/* Product Image */}
                  <div
                    className="cart-item-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  ></div>

                  {/* Product Details */}
                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <span className="cart-item-cat">{item.category}</span>
                        <h3 className="cart-item-name" onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                        <div className="cart-item-variants">
                          <span>{item.color}</span>
                          <span className="variant-dot"></span>
                          <span>Size: {item.size}</span>
                        </div>
                      </div>
                      <span className="cart-item-price">{item.price}</span>
                    </div>

                    <div className="cart-item-bottom">
                      {/* Quantity Control */}
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        >
                          <MinusIcon />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="cart-summary-col">
            <div className="cart-summary-card reveal-up" style={{ transitionDelay: '0.2s' }}>
              <h3 className="summary-title">ORDER SUMMARY</h3>

              <div className="summary-lines">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="free-tag">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="free-shipping-hint">
                    Add ${(150 - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total-line">
                <span>Total</span>
                <span className="total-amount">${total.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={() => alert('Checkout coming soon!')}>
                SECURE THE BAG
              </button>

              <div className="summary-perks">
                <div className="perk">
                  <CloverIcon />
                  <span>Free returns within 14 days</span>
                </div>
                <div className="perk">
                  <CloverIcon />
                  <span>Secure & encrypted checkout</span>
                </div>
                <div className="perk">
                  <CloverIcon />
                  <span>Free shipping over $150</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="cart-footer">
        © 2026 Velour All rights reserved
      </footer>
    </div>
  );
}
