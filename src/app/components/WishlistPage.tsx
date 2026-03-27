import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface WishlistPageProps {
  onNavigate: (page: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId);
    toast.info('Item removed from wishlist');
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <Card className="max-w-md w-full text-center p-8">
          <div className="h-24 w-24 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-6">
            Add items you love to your wishlist for later!
          </p>
          <Button onClick={() => onNavigate('products')}>
            Browse Products
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">{wishlist.length} item(s) saved</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => onNavigate('products')}
                />
                {product.discount && (
                  <Badge className="absolute top-3 left-3 bg-red-500">
                    {product.discount}% OFF
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-3 right-3"
                  onClick={() => handleRemove(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
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
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
