import { Product, Store, ViewedProduct } from "@/types";

export const stores: Store[] = [
  {
    id: "store1",
    name: "Amazon",
    logo: "amazon.png",
    website: "https://www.amazon.com",
  },
  {
    id: "store2",
    name: "Best Buy",
    logo: "bestbuy.png",
    website: "https://www.bestbuy.com",
  },
  {
    id: "store3",
    name: "Walmart",
    logo: "walmart.png",
    website: "https://www.walmart.com",
  },
  {
    id: "store4",
    name: "Target",
    logo: "target.png",
    website: "https://www.target.com",
  },
];

export const products: Product[] = [
  {
    id: "prod1",
    name: "LG Ultra HD Smart TV 55\"",
    description: "55-inch 4K Ultra HD Smart LED TV with HDR and built-in voice assistant.",
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
    brand: "LG",
    model: "55NANO80",
    prices: [
      {
        id: "price1",
        storeId: "store1",
        price: 699.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.amazon.com/LG-55NANO80UQA-Alexa-Built-NanoCell/dp/B09ZQDH9DJ/",
      },
      {
        id: "price2",
        storeId: "store2",
        price: 729.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.bestbuy.com/site/lg-55-class-nanocell-80-series-led-4k-uhd-smart-webos-tv/6501921.p",
      },
      {
        id: "price3",
        storeId: "store3",
        price: 679.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.walmart.com/ip/LG-55-Class-4K-UHD-2160P-webOS-Smart-TV-55UQ7570PUJ/148369083",
      },
    ],
    features: [
      "4K Ultra HD (3840 x 2160) resolution",
      "HDR for enhanced color and contrast",
      "Built-in voice assistant",
      "Smart TV functionality with popular streaming apps",
    ],
    rating: 4.5,
    reviewCount: 238,
    dateAdded: "2023-04-10",
  },
  {
    id: "prod2",
    name: "Sony WH-1000XM4 Wireless Headphones",
    description: "Premium wireless over-ear headphones with active noise cancellation and 30-hour battery life.",
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
    brand: "Sony",
    model: "WH-1000XM4",
    prices: [
      {
        id: "price4",
        storeId: "store1",
        price: 249.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.amazon.com/Sony-WH-1000XM4-Canceling-Headphones-phone-call/dp/B0863TXGM3/",
      },
      {
        id: "price5",
        storeId: "store2",
        price: 229.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.bestbuy.com/site/sony-wh-1000xm4-wireless-noise-cancelling-over-the-ear-headphones-black/6408356.p",
      },
      {
        id: "price6",
        storeId: "store4",
        price: 259.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.target.com/p/sony-wh-1000xm4-noise-canceling-overhead-headphones/-/A-80130244",
      },
    ],
    features: [
      "Active noise cancellation",
      "Bluetooth 5.0 connectivity",
      "30-hour battery life",
      "Built-in microphone for calls",
      "Comfortable over-ear design",
    ],
    rating: 4.7,
    reviewCount: 412,
    dateAdded: "2023-03-22",
  },
  {
    id: "prod3",
    name: "Vitamix E310 Professional Blender",
    description: "High-performance 1500W blender with multiple speed settings and durable stainless steel blades.",
    category: "Kitchen Appliances",
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2105&auto=format&fit=crop",
    brand: "Vitamix",
    model: "E310",
    prices: [
      {
        id: "price7",
        storeId: "store3",
        price: 329.99,
        currency: "USD",
        priceDate: "2023-05-14",
        url: "https://www.walmart.com/ip/Vitamix-E310-Explorian-Blender-Black/862255181",
      },
      {
        id: "price8",
        storeId: "store4",
        price: 349.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.target.com/p/vitamix-explorian-e310-blender-black/-/A-76842945",
      },
    ],
    features: [
      "1500W powerful motor",
      "Variable speed control",
      "Pulse function",
      "48-oz container",
      "Dishwasher-safe parts",
    ],
    rating: 4.3,
    reviewCount: 156,
    dateAdded: "2023-04-05",
  },
  {
    id: "prod4",
    name: "Apple iPhone 15 Pro",
    description: "Latest flagship smartphone with 6.7-inch OLED display, 5G capability, and advanced camera system.",
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop",
    brand: "Apple",
    model: "iPhone 15 Pro",
    prices: [
      {
        id: "price9",
        storeId: "store1",
        price: 999.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.amazon.com/Apple-iPhone-15-Pro-256GB/dp/B0CHX1K2ZC/",
      },
      {
        id: "price10",
        storeId: "store2",
        price: 979.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.bestbuy.com/site/apple-iphone-15-pro-256gb-natural-titanium-verizon/6525371.p",
      },
      {
        id: "price11",
        storeId: "store3",
        price: 989.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.walmart.com/ip/AT-T-Apple-iPhone-15-Pro-256GB-Natural-Titanium/5076504232",
      },
      {
        id: "price12",
        storeId: "store4",
        price: 949.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.target.com/p/apple-iphone-15-pro/-/A-89308152",
      },
    ],
    features: [
      "6.7-inch OLED display",
      "5G connectivity",
      "Triple camera system",
      "All-day battery life",
      "Water and dust resistance",
    ],
    rating: 4.8,
    reviewCount: 529,
    dateAdded: "2023-05-01",
    additionalImages: [
      "https://images.unsplash.com/photo-1696446702213-8424ca03100c?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048987437-488323a919b6?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695048811693-cb2488a186a5?q=80&w=1974&auto=format&fit=crop"
    ],
  },
  {
    id: "prod5",
    name: "iRobot Roomba i7+ Robot Vacuum",
    description: "Smart robot vacuum with mapping technology, app control, and automatic recharging. Features powerful suction and advanced navigation to efficiently clean your home.",
    category: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1600805624740-ebe64a34a3c3?q=80&w=2070&auto=format&fit=crop",
    brand: "iRobot",
    model: "Roomba i7+",
    additionalImages: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567818668259-e66acbf804b6?q=80&w=1974&auto=format&fit=crop"
    ],
    prices: [
      {
        id: "price13",
        storeId: "store1",
        price: 699.99,
        currency: "USD",
        priceDate: "2023-05-14",
        url: "https://www.amazon.com/iRobot-Roomba-i7-7150-Vacuum-Technology/dp/B08ZDNKM9N/",
      },
      {
        id: "price14",
        storeId: "store2",
        price: 729.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.bestbuy.com/site/irobot-roomba-i7-7150-app-controlled-self-charging-robot-vacuum-black/6561434.p",
      },
      {
        id: "price15",
        storeId: "store4",
        price: 649.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.target.com/p/irobot-roomba-i7-7150-wi-fi-connected-robot-vacuum/-/A-83621797",
      },
    ],
    features: [
      "Smart mapping technology",
      "Scheduled cleaning",
      "App control",
      "Automatic recharging",
      "HEPA filtration",
      "90-minute runtime per charge",
      "Automatic dirt detection",
      "Virtual boundaries setup",
      "Low-profile design for under furniture"
    ],
    rating: 4.4,
    reviewCount: 187,
    dateAdded: "2023-04-18",
  },
  {
    id: "prod6",
    name: "Samsung Galaxy Watch 6 Classic",
    description: "Premium smartwatch with rotating bezel, advanced fitness tracking, heart monitoring, and seamless connectivity to Samsung ecosystem. IP68 water resistance and built-in GPS.",
    category: "Wearables",
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/levant/2307/gallery/levant-galaxy-watch6-classic-47mm-sm-r960nzkamea-537686187?$720_576_PNG$",
    brand: "Samsung",
    model: "SM-R960",
    additionalImages: [
      "https://images.samsung.com/is/image/samsung/p6pim/levant/2307/gallery/levant-galaxy-watch6-classic-47mm-sm-r960nzkamea-537686178?$684_547_PNG$",
      "https://images.samsung.com/is/image/samsung/p6pim/levant/2307/gallery/levant-galaxy-watch6-classic-47mm-sm-r960nzkamea-537686179?$684_547_PNG$",
      "https://images.samsung.com/is/image/samsung/p6pim/levant/2307/gallery/levant-galaxy-watch6-classic-47mm-sm-r960nzkamea-537686180?$684_547_PNG$"
    ],
    prices: [
      {
        id: "price16",
        storeId: "store1",
        price: 329.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.amazon.com/Samsung-Galaxy-Classic-Smartwatch-Bluetooth/dp/B0C6GNRTL4/",
      },
      {
        id: "price17",
        storeId: "store2",
        price: 349.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.bestbuy.com/site/samsung-galaxy-watch6-classic-bluetooth-smartwatch-47mm-black-stainless-steel-case-with-black-band/6546599.p",
      },
      {
        id: "price18",
        storeId: "store3",
        price: 319.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.walmart.com/ip/Samsung-Galaxy-Watch-6-Classic-47mm-LTE-Smartwatch-w-Rotating-Bezel-Black/3597447298",
      },
      {
        id: "price19",
        storeId: "store4",
        price: 339.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.target.com/p/samsung-galaxy-watch6-classic-bluetooth-47mm-black/-/A-88828895",
      },
    ],
    features: [
      "1.5\" Super AMOLED Display",
      "Rotating bezel for navigation",
      "BioActive Sensor for health monitoring",
      "Advanced sleep coaching",
      "Body composition analysis",
      "40+ hour battery life",
      "Samsung Pay integration",
      "IP68 water and dust resistance",
      "Built-in GPS and compass"
    ],
    rating: 4.7,
    reviewCount: 856,
    dateAdded: "2023-03-15",
  },
];

export const initializeDatabase = () => {
  // Initialize wishlist if it doesn't exist
  if (!localStorage.getItem('wishlist')) {
    localStorage.setItem('wishlist', JSON.stringify([]));
  }
  
  // Initialize viewed products if it doesn't exist
  if (!localStorage.getItem('viewedProducts')) {
    localStorage.setItem('viewedProducts', JSON.stringify([]));
  }
  
  // Initialize compare lists if it doesn't exist
  if (!localStorage.getItem('compareLists')) {
    localStorage.setItem('compareLists', JSON.stringify([]));
  }
};

// Call initialization on import
initializeDatabase();

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getStoreById = (id: string): Store | undefined => {
  return stores.find(store => store.id === id);
};

export const searchProducts = (query: string): Product[] => {
  query = query.toLowerCase().trim();
  if (!query) return products;
  
  return products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.model.toLowerCase().includes(query)
  );
};

// Wishlist Functions
export const getWishlist = (): string[] => {
  try {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      return [];
    }
    
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (e) {
    console.error("Error loading wishlist:", e);
    return [];
  }
};

export const addToWishlist = (productId: string): boolean => {
  try {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      return false;
    }
    
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    return true;
  } catch (e) {
    console.error("Error adding to wishlist:", e);
    return false;
  }
};

export const removeFromWishlist = (productId: string): boolean => {
  try {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      return false;
    }
    
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    return true;
  } catch (e) {
    console.error("Error removing from wishlist:", e);
    return false;
  }
};

export const isInWishlist = (productId: string): boolean => {
  try {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      return false;
    }
    
    return getWishlist().includes(productId);
  } catch (e) {
    console.error("Error checking wishlist:", e);
    return false;
  }
};

// Viewed Products Functions
export const addToViewedProducts = (productId: string): void => {
  try {
    const viewedProducts = getViewedProducts();
    
    // Check if already in viewed
    const existingIndex = viewedProducts.findIndex(item => item.productId === productId);
    
    // If exists, update viewed date and move to top
    if (existingIndex > -1) {
      viewedProducts.splice(existingIndex, 1);
    }
    
    // Add to beginning of array (most recent)
    viewedProducts.unshift({
      productId,
      viewedAt: new Date().toISOString()
    });
    
    // Keep only last 20 viewed products
    const trimmedList = viewedProducts.slice(0, 20);
    
    localStorage.setItem('viewedProducts', JSON.stringify(trimmedList));
  } catch (e) {
    console.error("Error adding to viewed products:", e);
  }
};

export const getViewedProducts = (): ViewedProduct[] => {
  try {
    const saved = localStorage.getItem('viewedProducts');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Error getting viewed products:", e);
    return [];
  }
};

// Compare Lists Functions
export const addToCompareList = (productId: string): void => {
  try {
    const compareLists = getCompareLists();
    if (!compareLists.includes(productId)) {
      // Only allow up to 4 products in compare list
      if (compareLists.length >= 4) {
        compareLists.pop(); // Remove oldest item
      }
      compareLists.unshift(productId); // Add to beginning
      localStorage.setItem('compareLists', JSON.stringify(compareLists));
    }
  } catch (e) {
    console.error("Error adding to compare list:", e);
  }
};

export const removeFromCompareList = (productId: string): void => {
  try {
    let compareLists = getCompareLists();
    compareLists = compareLists.filter(id => id !== productId);
    localStorage.setItem('compareLists', JSON.stringify(compareLists));
  } catch (e) {
    console.error("Error removing from compare list:", e);
  }
};

export const getCompareLists = (): string[] => {
  try {
    const saved = localStorage.getItem('compareLists');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Error getting compare lists:", e);
    return [];
  }
};

export const isInCompareList = (productId: string): boolean => {
  try {
    return getCompareLists().includes(productId);
  } catch (e) {
    console.error("Error checking compare list:", e);
    return false;
  }
};

export const getDeals = (): Product[] => {
  // Return products with the lowest price relative to other stores
  return products.filter(product => {
    if (product.prices.length <= 1) return false;
    
    const prices = product.prices.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // Consider it a deal if there's at least a 5% difference between min and max price
    return (maxPrice - minPrice) / maxPrice >= 0.05;
  });
};
