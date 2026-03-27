import React, { useState } from 'react';
import { ShoppingCart, Heart, User, Menu, X, Search, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { toast } from 'sonner';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Products', page: 'products' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' }
  ];

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to view your cart");
      onNavigate('login');
      return;
    }
    onNavigate('cart');
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      toast.error("Please login to view your wishlist");
      onNavigate('login');
      return;
    }
    onNavigate('wishlist');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <p>🎁 Free Delivery on Orders Above ₹999</p>
            <p>📞 Customer Support: 1800-123-4567</p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Gift className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Online Gift Shop
              </h1>
              <p className="text-xs text-gray-500">Perfect Gifts for Every Occasion</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  currentPage === item.page ? 'text-purple-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => onNavigate('products')}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleWishlistClick}
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && isAuthenticated && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && isAuthenticated && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-600">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.role === 'admin' && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 text-xs"
                        onClick={() => onNavigate('admin')}
                      >
                        Admin Panel
                      </Button>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => onNavigate('login')}>
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-6">
                  {/* User Info */}
                  {user ? (
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}>
                      Login / Register
                    </Button>
                  )}

                  {/* Navigation */}
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <button
                        key={item.page}
                        onClick={() => {
                          onNavigate(item.page);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left px-4 py-2 rounded-lg transition-colors ${
                          currentPage === item.page
                            ? 'bg-purple-50 text-purple-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setMobileMenuOpen(false);
                        }}
                        className="text-left px-4 py-2 rounded-lg hover:bg-gray-50"
                      >
                        Admin Panel
                      </button>
                    )}
                  </nav>

                  {/* Logout */}
                  {user && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="mt-auto"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
