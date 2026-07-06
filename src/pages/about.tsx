import { motion } from 'motion/react';
import { Award, Users, Factory, Globe, CheckCircle, Target, Zap } from 'lucide-react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MILESTONES = [
  { year: '1976', title: 'Founded', desc: 'Pyrotech Group was established by four technocrats with a vision to engineer world-class control and automation equipment.' },
  { year: '1999', title: 'Rajiv Gandhi National Quality Award', desc: 'Recognised with the prestigious Rajiv Gandhi National Quality Award for excellence in manufacturing.' },
  { year: '2007', title: 'Jamnalal Bajaj Award', desc: 'Received the Jamnalal Bajaj Award for Fair Business Practices, cementing our commitment to ethical operations.' },
  { year: '2011', title: 'D&B Axis Bank Gaurav Award', desc: 'Honoured with the D&B Axis Bank Gaurav Award for outstanding business performance.' },
  { year: '2024', title: '50+ Years & Going Strong', desc: 'Over five decades of engineering excellence, serving 30+ countries and delivering 1000+ projects worldwide.' },
];

const VALUES = [
  { icon: Award, title: 'Engineering Excellence', desc: 'Every system we design is guided by a commitment to precision, safety, and long-term reliability.' },
  { icon: Users, title: 'Customer Centric', desc: 'We listen, adapt, and improve constantly. Your project success is our success.' },
  { icon: Factory, title: 'In-House Engineering', desc: 'Complete in-house engineering solutions — from a single prototype to fully finished and assembled products.' },
  { icon: Globe, title: 'Global Reach', desc: 'Serving 30+ countries with solutions that meet international quality and safety standards.' },
  { icon: Target, title: 'Quality Management', desc: 'ISO 9001, EMS 14001 & OHSAS 18001 certified. Data-driven engineering and proactive quality management.' },
  { icon: Zap, title: 'Innovation', desc: 'Continuously upgrading technology, quality, and skills to match global vision and industrial demands.' },
];

const INDUSTRIES = [
  'Automation Industries', 'Cement Industries', 'Consumer Industries', 'Defence Industries',
  'Glass Industries', 'Nuclear Industries', 'OEMs Industries', 'Petrochemical Industries',
  'Power Industries', 'Steel Industries',
];

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us — Pyrotech Electronics</title>
        <meta name="description" content="Pyrotech Group — established 1976, ISO 9001 certified, Rajiv Gandhi National Quality Award winner. Leading manufacturer of Automation & Control Equipment in India." />
      </Helmet>

      <div>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)' }} className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-orange-500 translate-x-1/2 -translate-y-1/2" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <p className="text-orange-400 font-semibold uppercase tracking-widest text-sm mb-4">About Us</p>
                <h1 className="text-5xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Engineering Strength for<br />
                  <span className="text-orange-400">Modern Industry</span>
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  Pyrotech Group was established by four technocrats in 1976. In the journey of over four decades, we have expanded to match global vision and progressed steadily through up-gradation of technology, quality, and skills.
                </p>
                <Link to="/contact">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-5">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: '50+', label: 'Years of Experience' },
                  { value: '1000+', label: 'Projects Delivered' },
                  { value: '30+', label: 'Countries Served' },
                  { value: '99.8%+', label: 'Operational Reliability' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/10 rounded-2xl p-6 text-center border border-white/10">
                    <p className="text-3xl font-black text-orange-400 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                    <p className="text-slate-300 text-sm">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-black text-slate-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  Who We Are
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Pyrotech Electronics Pvt. Ltd. Unit#2 is an <strong>ISO 9001, EMS 14001 &amp; OHSAS 18001</strong> company and recipient of the Rajiv Gandhi National Quality Award – 1999, Jamnalal Bajaj Award for Fair Business Practices – 2007, and D&amp;B Axis Bank Gaurav Award – 2011.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Today, we are the leading manufacturer of Automation &amp; Control Equipment and one of the largest customised Control Equipment manufacturing companies in India. With the technical prowess accumulated over years of experience, we provide complete in-house engineering solutions — working together seamlessly to handle your project from a single prototype to fully finished and assembled products.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  One of the major success factors for our growth is the way people are selected, trained, organised, and motivated. Customised training programs continuously help acquire knowledge &amp; skills.
                </p>
                <ul className="space-y-3">
                  {[
                    'ISO 9001 Certified',
                    'EMS 14001 Certified',
                    'OHSAS 18001 Certified',
                    'Rajiv Gandhi National Quality Award – 1999',
                    'Jamnalal Bajaj Award for Fair Business Practices – 2007',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-6">Our Journey</h3>
                <div className="space-y-6">
                  {MILESTONES.map((m, i) => (
                    <div key={m.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                          <span className="text-white text-xs font-bold">{m.year.slice(2)}</span>
                        </div>
                        {i < MILESTONES.length - 1 && <div className="w-0.5 flex-1 bg-orange-200 mt-2" />}
                      </div>
                      <div className="pb-6">
                        <p className="font-bold text-slate-800">{m.year} — {m.title}</p>
                        <p className="text-slate-500 text-sm mt-1">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20" style={{ background: '#1a1a2e' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Our Mission</h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  At Pyrotech, our mission is to empower businesses with innovative automation solutions that ensure stability, efficiency, and productivity. We believe in data-driven engineering and proactive quality management to help you stay ahead in an ever-evolving industrial landscape.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-4xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Our Commitment</h2>
                <p className="text-slate-300 leading-relaxed">
                  We are committed to delivering solutions that meet the highest standards of quality, reliability, and performance. Every project we undertake is driven by a focus on precision engineering, timely execution, and long-term operational efficiency.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Our Core Values</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Our core values are rooted in engineering excellence, reliability, and a deep understanding of industrial operations.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-white p-6 rounded-2xl border border-slate-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
                    <p className="text-slate-500 text-sm">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Trusted Across Industrial Ecosystems
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                From heavy engineering to high-performance process industries, Pyrotech's expertise spans multiple sectors. Our ability to customize, integrate, and execute complex automation solutions enables industries to operate efficiently and confidently.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map((ind, i) => (
                <motion.span
                  key={ind}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors cursor-default"
                >
                  {ind}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-orange-500">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Discuss Your Industrial Equipment Needs
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Tell us about your project and our engineering team will help you identify the right equipment or custom solution.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-10 py-6 text-base">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
