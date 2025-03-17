
import React from 'react';
import Navbar from '@/components/Navbar';
import { ShoppingBag, Search, Heart, DollarSign, Percent } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About PricePanda</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Helping you find the best deals across multiple online stores
          </p>
        </section>
        
        <section className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              PricePanda was founded with a simple mission: to help shoppers save money by providing 
              transparent price comparisons across multiple online stores. We believe that 
              everyone deserves to find the best deals without spending hours searching 
              different websites.
            </p>
            <p className="text-muted-foreground mb-6">
              Our platform aggregates prices from leading retailers in real-time, 
              allowing you to easily compare options and make informed purchasing decisions. 
              Whether you're shopping for electronics, appliances, or everyday items, 
              PricePanda helps you find the best value for your money.
            </p>
            <p className="text-muted-foreground">
              We're committed to providing a user-friendly experience that makes price 
              comparison quick, easy, and accessible to everyone.
            </p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Search</h3>
              <p className="text-muted-foreground">
                Search for products or browse categories to find what you're looking for
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Compare</h3>
              <p className="text-muted-foreground">
                View prices from multiple stores all in one place
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Percent className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Save</h3>
              <p className="text-muted-foreground">
                Find the best deals and save money on your purchases
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Wishlist</h3>
              <p className="text-muted-foreground">
                Save products to your wishlist to track prices over time
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Why Choose PricePanda?</h2>
            <ul className="space-y-4">
              <li className="flex">
                <span className="text-primary mr-3">✓</span>
                <span className="text-muted-foreground">Real-time price comparisons across multiple stores</span>
              </li>
              <li className="flex">
                <span className="text-primary mr-3">✓</span>
                <span className="text-muted-foreground">Personalized wishlists to track products and price changes</span>
              </li>
              <li className="flex">
                <span className="text-primary mr-3">✓</span>
                <span className="text-muted-foreground">Detailed product information and specifications</span>
              </li>
              <li className="flex">
                <span className="text-primary mr-3">✓</span>
                <span className="text-muted-foreground">User-friendly interface designed for easy navigation</span>
              </li>
              <li className="flex">
                <span className="text-primary mr-3">✓</span>
                <span className="text-muted-foreground">No hidden fees or costs - our service is completely free</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold text-secondary">
              Price<span className="text-primary">Panda</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PricePanda. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
