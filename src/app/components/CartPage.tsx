import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const deliveryCharge = cartTotal > 999 ? 0 : 50;
  const tax = Math.round(cartTotal * 0.05); // 5% tax
  const finalTotal = cartTotal + tax + deliveryCharge - discount;

  const handleApplyCoupon = () => {
    const validCoupons: { [key: string]: number } = {
      'GIFT10': 10,
      'SAVE20': 20,
      'FIRST50': 50
    };

    const couponUpper = couponCode.toUpperCase();
    if (validCoupons[couponUpper]) {
      const discountPercent = validCoupons[couponUpper];
      const discountAmount = Math.round((cartTotal * discountPercent) / 100);
      setDiscount(discountAmount);
      setAppliedCoupon(couponUpper);
      toast.success(`Coupon applied! You saved ₹${discountAmount}`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <Card className="max-w-md w-full text-center p-8">
          <div className="h-24 w-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any gifts yet.
          </p>
          <Button onClick={() => onNavigate('products')}>
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cart.length} item(s) in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success('Item removed from cart');
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>

                      {/* Customization Info */}
                      {item.customization && (
                        <div className="bg-purple-50 rounded p-2 mb-2 text-sm">
                          <p className="font-medium text-purple-900 mb-1">Customization:</p>
                          {item.customization.text && (
                            <p className="text-purple-700">Text: {item.customization.text}</p>
                          )}
                          {item.customization.color && (
                            <p className="text-purple-700">Color: {item.customization.color}</p>
                          )}
                          {item.customization.size && (
                            <p className="text-purple-700">Size: {item.customization.size}</p>
                          )}
                          {item.customization.image && (
                            <p className="text-purple-700">Custom image uploaded</p>
                          )}
                          <p className="text-purple-600 font-medium mt-1">
                            +20% customization fee
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-purple-600">
                            ₹{(item.customization ? Math.round(item.price * 1.2) : item.price) * item.quantity}
                          </p>
                          {item.customization && (
                            <p className="text-xs text-gray-500">
                              ₹{item.price} × {item.quantity} + customization
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Have a coupon code?
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-900">{appliedCoupon}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button onClick={handleApplyCoupon}>
                        Apply
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Try: GIFT10, SAVE20, FIRST50
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">₹{tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    {deliveryCharge === 0 ? (
                      <span className="font-medium text-green-600">FREE</span>
                    ) : (
                      <span className="font-medium">₹{deliveryCharge}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount}</span>
                    </div>
                  )}
                </div>

                {cartTotal < 999 && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-6">
                    <p className="text-sm text-purple-900">
                      Add items worth ₹{999 - cartTotal} more for FREE delivery!
                    </p>
                  </div>
                )}

                <Separator className="my-6" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ₹{finalTotal}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => onNavigate('checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => onNavigate('products')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
