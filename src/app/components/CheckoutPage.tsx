import React, { useState } from 'react';
import { CreditCard, MapPin, Phone, Mail, User, Building, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  // Address State
  const [fullName, setFullName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCharge = cartTotal > 999 ? 0 : 50;
  const tax = Math.round(cartTotal * 0.05);
  const finalTotal = cartTotal + tax + deliveryCharge;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName || !mobile || !email || !address || !city || !state || !pincode) {
      toast.error('Please fill in all delivery details');
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD${Date.now()}`;
      
      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        orderId,
        userId: user?.id,
        items: cart,
        total: finalTotal,
        deliveryAddress: {
          fullName,
          mobile,
          email,
          address,
          city,
          state,
          pincode
        },
        paymentMethod,
        status: 'Confirmed',
        date: new Date().toISOString()
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      setIsProcessing(false);
      
      // Navigate to order confirmation
      onNavigate(`order-success?orderId=${orderId}`);
      
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (cart.length === 0) {
    onNavigate('cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="mobile"
                          type="tel"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="pl-10"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address (House No, Building, Street) *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <div className="flex-1">
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard, Rupay</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="upi" id="upi" />
                        <div className="flex-1">
                          <p className="font-medium">UPI</p>
                          <p className="text-sm text-gray-500">Google Pay, PhonePe, Paytm</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <div className="flex-1">
                          <p className="font-medium">Net Banking</p>
                          <p className="text-sm text-gray-500">All major banks</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <div className="flex-1">
                          <p className="font-medium">Wallet</p>
                          <p className="text-sm text-gray-500">Paytm, PhonePe, Amazon Pay</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="cod" id="cod" />
                        <div className="flex-1">
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when you receive</p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
                      This is a demo - no actual payment will be processed.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          {item.customization && (
                            <p className="text-xs text-purple-600">Customized</p>
                          )}
                        </div>
                        <p className="font-medium">
                          ₹{(item.customization ? Math.round(item.price * 1.2) : item.price) * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (5%)</span>
                      <span className="font-medium">₹{tax}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery</span>
                      {deliveryCharge === 0 ? (
                        <span className="font-medium text-green-600">FREE</span>
                      ) : (
                        <span className="font-medium">₹{deliveryCharge}</span>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-purple-600">
                      ₹{finalTotal}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    By placing this order, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
