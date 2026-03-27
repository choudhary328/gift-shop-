import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock form submission
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['1800-123-4567', '+91 98765 43210'],
      description: 'Mon-Sat, 9 AM - 6 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@onlinegiftshop.com', 'info@onlinegiftshop.com'],
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Gift Street, Shopping Complex', 'Mumbai, Maharashtra 400001, India'],
      description: 'Visit our store'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Saturday: 9 AM - 6 PM', 'Sunday: Closed'],
      description: 'We\'re here to help'
    }
  ];

  const faqs = [
    {
      question: 'What are your delivery charges?',
      answer: 'Free delivery on orders above ₹999. For orders below ₹999, delivery charge is ₹50.'
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes! Order before 2 PM for same-day delivery in major cities like Mumbai, Delhi, Bangalore, and more.'
    },
    {
      question: 'Can I customize any gift?',
      answer: 'Most of our products can be customized with text, photos, and special messages. Look for the "Customizable" badge on product pages.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, Wallets, and Cash on Delivery.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer easy returns within 7 days of delivery. Customized items are not eligible for return unless damaged.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-12 mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 mb-1">{detail}</p>
                ))}
                <p className="text-sm text-gray-500 mt-2">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">Visit Our Store</p>
                    <p className="text-sm text-gray-600">123 Gift Street, Mumbai</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Support */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">WhatsApp Support</h3>
                    <p className="text-gray-700 mb-3">
                      Get instant help on WhatsApp. Our team is available to assist you.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button className="text-purple-600 hover:underline block">
                    Track Your Order
                  </button>
                  <button className="text-purple-600 hover:underline block">
                    Shipping Information
                  </button>
                  <button className="text-purple-600 hover:underline block">
                    Return & Refund Policy
                  </button>
                  <button className="text-purple-600 hover:underline block">
                    Terms & Conditions
                  </button>
                  <button className="text-purple-600 hover:underline block">
                    Privacy Policy
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
