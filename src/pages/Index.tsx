
import React from 'react';
import { products, getDeals } from '@/utils/mockData';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

const Index = () => {
  const deals = getDeals();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Price<span className="text-primary">Panda</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare prices across multiple stores and find the best deals on your favorite products.
          </p>
        </section>

        {/* Top Deals Section */}
        {deals.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Top Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {deals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Popular Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 PricePanda. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
