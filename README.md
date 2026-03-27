# Online Gift Shop - E-commerce UI

A beautiful, modern, and fully responsive gift shop e-commerce website built with React, TypeScript, and Tailwind CSS.

## 🎁 Features

### User Features
- **Authentication System**: Register/Login with email validation and password security
- **Protected Routes**: All pages require authentication
- **Product Catalog**: Browse 8+ gift products across 5 categories
- **Product Customization**: Add custom text, upload images, select colors/sizes
- **Shopping Cart**: Add/remove items, adjust quantities, apply coupons
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Complete order flow with delivery address and payment options
- **Order Confirmation**: Success page with order details and invoice download
- **Search & Filters**: Search products, filter by category and price range
- **Responsive Design**: Mobile-first design, works on all devices

### Gift Categories
- 🎂 Birthday Gifts
- 💝 Anniversary Gifts
- 🎨 Customized Gifts
- 💼 Corporate Gifts
- 🎊 Festival Gifts

### Admin Panel
- Dashboard with statistics
- Manage products (view, edit, delete)
- View all orders with status updates
- User management
- Access via: admin@giftshop.com / admin123

## 📄 Pages

1. **Home Page**
   - Hero banner with offers
   - Category cards
   - Featured products
   - Features section
   - Customer testimonials
   - Call-to-action sections

2. **Products Page**
   - Product grid with images
   - Search and filter functionality
   - Sort options (price, rating, featured)
   - Product detail modal
   - Customization modal for personalized gifts

3. **About Page**
   - Company story
   - Statistics
   - Features & benefits
   - Team section
   - Mission & Vision

4. **Contact Page**
   - Contact information
   - Contact form
   - FAQs section
   - Location map placeholder
   - WhatsApp support

5. **Cart Page**
   - Cart items with customization details
   - Quantity controls
   - Coupon code application
   - Price breakdown
   - Order summary

6. **Checkout Page**
   - Delivery address form
   - Payment method selection (Card, UPI, Net Banking, Wallet, COD)
   - Order summary
   - Secure payment information

7. **Order Success Page**
   - Order confirmation
   - Order details
   - Email & WhatsApp notification info
   - Download invoice (TXT format)

8. **Wishlist Page**
   - Saved products
   - Add to cart from wishlist
   - Remove items

9. **Admin Panel** (Admin only)
   - Statistics dashboard
   - Orders management
   - Products management
   - Users list

## 🎨 Customization Features

Products can be customized with:
- **Custom Text**: Add personalized messages
- **Image Upload**: Upload photos for printing
- **Color Selection**: Choose from available colors
- **Size Selection**: Select appropriate size
- **Preview**: See customization before adding to cart
- **Pricing**: +20% fee for customization

## 💳 Mock Payment Integration

Simulated payment gateway with support for:
- Credit/Debit Cards
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking
- Wallets
- Cash on Delivery

## 📧 Notifications (UI Mockup)

- **Email**: Order confirmation and invoice
- **WhatsApp**: Order status updates
- **In-app**: Toast notifications for user actions

## 🔐 Demo Credentials

**Admin Access:**
- Email: admin@giftshop.com
- Password: admin123

**User Registration:**
- Register with any email/mobile
- Or create a new account

**Coupon Codes:**
- GIFT10 - 10% off
- SAVE20 - 20% off
- FIRST50 - ₹50 off

## 🛒 Shopping Features

- **Free Delivery**: On orders above ₹999
- **Tax Calculation**: Auto-calculated 5% tax
- **Delivery Charges**: ₹50 for orders below ₹999
- **Gift Wrapping**: Complimentary on all orders
- **Same-day Delivery**: Available in major cities

## 💾 Data Persistence

All data is stored in browser's localStorage:
- User accounts
- Shopping cart
- Wishlist
- Orders
- Authentication state

## 🎯 Technical Highlights

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Context API** for state management
- **Radix UI** components for accessibility
- **Lucide React** for beautiful icons
- **Sonner** for toast notifications
- **Form Validation** with proper error handling
- **Responsive Design** with mobile-first approach
- **Protected Routes** with authentication
- **Mock Backend** simulating real API behavior

## 🚀 Getting Started

The application is ready to use! Simply:

1. Start with the login page
2. Register a new account or use admin credentials
3. Browse products and add to cart
4. Customize gifts with personal touches
5. Complete checkout with mock payment
6. View order confirmation

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Color Scheme

- Primary: Purple (#7C3AED)
- Secondary: Pink (#EC4899)
- Success: Green
- Error: Red
- Background: Gray-50

## ⚡ Performance Features

- Image optimization with lazy loading
- Efficient state management
- Minimal re-renders
- Fast page transitions
- Optimized bundle size

## 📦 Mock Data

Includes 8 pre-configured products with:
- High-quality images from Unsplash
- Realistic pricing (₹349 - ₹2499)
- Customer ratings and reviews
- Discount percentages
- Category assignments

## 🔒 Security Features (UI)

- Password validation
- Email format validation
- Mobile number validation
- Secure payment messaging
- Protected admin routes

## 🌟 User Experience

- Smooth animations and transitions
- Clear loading states
- Helpful error messages
- Success confirmations
- Intuitive navigation
- Accessible UI components

## 📄 Invoice Generation

Mock invoice download in TXT format including:
- Order details
- Customer information
- Itemized list
- Price breakdown
- Payment method
- Order status

---

**Note**: This is a UI/Frontend demonstration. No actual payments are processed, emails are sent, or SMS/WhatsApp messages are delivered. All backend functionality is simulated using browser localStorage.
