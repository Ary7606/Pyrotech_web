import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const categories = [
    'Mobile Stands', 'Door Handles', 'Storage Racks', 'Door Stoppers', 'Window Grips',
    'Window Handles', 'Modular Furniture', 'Pen Stands', 'Laptop Stands', 'Dustbins',
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Admin Login', href: '/admin/login' },
  ];

  return (
    <footer style={{ background: '#0d0d1a' }} className="text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img
                src="/assets/screenshot-2026-06-10T05-02-01.jpg"
                alt="Pyrotech"
                className="h-12 w-auto object-contain shrink-0 mb-4"
                style={{ mixBlendMode: 'lighten' }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Leading manufacturer of Automation &amp; Control Equipment. One of the largest customised Control Equipment manufacturing companies in India. Established 1976.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 7).map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm hover:text-orange-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-sm">Mewar Industrial Area, Madri, Udaipur, Rajasthan, India</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <a href="https://wa.me/+919717677748" className="block hover:text-orange-400 transition-colors">+91 9717677748 (WhatsApp)</a>
                  <a href="tel:+919116643376" className="block hover:text-orange-400 transition-colors">+91 9116643376</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-orange-400 shrink-0" />
                <a href="mailto:pyrotech@pyrotechindia.com" className="text-sm hover:text-orange-400 transition-colors">
                  pyrotech@pyrotechindia.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-slate-500 mb-1">Business Hours</p>
              <p className="text-sm text-slate-300">Mon – Sat: 9:00 AM – 6:00 PM</p>
              <p className="text-xs text-slate-500 mt-1">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">© 2026 Pyrotech Electronics Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
