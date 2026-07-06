import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'motion/react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQty, total } = useCartStore();
  const navigate = useNavigate();
  const cartTotal = total();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ background: '#1a1a2e' }}>
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-orange-400" />
                <h2 className="text-white font-semibold text-lg">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="h-16 w-16 text-slate-200" />
                  <div>
                    <p className="text-slate-700 font-semibold text-lg">Your cart is empty</p>
                    <p className="text-slate-400 text-sm mt-1">Add some products to get started</p>
                  </div>
                  <Button
                    className="bg-orange-500 hover:bg-orange-600 text-white mt-2"
                    onClick={() => { closeCart(); navigate('/products'); }}
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 py-4 border-b border-slate-100">
                      {/* Product image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-800 font-medium text-sm leading-tight line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.product.category}</p>
                        <p className="text-orange-500 font-bold mt-1">
                          ₹{item.product.price.toLocaleString('en-IN')}
                        </p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-auto text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t bg-slate-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-500 text-sm">Subtotal</span>
                  <span className="text-slate-800 font-bold text-lg">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">Taxes and shipping calculated at checkout</p>
                <Separator className="mb-4" />
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 text-base"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="ghost"
                  className="w-full mt-2 text-slate-500 hover:text-slate-700"
                  onClick={closeCart}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
