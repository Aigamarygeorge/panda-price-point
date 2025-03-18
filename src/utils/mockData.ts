import { Product, Store } from "@/types";

export const stores: Store[] = [
  {
    id: "store1",
    name: "ElectroMart",
    logo: "electromart.png",
    website: "https://electromart.example.com",
  },
  {
    id: "store2",
    name: "TechHaven",
    logo: "techhaven.png",
    website: "https://techhaven.example.com",
  },
  {
    id: "store3",
    name: "GadgetGalaxy",
    logo: "gadgetgalaxy.png",
    website: "https://gadgetgalaxy.example.com",
  },
  {
    id: "store4",
    name: "BuyMore",
    logo: "buymore.png",
    website: "https://buymore.example.com",
  },
];

export const products: Product[] = [
  {
    id: "prod1",
    name: "Ultra HD Smart TV 55\"",
    description: "55-inch 4K Ultra HD Smart LED TV with HDR and built-in voice assistant.",
    category: "Electronics",
    imageUrl: "https://placehold.co/600x400/2D9858/FFFFFF?text=Ultra+HD+TV",
    brand: "TechVision",
    model: "TV55-4000",
    prices: [
      {
        id: "price1",
        storeId: "store1",
        price: 699.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://electromart.example.com/products/tv55-4000",
      },
      {
        id: "price2",
        storeId: "store2",
        price: 729.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://techhaven.example.com/products/tv55-4000",
      },
      {
        id: "price3",
        storeId: "store3",
        price: 679.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://gadgetgalaxy.example.com/products/tv55-4000",
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
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium wireless over-ear headphones with active noise cancellation and 30-hour battery life.",
    category: "Audio",
    imageUrl: "https://placehold.co/600x400/2D9858/FFFFFF?text=Headphones",
    brand: "SoundMaster",
    model: "NC-800",
    prices: [
      {
        id: "price4",
        storeId: "store1",
        price: 249.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://electromart.example.com/products/nc-800",
      },
      {
        id: "price5",
        storeId: "store2",
        price: 229.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://techhaven.example.com/products/nc-800",
      },
      {
        id: "price6",
        storeId: "store4",
        price: 259.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://buymore.example.com/products/nc-800",
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
    name: "Professional Blender 1500W",
    description: "High-performance 1500W blender with multiple speed settings and durable stainless steel blades.",
    category: "Kitchen Appliances",
    imageUrl: "https://placehold.co/600x400/2D9858/FFFFFF?text=Blender",
    brand: "KitchenPro",
    model: "BL-1500X",
    prices: [
      {
        id: "price7",
        storeId: "store3",
        price: 129.99,
        currency: "USD",
        priceDate: "2023-05-14",
        url: "https://gadgetgalaxy.example.com/products/bl-1500x",
      },
      {
        id: "price8",
        storeId: "store4",
        price: 119.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://buymore.example.com/products/bl-1500x",
      },
    ],
    features: [
      "1500W powerful motor",
      "Variable speed control",
      "Pulse function",
      "8-cup capacity",
      "Dishwasher-safe parts",
    ],
    rating: 4.3,
    reviewCount: 156,
    dateAdded: "2023-04-05",
  },
  {
    id: "prod4",
    name: "Smartphone XL Pro",
    description: "Latest flagship smartphone with 6.7-inch OLED display, 5G capability, and advanced camera system.",
    category: "Smartphones",
    imageUrl: "https://placehold.co/600x400/2D9858/FFFFFF?text=Smartphone",
    brand: "TechGiant",
    model: "XL Pro",
    prices: [
      {
        id: "price9",
        storeId: "store1",
        price: 999.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://electromart.example.com/products/xl-pro",
      },
      {
        id: "price10",
        storeId: "store2",
        price: 979.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://techhaven.example.com/products/xl-pro",
      },
      {
        id: "price11",
        storeId: "store3",
        price: 989.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://gadgetgalaxy.example.com/products/xl-pro",
      },
      {
        id: "price12",
        storeId: "store4",
        price: 949.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://buymore.example.com/products/xl-pro",
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
  },
  {
    id: "prod5",
    name: "Robot Vacuum Cleaner",
    description: "Smart robot vacuum with mapping technology, app control, and automatic recharging. Features powerful suction and advanced navigation to efficiently clean your home.",
    category: "Home Appliances",
    imageUrl: "https://images.unsplash.com/photo-1600805624740-ebe64a34a3c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "CleanTech",
    model: "RV-2000",
    prices: [
      {
        id: "price13",
        storeId: "store2",
        price: 299.99,
        currency: "USD",
        priceDate: "2023-05-14",
        url: "https://www.amazon.com/robot-vacuum-cleaners/s?k=robot+vacuum+cleaners",
      },
      {
        id: "price14",
        storeId: "store3",
        price: 329.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://www.bestbuy.com/site/searchpage.jsp?st=robot+vacuum",
      },
      {
        id: "price15",
        storeId: "store4",
        price: 289.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://www.walmart.com/browse/home-improvement/robot-vacuums/1072864_1231154_9657831",
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
    name: "Fitness Smartwatch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
    category: "Wearables",
    imageUrl: "https://placehold.co/600x400/2D9858/FFFFFF?text=Smartwatch",
    brand: "FitTech",
    model: "Watch Pro",
    prices: [
      {
        id: "price16",
        storeId: "store1",
        price: 159.99,
        currency: "USD",
        priceDate: "2023-05-15",
        url: "https://electromart.example.com/products/watch-pro",
      },
      {
        id: "price17",
        storeId: "store3",
        price: 149.99,
        currency: "USD",
        priceDate: "2023-05-16",
        url: "https://gadgetgalaxy.example.com/products/watch-pro",
      },
    ],
    features: [
      "Heart rate monitoring",
      "Built-in GPS",
      "7-day battery life",
      "Water resistance up to 50m",
      "Sleep tracking",
    ],
    rating: 4.6,
    reviewCount: 315,
    dateAdded: "2023-03-15",
  },
];

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

const initialWishlist: string[] = [];

export const getWishlist = (): string[] => {
  const savedWishlist = localStorage.getItem('wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : initialWishlist;
};

export const addToWishlist = (productId: string): void => {
  const wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (productId: string): void => {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const isInWishlist = (productId: string): boolean => {
  return getWishlist().includes(productId);
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
