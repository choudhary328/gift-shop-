# Project Structure - Online Gift Shop

## 📁 Directory Overview

```
online-gift-shop/
├── src/
│   ├── app/
│   │   ├── components/          # React components
│   │   │   ├── admin/          # Admin panel components
│   │   │   │   └── AdminPanel.tsx
│   │   │   ├── ui/             # Reusable UI components (shadcn/ui)
│   │   │   ├── AboutPage.tsx
│   │   │   ├── AuthPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── OrderSuccessPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   └── WishlistPage.tsx
│   │   ├── contexts/           # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   └── CartContext.tsx
│   │   ├── data/              # Mock data
│   │   │   └── mockData.ts
│   │   └── App.tsx            # Main application component
│   └── styles/                # CSS files
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
├── README.md                  # Full documentation
├── QUICKSTART.md             # Quick start guide
├── DEMO_CREDENTIALS.txt      # Demo login info
└── PROJECT_STRUCTURE.md      # This file
```

## 🗂️ Component Breakdown

### Core Pages (11 Total)

1. **AuthPage.tsx** - Login/Register with validation
2. **HomePage.tsx** - Hero, categories, featured products, testimonials
3. **ProductsPage.tsx** - Product grid, filters, search, customization
4. **AboutPage.tsx** - Company info, team, mission/vision
5. **ContactPage.tsx** - Contact form, info, FAQs
6. **CartPage.tsx** - Shopping cart with coupons
7. **CheckoutPage.tsx** - Address form, payment selection
8. **OrderSuccessPage.tsx** - Order confirmation, invoice
9. **WishlistPage.tsx** - Saved products
10. **AdminPanel.tsx** - Admin dashboard, orders, products, users
11. **App.tsx** - Main router and app shell

### Layout Components (2)

1. **Header.tsx** - Navigation, cart icon, user menu
2. **Footer.tsx** - Links, newsletter, contact info

### Context Providers (2)

1. **AuthContext.tsx** - User authentication state
2. **CartContext.tsx** - Shopping cart and wishlist state

### Data Files (1)

1. **mockData.ts** - Products, categories, testimonials

## 🎨 UI Components Used

Pre-built from `shadcn/ui`:
- Button, Input, Label, Textarea
- Card, Badge, Separator
- Dialog, Sheet, Tabs
- Select, RadioGroup
- Toaster (Sonner)

## 📊 Data Models

### User Interface
```typescript
{
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'user' | 'admin';
}
```

### Product Interface
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  customizable: boolean;
  inStock: boolean;
}
```

### Cart Item Interface
```typescript
{
  ...Product;
  quantity: number;
  customization?: {
    text?: string;
    image?: string;
    color?: string;
    size?: string;
  };
}
```

### Order Interface
```typescript
{
  orderId: string;
  userId: string;
  items: CartItem[];
  total: number;
  deliveryAddress: {
    fullName: string;
    mobile: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  status: string;
  date: string;
}
```

## 🔄 State Management

### Global State (Context API)

**AuthContext:**
- `user` - Current logged-in user
- `login()` - Authenticate user
- `register()` - Create new account
- `logout()` - Clear session
- `isAuthenticated` - Auth status

**CartContext:**
- `cart` - Cart items array
- `wishlist` - Wishlist items array
- `addToCart()` - Add item to cart
- `removeFromCart()` - Remove item
- `updateQuantity()` - Update item quantity
- `clearCart()` - Empty cart
- `addToWishlist()` - Add to wishlist
- `removeFromWishlist()` - Remove from wishlist
- `isInWishlist()` - Check if in wishlist
- `cartTotal` - Total cart value
- `cartCount` - Total items count

### Local State

Each component manages its own:
- Form inputs
- Modal visibility
- Filter/search states
- Loading states
- Error states

## 💾 Data Persistence

All data stored in browser `localStorage`:

1. **users** - Registered user accounts
2. **user** - Current logged-in user
3. **cart** - Shopping cart items
4. **wishlist** - Wishlist items
5. **orders** - Completed orders

## 🎯 Key Features by Component

### HomePage
- Hero banner with gradient background
- Category cards (5 categories)
- Featured products (4 products)
- Features showcase (3 features)
- Customer testimonials (4 reviews)
- Call-to-action sections

### ProductsPage
- Product grid (responsive)
- Search functionality
- Category filter
- Price range filter
- Sort options (price, rating)
- Product detail modal
- Customization modal
- Add to cart/wishlist

### CartPage
- Item list with images
- Quantity controls (+/-)
- Remove items
- Customization details
- Coupon code input
- Price breakdown
- Free delivery threshold
- Checkout button

### CheckoutPage
- Delivery address form
- Form validation
- Payment method selection (5 options)
- Order summary
- Place order button
- Processing state

### AdminPanel
- Statistics dashboard (4 cards)
- Orders tab with status updates
- Products tab with CRUD operations
- Users tab with user list

## 🛣️ Routing System

Client-side routing using state:

```typescript
type Page = 
  | 'login'
  | 'home'
  | 'products'
  | 'about'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'wishlist'
  | 'admin';
```

**Protected Routes:**
All pages except 'login' require authentication.

**Admin Route:**
Only accessible to users with role = 'admin'.

## 🎨 Styling Approach

- **Tailwind CSS v4** for utility classes
- **Custom theme** in theme.css
- **Responsive design** with mobile-first
- **Gradient backgrounds** for visual appeal
- **Consistent color scheme** (purple/pink)
- **Smooth transitions** and animations

## 📦 Dependencies

Key packages:
- React 18.3.1
- TypeScript
- Tailwind CSS 4.x
- Radix UI components
- Lucide React (icons)
- Sonner (toasts)
- React Hook Form
- Recharts (for admin dashboard)

## 🔐 Security Features (UI)

- Password validation (min 6 chars)
- Email format validation
- Mobile number validation (10 digits)
- Pincode validation (6 digits)
- Protected route checks
- Admin role verification

## 🚀 Performance Optimizations

- Context API for efficient state management
- Conditional rendering
- Lazy loading of images
- Minimal re-renders
- LocalStorage for persistence
- Optimized component structure

## 📱 Responsive Breakpoints

```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

## 🎯 User Flow Diagram

```
Login/Register
     ↓
  Home Page
     ↓
Browse Products ←→ Search/Filter
     ↓
Product Details
     ↓
Customize (if applicable)
     ↓
Add to Cart ←→ Add to Wishlist
     ↓
View Cart
     ↓
Apply Coupon (optional)
     ↓
Checkout
     ↓
Enter Delivery Details
     ↓
Select Payment Method
     ↓
Place Order
     ↓
Order Success
     ↓
Download Invoice
```

## 🔧 Development Notes

- All components are TypeScript
- Strict type checking enabled
- Consistent naming conventions
- Component-based architecture
- Reusable UI components
- Mock data for demonstration
- No actual backend required
- Browser storage for state

## 📝 Future Enhancements (If Extended)

- Real backend API integration
- Actual payment gateway
- Email/SMS notifications
- Order tracking
- Product reviews system
- Advanced search
- Price comparison
- Social sharing
- Multiple addresses
- Order history page

---

**This is a complete UI demonstration project showcasing modern e-commerce features with a beautiful, responsive design.**
