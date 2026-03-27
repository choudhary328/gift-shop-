import React from "react";
import {
  ArrowRight,
  Star,
  Gift,
  Sparkles,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  categories,
  testimonials,
  mockProducts,
} from "../data/mockData";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
}) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const featuredProducts = mockProducts.slice(0, 4);

  const handleQuickAdd = (product: any) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      onNavigate("login");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Guest Banner */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 flex-wrap text-center">
              <p className="text-sm md:text-base">
                👀 <strong>Browsing as Guest!</strong> Login to
                add items to cart and checkout
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => onNavigate("login")}
              >
                Login Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-700 via-pink-600 to-rose-600 text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm inline-flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Trending in 2026 - Free Shipping on Orders ₹999+
              </Badge>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                  Create Magical
                  <span className="block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent">
                    Moments
                  </span>
                  <span className="block">
                    With Perfect Gifts
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-purple-100 max-w-xl mx-auto lg:mx-0">
                  Personalized, unique, and heartfelt gifts for
                  every celebration. From birthdays to
                  anniversaries, make every moment
                  unforgettable.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-gray-100 shadow-2xl text-lg px-8 py-6 h-auto"
                  onClick={() => onNavigate("products")}
                >
                  Explore Gifts
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6 h-auto"
                  onClick={() => onNavigate("products")}
                >
                  <Gift className="mr-2 h-6 w-6" />
                  Customize Now
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 max-w-xl mx-auto lg:mx-0">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Heart className="h-5 w-5 text-red-300" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold">
                    50K+
                  </p>
                  <p className="text-sm text-purple-200">
                    Happy Customers
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Gift className="h-5 w-5 text-yellow-300" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold">
                    1000+
                  </p>
                  <p className="text-sm text-purple-200">
                    Unique Gifts
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold">
                    4.9
                  </p>
                  <p className="text-sm text-purple-200">
                    Average Rating
                  </p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    ✓
                  </div>
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    ✓
                  </div>
                  <span>Same Day Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                    ✓
                  </div>
                  <span>Free Gift Wrap</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image Showcase */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                {/* Main Image */}
                <div className="relative group">
                  <img
                    src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnaWZ0JTIwYm94JTIwY29sb3JmdWx8ZW58MXx8fHwxNzQyNTg5NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Beautiful Gift Collection"
                    className="rounded-3xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500 border-4 border-white/20"
                  />

                  {/* Floating Offer Badge */}
                  <div className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-2xl transform rotate-6 hover:rotate-12 transition-transform">
                    <div className="text-center">
                      <p className="text-sm font-semibold uppercase tracking-wide">
                        Limited Offer
                      </p>
                      <p className="text-4xl font-bold">35%</p>
                      <p className="text-sm font-semibold">
                        OFF
                      </p>
                    </div>
                  </div>

                  {/* Floating Product Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 rounded-2xl p-4 shadow-2xl hover:shadow-3xl transition-shadow max-w-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                        <Gift className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          Premium Hamper
                        </p>
                        <div className="flex items-center gap-1 my-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600 ml-1">
                            (234)
                          </span>
                        </div>
                        <p className="text-purple-600 font-bold">
                          ₹2,499
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Find the perfect gift for every special moment
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => onNavigate("products")}
            >
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Handpicked gifts loved by our customers
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate("products")}
              className="hidden md:flex"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    onClick={() => onNavigate("products")}
                  />
                  {product.discount && (
                    <Badge className="absolute top-3 left-3 bg-red-500">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3
                    className="font-semibold mb-2 line-clamp-1 hover:text-purple-600"
                    onClick={() => onNavigate("products")}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-purple-600">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={() => handleQuickAdd(product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Button onClick={() => onNavigate("products")}>
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <div className="h-16 w-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Free Gift Wrapping
            </h3>
            <p className="text-gray-600">
              Beautiful gift wrapping on all orders at no extra
              cost
            </p>
          </Card>
          <Card className="text-center p-6">
            <div className="h-16 w-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-pink-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Same Day Delivery
            </h3>
            <p className="text-gray-600">
              Order before 2 PM for same day delivery in your
              city
            </p>
          </Card>
          <Card className="text-center p-6">
            <div className="h-16 w-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Personalization
            </h3>
            <p className="text-gray-600">
              Customize gifts with photos, names, and messages
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">
              Real reviews from real customers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ),
                  )}
                </div>
                <p className="text-gray-700 mb-4">
                  {testimonial.comment}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find the Perfect Gift?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of gifts for every
            occasion. Fast delivery, premium quality, and
            exceptional service guaranteed.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => onNavigate("products")}
          >
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};