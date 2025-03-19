
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Lock, Save, Camera, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [viewedProducts, setViewedProducts] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [compareListsCount, setCompareListsCount] = useState<number>(0);

  useEffect(() => {
    // Check login status
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    if (!loginStatus) {
      navigate('/login');
      return;
    }
    
    setIsLoggedIn(true);
    // Load user data from localStorage
    const userName = localStorage.getItem('userName') || '';
    const userEmail = localStorage.getItem('userEmail') || '';
    const userAvatar = localStorage.getItem('userAvatar') || '';
    
    setFormData({
      name: userName,
      email: userEmail,
      password: '',
      confirmPassword: '',
    });
    
    setAvatarUrl(userAvatar);
    
    // Load statistics data
    loadUserStatistics();
  }, [navigate]);

  const loadUserStatistics = () => {
    // Load viewed products count
    const viewed = localStorage.getItem('viewedProducts');
    if (viewed) {
      try {
        const parsedViewed = JSON.parse(viewed);
        setViewedProducts(Array.isArray(parsedViewed) ? parsedViewed.length : 0);
      } catch (e) {
        setViewedProducts(0);
      }
    }

    // Load wishlist count
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist) {
      try {
        const parsedWishlist = JSON.parse(wishlist);
        setWishlistCount(Array.isArray(parsedWishlist) ? parsedWishlist.length : 0);
      } catch (e) {
        setWishlistCount(0);
      }
    }

    // Load compare lists count
    const compareLists = localStorage.getItem('compareLists');
    if (compareLists) {
      try {
        const parsedCompareLists = JSON.parse(compareLists);
        setCompareListsCount(Array.isArray(parsedCompareLists) ? parsedCompareLists.length : 0);
      } catch (e) {
        setCompareListsCount(0);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    
    if (formData.password) {
      localStorage.setItem('userPassword', formData.password);
    }
    
    toast({
      description: "Profile updated successfully",
    });
    
    // Clear password fields
    setFormData(prev => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarUrl(result);
        localStorage.setItem('userAvatar', result);
        toast({
          description: "Profile picture updated",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm scale-in">
          <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center justify-start space-y-4">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-md">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={formData.name} />
                  ) : (
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {getInitials(formData.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors">
                  <Camera className="h-5 w-5" />
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Click the camera icon to upload a profile picture
              </p>
            </div>
            
            {/* Profile Form Section */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="pl-10"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-10"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    New Password (leave blank to keep current)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className="pl-10"
                      placeholder="New password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="pl-10"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full btn-hover-effect">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <h2 className="text-lg font-medium mb-4">Account Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-red-400" />
                    Wishlist Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{wishlistCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-blue-400" />
                    Viewed Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{viewedProducts}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2 text-green-400" />
                    Compare Lists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{compareListsCount}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
