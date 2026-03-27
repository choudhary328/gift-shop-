import React, { useState } from 'react';
import { Search, SlidersHorizontal, Heart, Star, X, Upload, Palette, Type } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { mockProducts, categories } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../contexts/CartContext';
import { toast } from 'sonner';

interface ProductsPageProps {
  onNavigate: (page: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Product Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Customization Modal
  const [showCustomization, setShowCustomization] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange === 'under500') matchesPrice = product.price < 500;
    if (priceRange === '500-1000') matchesPrice = product.price >= 500 && product.price <= 1000;
    if (priceRange === '1000-2000') matchesPrice = product.price >= 1000 && product.price <= 2000;
    if (priceRange === 'above2000') matchesPrice = product.price > 2000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setSelectedColor(product.colors?.[0] || '');
    setSelectedSize(product.sizes?.[0] || '');
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      setSelectedProduct(null);
      onNavigate("login");
      return;
    }

    if (selectedProduct) {
      if (selectedProduct.customizable) {
        setShowCustomization(true);
      } else {
        addToCart(selectedProduct);
        toast.success(`${selectedProduct.name} added to cart!`);
        setSelectedProduct(null);
      }
    }
  };

  const handleCustomizationSubmit = () => {
    if (selectedProduct) {
      const customization = {
        text: customText || undefined,
        image: customImage || undefined,
        color: selectedColor || undefined,
        size: selectedSize || undefined
      };
      
      addToCart(selectedProduct, customization);
      toast.success('Customized gift added to cart! (+20% customization fee)');
      
      // Reset
      setShowCustomization(false);
      setSelectedProduct(null);
      setCustomText('');
      setCustomImage(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWishlistToggle = (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to wishlist");
      onNavigate("login");
      return;
    }

    if (isInWishlist(product.id)) {
      toast.info('Already in wishlist');
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Guest Banner */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 flex-wrap text-center">
              <p className="text-sm md:text-base">
                🛍️ <strong>Shopping as Guest!</strong> Login to purchase and add items to your wishlist
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => onNavigate("login")}
              >
                Login / Register
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Gift Collection</h1>
            <p className="text-gray-600">Browse {sortedProducts.length} amazing gifts</p>
          </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search gifts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-4">
                <div>
                  <Label className="mb-2 block">Price Range</Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="under500">Under ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                      <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                      <SelectItem value="above2000">Above ₹2000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  onClick={() => handleProductClick(product)}
                />
                {product.discount && (
                  <Badge className="absolute top-3 left-3 bg-red-500">
                    {product.discount}% OFF
                  </Badge>
                )}
                {product.customizable && (
                  <Badge className="absolute top-3 right-3 bg-purple-500">
                    Customizable
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlistToggle(product);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </Button>
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2 text-xs">
                  {product.category}
                </Badge>
                <h3
                  className="font-semibold mb-2 line-clamp-2 hover:text-purple-600"
                  onClick={() => handleProductClick(product)}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-purple-600">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleProductClick(product)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found matching your criteria</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Images */}
              <div>
                <img
                  src={selectedProduct.images[selectedImage]}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProduct.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${selectedProduct.name} ${idx + 1}`}
                      className={`h-20 w-20 object-cover rounded cursor-pointer ${
                        selectedImage === idx ? 'ring-2 ring-purple-600' : ''
                      }`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <Badge className="mb-2">{selectedProduct.category}</Badge>
                <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-purple-600">
                    ₹{selectedProduct.price}
                  </span>
                  {selectedProduct.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ₹{selectedProduct.originalPrice}
                      </span>
                      <Badge className="bg-red-500">{selectedProduct.discount}% OFF</Badge>
                    </>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                {/* Color Selection */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="mb-4">
                    <Label className="mb-2 block">Select Color</Label>
                    <div className="flex gap-2">
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border rounded-lg ${
                            selectedColor === color
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="mb-4">
                    <Label className="mb-2 block">Select Size</Label>
                    <div className="flex gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg ${
                            selectedSize === size
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.customizable && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">Customization Available</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Add custom text, upload your photo, and personalize this gift (+20% fee)
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button className="flex-1" onClick={handleAddToCart}>
                    {selectedProduct.customizable ? 'Customize & Add' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleWishlistToggle(selectedProduct)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isInWishlist(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Customization Modal */}
      <Dialog open={showCustomization} onOpenChange={setShowCustomization}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customize Your Gift</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Custom Text */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Type className="h-4 w-4" />
                Add Custom Text
              </Label>
              <Textarea
                placeholder="Enter your custom message (e.g., Happy Birthday, John!)"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={3}
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <Upload className="h-4 w-4" />
                Upload Custom Image
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {customImage && (
                <div className="mt-3 relative">
                  <img
                    src={customImage}
                    alt="Custom upload"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setCustomImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Preview</h4>
              <div className="bg-white rounded-lg p-4 border">
                {customImage && (
                  <img src={customImage} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />
                )}
                {customText && (
                  <p className="text-lg font-medium text-purple-600">{customText}</p>
                )}
                {!customImage && !customText && (
                  <p className="text-gray-400 text-sm">Your customization will appear here</p>
                )}
              </div>
            </div>

            {/* Price Info */}
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span>Base Price:</span>
                <span className="font-semibold">₹{selectedProduct?.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-purple-600">
                <span>Customization Fee (20%):</span>
                <span>₹{selectedProduct ? Math.round(selectedProduct.price * 0.2) : 0}</span>
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between items-center font-bold">
                <span>Total:</span>
                <span className="text-purple-600">
                  ₹{selectedProduct ? Math.round(selectedProduct.price * 1.2) : 0}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowCustomization(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleCustomizationSubmit}>
                Add to Cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};
