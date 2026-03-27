import React from 'react';
import { Gift, Heart, Sparkles, TrendingUp, Users, Award, Package, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export const AboutPage: React.FC = () => {
  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers' },
    { icon: Gift, value: '500+', label: 'Gift Products' },
    { icon: Package, value: '50,000+', label: 'Orders Delivered' },
    { icon: Award, value: '4.9/5', label: 'Customer Rating' }
  ];

  const features = [
    {
      icon: Gift,
      title: 'Wide Selection',
      description: 'Over 500 unique gifts for every occasion and celebration'
    },
    {
      icon: Sparkles,
      title: 'Customization',
      description: 'Personalize gifts with photos, text, and special messages'
    },
    {
      icon: TrendingUp,
      title: 'Quality Guaranteed',
      description: 'Premium quality products with 100% satisfaction guarantee'
    },
    {
      icon: Package,
      title: 'Fast Delivery',
      description: 'Same-day delivery available in major cities'
    },
    {
      icon: Heart,
      title: 'Gift Wrapping',
      description: 'Beautiful complimentary gift wrapping on all orders'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Safe and secure payment options including COD'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop'
    },
    {
      name: 'Amit Patel',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Online Gift Shop</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Making every occasion special with thoughtfully curated gifts and personalized experiences
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"></div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Founded in 2020, Online Gift Shop began with a simple mission: to help people express their 
              love and appreciation through meaningful gifts. What started as a small local shop has grown 
              into India's leading online gift destination, serving thousands of happy customers every month.
            </p>
            <p className="text-gray-700 mb-6">
              We believe that every gift tells a story and creates lasting memories. That's why we carefully 
              curate our collection to include only the finest products, from traditional gifts to modern 
              customizable options. Our team works tirelessly to ensure that each gift is crafted with care 
              and delivered with love.
            </p>
            <p className="text-gray-700">
              Today, we're proud to offer over 500 unique gift options, same-day delivery in major cities, 
              and personalization services that make every gift truly one-of-a-kind. Join our family of 
              10,000+ satisfied customers and make your next celebration unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best gift-giving experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to making your celebrations special
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-purple-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardContent className="p-8">
              <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-purple-100">
                To make gift-giving easy, meaningful, and memorable by offering a curated selection 
                of high-quality products with exceptional service and personalization options that 
                bring joy to every celebration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-600 to-pink-700 text-white">
            <CardContent className="p-8">
              <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-pink-100">
                To become India's most trusted and loved gift destination, known for quality, 
                innovation, and customer satisfaction. We envision a future where every gift 
                tells a beautiful story and creates lasting memories.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
