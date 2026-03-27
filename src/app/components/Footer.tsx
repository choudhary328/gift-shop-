import React from 'react';
import {
  Gift,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  CreditCard,
  Truck,
  Shield,
  Award,
  Clock,
  HeadphonesIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for subscribing! Check your email for exclusive offers.');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Trust Badges Section */}
      <div className="border-b border-gray-800 bg-gray-950/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mb-3">
                <Truck className="h-6 w-6 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Free Delivery</h4>
              <p className="text-xs text-gray-400">On orders above ₹999</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-600/20 flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Secure Payment</h4>
              <p className="text-xs text-gray-400">100% Protected</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-3">
                <Award className="h-6 w-6 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Quality Guaranteed</h4>
              <p className="text-xs text-gray-400">Premium products only</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-600/20 flex items-center justify-center mb-3">
                <HeadphonesIcon className="h-6 w-6 text-orange-400" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">24/7 Support</h4>
              <p className="text-xs text-gray-400">Always here to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Send className="h-6 w-6 text-purple-400" />
                <h3 className="text-white text-2xl font-bold">
                  Join Our Gift Community
                </h3>
              </div>
              <p className="text-gray-400 text-lg">
                Get exclusive deals, gift ideas, and special offers delivered to your inbox
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto md:min-w-[400px]">
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1 h-12"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 h-12 px-6">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Gift className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-white font-bold text-2xl">Online Gift Shop</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted destination for memorable gifts since 2020. We specialize in
              personalized, unique, and heartfelt gifts that create lasting memories.
              With over 50,000+ happy customers, we're committed to making every
              celebration special.
            </p>
            <div className="mb-6">
              <p className="text-white font-semibold mb-3">Follow Us</p>
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gray-800 hover:bg-purple-600 hover:text-white transition-all"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gray-800 hover:bg-pink-600 hover:text-white transition-all"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-500 hover:text-white transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-700 hover:text-white transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  → Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  → All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  → About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  → Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('wishlist')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  → Wishlist
                </button>
              </li>
              <li>
                <button className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block">
                  → Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Gift Categories</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  🎂 Birthday Gifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  💑 Anniversary Gifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  ✨ Customized Gifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  💼 Corporate Gifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  🎉 Festival Gifts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                >
                  💝 Wedding Gifts
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3 group">
                  <MapPin className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-medium mb-1">Visit Us</p>
                    <span className="text-sm">123 Gift Street, Shopping Complex, Mumbai, MH 400001</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <Phone className="h-5 w-5 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-medium mb-1">Call Us</p>
                    <span className="text-sm">1800-123-4567</span>
                    <p className="text-xs text-gray-500">Mon-Sat 9AM-8PM</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <Mail className="h-5 w-5 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-white font-medium mb-1">Email Us</p>
                    <span className="text-sm">support@onlinegiftshop.com</span>
                    <p className="text-xs text-gray-500">24/7 Support</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-400" />
                We Accept
              </p>
              <div className="flex gap-3 flex-wrap">
                <div className="h-10 px-4 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                  <span className="text-white font-semibold text-sm">VISA</span>
                </div>
                <div className="h-10 px-4 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                  <span className="text-white font-semibold text-sm">Mastercard</span>
                </div>
                <div className="h-10 px-4 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                  <span className="text-white font-semibold text-sm">UPI</span>
                </div>
                <div className="h-10 px-4 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                  <span className="text-white font-semibold text-sm">PayPal</span>
                </div>
                <div className="h-10 px-4 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                  <span className="text-white font-semibold text-sm">Paytm</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-white font-semibold">Same Day Delivery</p>
                <p className="text-gray-400 text-xs">Order before 2 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2026 Online Gift Shop. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Made with ❤️ for creating memorable moments
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-purple-400 transition-colors">
                Terms & Conditions
              </button>
              <button className="hover:text-purple-400 transition-colors">
                Refund Policy
              </button>
              <button className="hover:text-purple-400 transition-colors">
                Shipping Policy
              </button>
              <button className="hover:text-purple-400 transition-colors">
                FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
