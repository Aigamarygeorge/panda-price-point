
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { NotificationProvider } from '@/contexts/NotificationContext';

// Import pages
import Index from '@/pages/Index';
import Search from '@/pages/Search';
import ProductDetail from '@/pages/ProductDetail';
import Deals from '@/pages/Deals';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Wishlist from '@/pages/Wishlist';
import CompareProducts from '@/pages/CompareProducts';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import ProfileSettings from '@/pages/ProfileSettings';

import './App.css';

function App() {
  // Set document title
  document.title = 'PricePanda - Compare Prices & Find Deals';
  
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/compare" element={<CompareProducts />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </NotificationProvider>
  );
}

export default App;
