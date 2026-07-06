import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — Pyrotech Electronics</title>
        <meta name="description" content="Get in touch with Pyrotech Electronics. We're here to help with product queries, orders, and support." />
      </Helmet>

      <div>
        {/* Header */}
        <section style={{ background: '#1a1a2e' }} className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Contact Us</h1>
            <p className="text-slate-400 text-lg">We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Get in Touch</h2>
                  <div className="space-y-5">
                    {[
                      {
                        icon: MapPin,
                        title: 'Visit Us',
                        lines: ['Mewar Industrial Area, Madri', 'Udaipur, Rajasthan, India'],
                      },
                      {
                        icon: Phone,
                        title: 'Call / WhatsApp',
                        lines: ['+91 9717677748 (WhatsApp)', '+91 9116643376'],
                      },
                      {
                        icon: Mail,
                        title: 'Email Us',
                        lines: ['pyrotech@pyrotechindia.com'],
                      },
                      {
                        icon: Clock,
                        title: 'Business Hours',
                        lines: ['Mon – Sat: 9:00 AM – 6:00 PM', 'Sunday: Closed'],
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                            <Icon className="h-5 w-5 text-orange-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                            {item.lines.map((line) => (
                              <p key={line} className="text-slate-500 text-sm">{line}</p>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                      <p className="text-slate-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <h2 className="text-xl font-bold text-slate-800 mb-6">Send a Message</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" {...register('name')} className="mt-1" placeholder="Rahul Sharma" />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input id="phone" {...register('phone')} className="mt-1" placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" {...register('email')} className="mt-1" placeholder="rahul@example.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" {...register('subject')} className="mt-1" placeholder="Product inquiry, order support..." />
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea id="message" {...register('message')} className="mt-1" rows={5} placeholder="Tell us how we can help you..." />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 gap-2"
                        disabled={isSubmitting}
                      >
                        <Send className="h-5 w-5" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
