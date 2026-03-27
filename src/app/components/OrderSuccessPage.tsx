import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Mail, MessageCircle, Home, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

interface OrderSuccessPageProps {
  onNavigate: (page: string) => void;
  orderId?: string;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ onNavigate, orderId }) => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: any) => o.orderId === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [orderId]);

  const handleDownloadInvoice = () => {
    const deliveryCharge = order?.total > 999 ? 0 : 50;
    const subtotal = order?.items.reduce((sum: number, item: any) => {
      const itemPrice = item.customization ? Math.round(item.price * 1.2) : item.price;
      return sum + (itemPrice * item.quantity);
    }, 0);
    const tax = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + tax + deliveryCharge;

    // Generate professional HTML invoice
    const invoiceHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${order?.orderId}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .invoice-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .header { border-bottom: 3px solid #9333ea; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #9333ea; font-size: 32px; margin-bottom: 5px; }
    .header p { color: #666; font-size: 14px; }
    .invoice-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .info-box { background: #f9f9f9; padding: 15px; border-radius: 8px; }
    .info-box h3 { color: #333; font-size: 14px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-box p { color: #666; font-size: 13px; line-height: 1.6; }
    table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    thead { background: #f9f9f9; }
    th, td { padding: 15px; text-align: left; border-bottom: 1px solid #e5e5e5; }
    th { color: #333; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    td { color: #666; font-size: 14px; }
    .text-right { text-align: right; }
    .summary { margin-top: 30px; }
    .summary-row { display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px; }
    .summary-row.total { border-top: 2px solid #9333ea; margin-top: 10px; padding-top: 15px; font-size: 18px; font-weight: bold; color: #9333ea; }
    .badge { display: inline-block; background: #9333ea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e5e5; text-align: center; color: #999; font-size: 12px; }
    .footer strong { color: #333; }
    @media print { body { padding: 0; background: white; } .invoice-container { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <h1>🎁 Online Gift Shop</h1>
      <p>Making every moment special with perfect gifts</p>
    </div>

    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
      <div>
        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">TAX INVOICE</h2>
        <p style="color: #666; font-size: 14px;">Invoice #: <strong>${order?.orderId}</strong></p>
        <p style="color: #666; font-size: 14px;">Date: <strong>${new Date(order?.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>
      </div>
      <div>
        <span class="badge">${order?.status.toUpperCase()}</span>
      </div>
    </div>

    <div class="invoice-info">
      <div class="info-box">
        <h3>Bill To:</h3>
        <p><strong>${order?.deliveryAddress.fullName}</strong></p>
        <p>${order?.deliveryAddress.address}</p>
        <p>${order?.deliveryAddress.city}, ${order?.deliveryAddress.state} - ${order?.deliveryAddress.pincode}</p>
        <p>Phone: ${order?.deliveryAddress.mobile}</p>
        <p>Email: ${order?.deliveryAddress.email}</p>
      </div>
      <div class="info-box">
        <h3>Shop Details:</h3>
        <p><strong>Online Gift Shop</strong></p>
        <p>123, Gift Street, Shopping Complex</p>
        <p>Mumbai, Maharashtra - 400001</p>
        <p>Phone: 1800-123-4567</p>
        <p>Email: support@onlinegiftshop.com</p>
        <p>GSTIN: 27XXXXX1234X1ZX</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Customization</th>
          <th class="text-right">Qty</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${order?.items.map((item: any) => {
          const itemPrice = item.customization ? Math.round(item.price * 1.2) : item.price;
          const itemTotal = itemPrice * item.quantity;
          return `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td>${item.customization ? '✨ Customized (+20%)' : 'Standard'}</td>
          <td class="text-right">${item.quantity}</td>
          <td class="text-right">₹${itemPrice}</td>
          <td class="text-right"><strong>₹${itemTotal}</strong></td>
        </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <div style="max-width: 350px; margin-left: auto;">
      <div class="summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>₹${subtotal}</span>
        </div>
        <div class="summary-row">
          <span>GST (5%):</span>
          <span>₹${tax}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Charges:</span>
          <span>${deliveryCharge === 0 ? '<span style="color: #16a34a;">FREE</span>' : '₹' + deliveryCharge}</span>
        </div>
        <div class="summary-row total">
          <span>Total Amount:</span>
          <span>₹${totalAmount}</span>
        </div>
      </div>

      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
        <p style="color: #666; font-size: 13px; margin-bottom: 5px;"><strong>Payment Method:</strong> ${order?.paymentMethod.toUpperCase()}</p>
        <p style="color: #666; font-size: 13px;"><strong>Payment Status:</strong> <span style="color: #16a34a;">PAID</span></p>
      </div>
    </div>

    <div class="footer">
      <p><strong>Thank you for shopping with Online Gift Shop!</strong></p>
      <p>For any queries, please contact us at support@onlinegiftshop.com or call 1800-123-4567</p>
      <p style="margin-top: 10px;">This is a computer-generated invoice and does not require a signature.</p>
    </div>
  </div>
</body>
</html>
    `;

    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${order?.orderId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Invoice downloaded successfully!');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8">
          <p className="text-gray-600">Order not found</p>
          <Button className="mt-4" onClick={() => onNavigate('home')}>
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4 animate-bounce">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Order Placed Successfully! 🎉</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="font-bold text-lg">{order.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="font-bold text-lg">
                  {new Date(order.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Delivery Address */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Delivery Address
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{order.deliveryAddress.fullName}</p>
                <p className="text-sm text-gray-600">{order.deliveryAddress.address}</p>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Phone: {order.deliveryAddress.mobile}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.customization && (
                        <p className="text-xs text-purple-600">✨ Customized</p>
                      )}
                    </div>
                    <p className="font-medium">
                      ₹{(item.customization ? Math.round(item.price * 1.2) : item.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">₹{order.total}</span>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Info */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              What's Next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Email Confirmation</p>
                  <p className="text-sm text-gray-600">
                    Order confirmation and invoice sent to {order.deliveryAddress.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp Notification</p>
                  <p className="text-sm text-gray-600">
                    Order updates sent to {order.deliveryAddress.mobile}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-gray-600">
                    Your gift will be prepared and shipped within 1-2 business days
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            size="lg"
            variant="outline"
            onClick={handleDownloadInvoice}
          >
            <Download className="mr-2 h-5 w-5" />
            Download Invoice
          </Button>
          <Button
            size="lg"
            onClick={() => onNavigate('home')}
          >
            <Home className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need help? Contact us at support@onlinegiftshop.com or call 1800-123-4567</p>
        </div>
      </div>
    </div>
  );
};
