import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { cn } from "@/lib/utils";
import Index from '@/pages';
import SearchResults from '@/pages/SearchResults';
import ProductDetail from '@/pages/ProductDetail';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import WishlistPage from '@/pages/WishlistPage';
import About from '@/pages/About';
import Deals from '@/pages/Deals';
import ProfileSettings from '@/pages/ProfileSettings';
import { Toaster } from "@/components/ui/toaster"
import CompareProducts from './pages/CompareProducts';

function App() {
  const className = cn(
    "min-h-screen antialiased",
  );

  return (
    <div className={className}>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Index />,
          },
          {
            path: "/search",
            element: <SearchResults />,
          },
          {
            path: "/product/:id",
            element: <ProductDetail />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/wishlist",
            element: <WishlistPage />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/deals",
            element: <Deals />,
          },
          {
            path: "/profile-settings",
            element: <ProfileSettings />,
          },
          {
            path: "/compare",
            element: <CompareProducts />,
          },
        ])}
      />
      <Toaster />
    </div>
  );
}

export default App;
