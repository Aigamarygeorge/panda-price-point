
import React from 'react';
import { getDeals } from '@/utils/mockData';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { Percent, Sparkles } from 'lucide-react';

const Deals = () => {
  const deals = getDeals();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12 fade-in">
          <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Limited Time Offers
          </div>
          <h1 className="text-3xl font-bold mb-4">Today's Best Deals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Save big with these special offers and discounts across multiple stores
          </p>
        </section>

        {deals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {deals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm scale-in">
            <Percent className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No deals available</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Check back soon for new deals and discounts!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Deals;
