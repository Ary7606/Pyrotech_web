import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'motion/react';
import { ShoppingBag, CreditCard, MessageSquare, CheckCircle, ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useCartStore, useAuthStore, useOrderStore } from '@/lib/store';
import { toast } from 'sonner';
import { Helmet } from '@dr.pogodin/react-helmet';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(10, 'Full address required'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type PaymentMethod = 'razorpay' | 'enquiry';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart, removeFromCart } = useCartStore();
  const { currentUser } = useAuthStore();
  const { addOrder } = useOrderStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  const cartTotal = total();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setLoading(true);

    if (paymentMethod === 'razorpay') {
      // Simulate Razorpay payment (in production, integrate real Razorpay SDK)
      await new Promise((r) => setTimeout(r, 1500));
      const order = addOrder({
        userId: currentUser?.id || null,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        items: [...items],
        total: cartTotal,
        status: 'paid',
        address: data.address,
        message: data.message,
      });
      clearCart();
      setOrderId(order.id);
      setOrderPlaced(true);
    } else {
      // Enquiry
      await new Promise((r) => setTimeout(r, 800));
      const order = addOrder({
        userId: currentUser?.id || null,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        items: [...items],
        total: cartTotal,
        status: 'enquiry',
        address: data.address,
        message: data.message,
      });
      clearCart();
      setOrderId(order.id);
      setOrderPlaced(true);
    }

    setLoading(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-10 max-w-md w-full text-center shadow-lg border border-slate-100"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {paymentMethod === 'razorpay' ? 'Order Placed!' : 'Enquiry Submitted!'}
          </h1>
          <p className="text-slate-500 mb-2">
            {paymentMethod === 'razorpay'
              ? 'Your payment was successful. We\'ll process your order shortly.'
              : 'We\'ve received your enquiry. Our team will contact you within 24 hours.'}
          </p>
          <p className="text-sm text-slate-400 mb-8">Order ID: <span className="font-mono font-semibold text-slate-700">{orderId}</span></p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
            {currentUser && (
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => navigate('/orders')}
              >
                View Orders
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <ShoppingBag className="h-16 w-16 text-slate-200" />
        <p className="text-slate-500 text-lg">Your cart is empty</p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout — Pyrotech Electronics</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <div style={{ background: '#1a1a2e' }} className="py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>Checkout</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Button
            variant="ghost"
            className="mb-6 gap-2 text-slate-500 hover:text-slate-800"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Cart
          </Button>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: Form */}
              <div className="lg:col-span-3 space-y-6">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-800 text-lg mb-5">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" {...register('name')} className="mt-1" placeholder="Rahul Sharma" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" {...register('phone')} className="mt-1" placeholder="+91 98765 43210" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" {...register('email')} className="mt-1" placeholder="rahul@example.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea id="address" {...register('address')} className="mt-1" rows={3} placeholder="Flat No, Building, Street, City, State, PIN" />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="message">Special Instructions (Optional)</Label>
                      <Textarea id="message" {...register('message')} className="mt-1" rows={2} placeholder="Any special delivery instructions..." />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="font-bold text-slate-800 text-lg mb-5">Payment Method</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === 'razorpay' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className={`h-5 w-5 ${paymentMethod === 'razorpay' ? 'text-orange-500' : 'text-slate-400'}`} />
                        <span className="font-semibold text-slate-800">Pay Online</span>
                        {paymentMethod === 'razorpay' && <CheckCircle className="h-4 w-4 text-orange-500 ml-auto" />}
                      </div>
                      <p className="text-xs text-slate-500">UPI, Cards, Net Banking via Razorpay</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('enquiry')}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === 'enquiry' ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare className={`h-5 w-5 ${paymentMethod === 'enquiry' ? 'text-orange-500' : 'text-slate-400'}`} />
                        <span className="font-semibold text-slate-800">Send Enquiry</span>
                        {paymentMethod === 'enquiry' && <CheckCircle className="h-4 w-4 text-orange-500 ml-auto" />}
                      </div>
                      <p className="text-xs text-slate-500">We'll contact you to confirm and arrange payment</p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-28">
                  <h2 className="font-bold text-slate-800 text-lg mb-5">Order Summary</h2>

                  <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-sm font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-slate-400 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-800 font-semibold text-sm">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="mb-4" />

                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal ({items.length} items)</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-medium">{cartTotal >= 999 ? 'Free' : '₹99'}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>GST (18%)</span>
                      <span>₹{Math.round(cartTotal * 0.18).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-slate-800 text-lg">Total</span>
                    <span className="font-black text-slate-900 text-2xl">
                      ₹{(cartTotal + (cartTotal >= 999 ? 0 : 99) + Math.round(cartTotal * 0.18)).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 text-base"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : paymentMethod === 'razorpay' ? 'Pay Now' : 'Submit Enquiry'}
                  </Button>

                  <p className="text-xs text-slate-400 text-center mt-3">
                    By placing this order you agree to our Terms & Conditions
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
