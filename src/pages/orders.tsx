import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore, useOrderStore } from '@/lib/store';
import { Helmet } from '@dr.pogodin/react-helmet';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  enquiry: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { getUserOrders } = useOrderStore();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4 px-4">
        <Package className="h-16 w-16 text-slate-200" />
        <h2 className="text-xl font-bold text-slate-700">Please log in to view your orders</h2>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    );
  }

  const orders = getUserOrders(currentUser.id);

  return (
    <>
      <Helmet>
        <title>My Orders — Pyrotech Electronics</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <div style={{ background: '#1a1a2e' }} className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>My Orders</h1>
            <p className="text-slate-400 mt-1">Hello, {currentUser.name.split(' ')[0]}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-4">You haven't placed any orders yet</p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => navigate('/products')}>
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-100 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-mono text-sm text-slate-500">{order.id}</p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <Badge className={STATUS_COLORS[order.status] || 'bg-slate-100 text-slate-700'}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-700 text-sm font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-slate-400 text-xs">Qty: {item.quantity} × ₹{item.product.price.toLocaleString('en-IN')}</p>
                        </div>
                        <p className="text-slate-800 font-semibold text-sm shrink-0">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-slate-500 text-sm">Total: </span>
                      <span className="font-black text-slate-900 text-lg">₹{order.total.toLocaleString('en-IN')}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-500 hover:text-orange-600 gap-1"
                      onClick={() => navigate('/products')}
                    >
                      Reorder <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
