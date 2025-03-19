
export interface Store {
  id: string;
  name: string;
  logo?: string;
  website: string;
}

export interface Price {
  id: string;
  storeId: string;
  price: number;
  currency: string;
  priceDate: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  brand: string;
  model: string;
  prices: Price[];
  features?: string[];
  rating?: number;
  reviewCount?: number;
  dateAdded: string;
  additionalImages?: string[]; // Added field for multiple product images
}

export interface WishlistItem {
  productId: string;
  dateAdded: string;
}

export interface ViewedProduct {
  productId: string;
  viewedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: WishlistItem[];
}
