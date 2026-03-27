import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { WishlistPage } from './components/WishlistPage';
import { AdminPanel } from './components/admin/AdminPanel';
import { Toaster } from './components/ui/sonner';

type Page = 'login' | 'home' | 'products' | 'about' | 'contact' | 'cart' | 'checkout' | 'order-success' | 'wishlist' | 'admin';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [orderId, setOrderId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string) => {
    // Extract orderId if it's an order-success page with query params
    if (page.startsWith('order-success?orderId=')) {
      const id = page.split('orderId=')[1];
      setOrderId(id);
      setCurrentPage('order-success');
    } else {
      setCurrentPage(page as Page);
    }
    window.scrollTo(0, 0);
  };

  // Public routes - accessible without authentication
  const publicPages: Page[] = ['home', 'products', 'about', 'contact', 'login'];

  // Protected routes - require authentication
  const protectedPages: Page[] = ['cart', 'checkout', 'order-success', 'wishlist', 'admin'];

  // Redirect to login if accessing protected page without authentication
  if (!isAuthenticated && protectedPages.includes(currentPage)) {
    return (
      <>
        <AuthPage onNavigate={handleNavigate} />
        <Toaster position="top-center" />
      </>
    );
  }

  // Admin-only pages
  if (currentPage === 'admin' && user?.role !== 'admin') {
    setCurrentPage('home');
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'order-success':
        return <OrderSuccessPage onNavigate={handleNavigate} orderId={orderId} />;
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const showHeaderFooter = currentPage !== 'login' && currentPage !== 'order-success';

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && <Header currentPage={currentPage} onNavigate={handleNavigate} />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
      <Toaster position="top-center" richColors />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
