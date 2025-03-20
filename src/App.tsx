
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { cn } from "@/lib/utils";
import Index from './pages/Index';
import SearchResults from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import WishlistPage from './pages/Wishlist';
import About from './pages/About';
import Deals from './pages/Deals';
import ProfileSettings from './pages/ProfileSettings';
import { Toaster } from "@/components/ui/toaster";
import CompareProducts from './pages/CompareProducts';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';

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
          {
            path: "/terms",
            element: <Terms />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ])}
      />
      <Toaster />
    </div>
  );
}

export default App;
