import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Home from './Home';
import Products from './Products';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}
