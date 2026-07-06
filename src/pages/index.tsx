import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, Headphones, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CATEGORIES = [
{ name: 'Mobile Stands', image: '/airo-assets/images/categories/mobile-stands' },
{ name: 'Door Handles', image: '/airo-assets/images/categories/door-handles' },
{ name: 'Storage Racks', image: '/airo-assets/images/categories/storage-racks' },
{ name: 'Door Stoppers', image: '/airo-assets/images/categories/door-stoppers' },
{ name: 'Window Grips', image: '/airo-assets/images/categories/window-grips' },
{ name: 'Window Handles', image: '/airo-assets/images/categories/window-handles' },
{ name: 'Modular Furniture', image: '/airo-assets/images/categories/modular-furniture' },
{ name: 'Pen Stands', image: '/airo-assets/images/categories/pen-stands' },
{ name: 'Laptop Stands', image: '/airo-assets/images/categories/laptop-stands' },
{ name: 'Dustbins', image: '/airo-assets/images/categories/dustbins' },
{ name: 'Lighting Panels', image: '/airo-assets/images/categories/lighting-panels' },
{ name: 'Distribution Panel', image: '/airo-assets/images/categories/distribution-panel' },
{ name: 'Standard Junction Box', image: '/airo-assets/images/categories/standard-junction-box' },
{ name: 'Wired Junction Box', image: '/airo-assets/images/categories/wired-junction-box' },
{ name: 'Populated Junction Box', image: '/airo-assets/images/categories/populated-junction-box' },
{ name: 'Switchgear Components', image: '/airo-assets/images/categories/switchgear-components' },
];


const TESTIMONIALS = [
{ name: 'Rahul Sharma', city: 'Mumbai', rating: 5, text: 'Excellent quality door handles. Installed them in my new flat and they look absolutely premium. Very happy with the purchase!' },
{ name: 'Priya Nair', city: 'Bengaluru', rating: 5, text: 'The laptop stand is a game changer for my work from home setup. Solid build, easy to adjust, and great value for money.' },
{ name: 'Amit Patel', city: 'Ahmedabad', rating: 4, text: 'Ordered the 5-tier storage rack for my garage. Assembly was straightforward and it holds a lot of weight. Highly recommend.' },
{ name: 'Sneha Reddy', city: 'Hyderabad', rating: 5, text: 'The modular wardrobe system is fantastic. Delivery was fast and the quality is top-notch. Will definitely order again.' }];


const WHY_US = [
{ icon: ShieldCheck, title: 'Premium Quality', desc: 'Every product is crafted from high-grade materials — stainless steel, aluminum, and marine-grade wood.' },
{ icon: Truck, title: 'Pan-India Delivery', desc: 'Fast and reliable shipping to all major cities and towns across India. Free delivery on orders above ₹999.' },
{ icon: Headphones, title: '24/7 Support', desc: 'Our customer support team is always ready to help you with product queries, installation, and after-sales service.' },
{ icon: Award, title: '5-Year Warranty', desc: 'We stand behind our products. Most items come with a 5-year manufacturer warranty for your peace of mind.' }];


export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className="absolute inset-0">
          <img src="/airo-assets/images/pages/home/hero" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 border-4 border-orange-400" />
        <div className="absolute bottom-10 right-40 w-32 h-32 rounded-full opacity-10 bg-orange-500" />
        <div className="absolute top-1/2 left-0 w-1 h-40 bg-orange-500 opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-6 text-sm px-4 py-1.5">
                🇮🇳 Made in India — Trusted by 50,000+ Homes
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}><br /><span className="text-orange-400">for Modern Homes</span>



            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed">
              
              From door handles to laptop stands — discover 200+ premium hardware products engineered for durability and designed for style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4">
              
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 text-base gap-2" onClick={() => navigate('/products')}>
                Shop Now <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base" onClick={() => navigate('/about')}>
                About Us
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/10">
              
              {[
              { value: '200+', label: 'Products' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '15+', label: 'Years Experience' },
              { value: '5★', label: 'Avg Rating' }].
              map((stat) =>
              <div key={stat.label}>
                  <p className="text-3xl font-black text-orange-400" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Shop by Category
            </h2>
            <p className="text-slate-500 text-lg">Find exactly what you need from our wide range of hardware products</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) =>
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}>
              
                <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-0 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-200 group overflow-hidden">
                
                  <div className="w-full h-32 overflow-hidden">
                    <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  
                  </div>
                  <div className="px-3 py-3 text-center">
                    <span className="text-slate-700 font-semibold text-sm leading-tight group-hover:text-orange-500 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#1a1a2e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Why Choose Pyrotech?
            </h2>
            <p className="text-slate-400 text-lg">Built on trust, quality, and customer satisfaction</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                  
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>);

            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              What Our Customers Say
            </h2>
            <p className="text-slate-500">Trusted by thousands of happy customers across India</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) =>
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) =>
                <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                )}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Browse 200+ premium hardware products. Free delivery on orders above ₹999.
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-10 py-6 text-base"
            onClick={() => navigate('/products')}>
            
            Shop Now <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
    </main>);

}