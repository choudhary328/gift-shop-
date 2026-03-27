import { Product } from '../contexts/CartContext';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Gift Box Set',
    description: 'Elegant gift box with assorted chocolates, premium tea, and gourmet cookies. Perfect for any occasion.',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.8,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1640253621150-d75179c58838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY3NDE1MzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Birthday Gifts',
    images: [
      'https://images.unsplash.com/photo-1640253621150-d75179c58838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY3NDE1MzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1601307666167-910027240bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwd3JhcCUyMHJpYmJvbnxlbnwxfHx8fDE3Njc0OTI2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    customizable: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Colorful Birthday Gift Hamper',
    description: 'Vibrant birthday gift hamper with balloons, party accessories, and sweet treats.',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.6,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1615201768474-4eb0a93e361d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGdpZnQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3Njc0OTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Birthday Gifts',
    images: [
      'https://images.unsplash.com/photo-1615201768474-4eb0a93e361d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGdpZnQlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3Njc0OTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    colors: ['Red', 'Blue', 'Pink', 'Yellow'],
    customizable: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Romantic Anniversary Flowers',
    description: 'Beautiful bouquet of fresh roses with anniversary card. Express your love with this stunning arrangement.',
    price: 1599,
    originalPrice: 2199,
    discount: 27,
    rating: 4.9,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1766983261432-bb15cda3cb65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm5pdmVyc2FyeSUyMGZsb3dlcnMlMjByb21hbnRpY3xlbnwxfHx8fDE3Njc0OTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Anniversary Gifts',
    images: [
      'https://images.unsplash.com/photo-1766983261432-bb15cda3cb65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbm5pdmVyc2FyeSUyMGZsb3dlcnMlMjByb21hbnRpY3xlbnwxfHx8fDE3Njc0OTI2Njh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    customizable: true,
    inStock: true
  },
  {
    id: '4',
    name: 'Personalized Photo Frame',
    description: 'Custom photo frame with your cherished memories. Add your photo and custom text.',
    price: 499,
    originalPrice: 799,
    discount: 38,
    rating: 4.7,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1590298456693-c6f49345bdbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21pemVkJTIwZ2lmdCUyMHBob3RvfGVufDF8fHx8MTc2NzQ5MjY2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Customized Gifts',
    images: [
      'https://images.unsplash.com/photo-1590298456693-c6f49345bdbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21pemVkJTIwZ2lmdCUyMHBob3RvfGVufDF8fHx8MTc2NzQ5MjY2OHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    sizes: ['Small', 'Medium', 'Large'],
    customizable: true,
    inStock: true
  },
  {
    id: '5',
    name: 'Elegant Corporate Gift Set',
    description: 'Premium corporate gift set with leather notebook, pen, and business card holder.',
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.8,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1759563874745-47e35c0a9572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBnaWZ0JTIwZWxlZ2FudHxlbnwxfHx8fDE3Njc0OTI2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Corporate Gifts',
    images: [
      'https://images.unsplash.com/photo-1759563874745-47e35c0a9572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBnaWZ0JTIwZWxlZ2FudHxlbnwxfHx8fDE3Njc0OTI2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    customizable: true,
    inStock: true
  },
  {
    id: '6',
    name: 'Festival Decoration Gift Pack',
    description: 'Beautiful festival decoration items with traditional ornaments and lights.',
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    rating: 4.5,
    reviews: 289,
    image: 'https://images.unsplash.com/photo-1729153823533-6731bd4ecf21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGdpZnRzJTIwZGVjb3JhdGlvbnxlbnwxfHx8fDE3Njc0OTI2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Festival Gifts',
    images: [
      'https://images.unsplash.com/photo-1729153823533-6731bd4ecf21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGdpZnRzJTIwZGVjb3JhdGlvbnxlbnwxfHx8fDE3Njc0OTI2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    customizable: false,
    inStock: true
  },
  {
    id: '7',
    name: 'Luxury Gift Wrap Collection',
    description: 'Premium gift wrapping materials with ribbons, bows, and decorative papers.',
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.4,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1601307666167-910027240bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwd3JhcCUyMHJpYmJvbnxlbnwxfHx8fDE3Njc0OTI2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Gift Accessories',
    images: [
      'https://images.unsplash.com/photo-1601307666167-910027240bcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwd3JhcCUyMHJpYmJvbnxlbnwxfHx8fDE3Njc0OTI2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    customizable: false,
    inStock: true
  },
  {
    id: '8',
    name: 'Personalized Coffee Mug',
    description: 'Custom printed coffee mug with your photo and text. Perfect gift for loved ones.',
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.6,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1705952297177-619746d21f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbGl6ZWQlMjBtdWclMjBnaWZ0fGVufDF8fHx8MTc2NzQ1MTgzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Customized Gifts',
    images: [
      'https://images.unsplash.com/photo-1705952297177-619746d21f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbGl6ZWQlMjBtdWclMjBnaWZ0fGVufDF8fHx8MTc2NzQ1MTgzNHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    colors: ['White', 'Black', 'Red', 'Blue'],
    customizable: true,
    inStock: true
  }
];

export const categories = [
  {
    id: 'birthday',
    name: 'Birthday Gifts',
    icon: '🎂',
    description: 'Perfect gifts for birthday celebrations'
  },
  {
    id: 'anniversary',
    name: 'Anniversary Gifts',
    icon: '💝',
    description: 'Romantic gifts for special anniversaries'
  },
  {
    id: 'customized',
    name: 'Customized Gifts',
    icon: '🎨',
    description: 'Personalized gifts with your touch'
  },
  {
    id: 'corporate',
    name: 'Corporate Gifts',
    icon: '💼',
    description: 'Professional gifts for business occasions'
  },
  {
    id: 'festival',
    name: 'Festival Gifts',
    icon: '🎊',
    description: 'Traditional gifts for festive occasions'
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Amazing quality and fast delivery! The customized photo frame was perfect for my anniversary.',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    rating: 5,
    comment: 'Excellent service! The corporate gift set was exactly what I needed for my clients.',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Anita Patel',
    rating: 4,
    comment: 'Great collection of gifts. The birthday hamper was a hit at the party!',
    date: '2024-01-05'
  },
  {
    id: '4',
    name: 'Vikram Singh',
    rating: 5,
    comment: 'Best gift shop! Love the customization options and the quality is top-notch.',
    date: '2023-12-28'
  }
];
