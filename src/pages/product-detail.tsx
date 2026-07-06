import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShoppingCart, ArrowLeft, Check, Package, Truck, ShieldCheck, Minus, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useProductStore, useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { Helmet } from '@dr.pogodin/react-helmet';

// Extra images shown for specific products (product id → additional image URLs)
// Legacy fallback — new products use product.images[] directly in the store
const PRODUCT_EXTRA_IMAGES: Record<string, {src: string;label: string;}[]> = {};

export default function ProductDetailPage() {
  const { id } = useParams<{id: string;}>();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { addToCart, openCart } = useCartStore();
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500 text-lg">Product not found</p>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>);

  }

  // Use product.images[] if available, otherwise fall back to legacy PRODUCT_EXTRA_IMAGES
  const extraImages = PRODUCT_EXTRA_IMAGES[product.id] ?? [];
  const allImages: {src: string;label: string;}[] = product.images && product.images.length > 0 ?
  [
  { src: product.images[0], label: 'Product Photo' },
  ...(product.images[1] ? [{ src: product.images[1], label: 'Technical Drawing' }] : []),
  ...(product.images[2] ? [{ src: product.images[2], label: 'Bill of Materials' }] : []),
  ...product.images.slice(3).map((src, i) => ({ src, label: `Image ${i + 4}` }))] :

  [
  { src: product.image, label: 'Product Photo' },
  ...extraImages];

  const displayImg = selectedImg ?? allImages[0].src;

  const related = products.
  filter((p) => p.category === product.category && p.id !== product.id).
  slice(0, 4);

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`, {
      action: { label: 'View Cart', onClick: openCart }
    });
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  return (
    <>
      <Helmet>
        <title>{product.name} — Pyrotech Electronics</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/products" className="hover:text-orange-500 transition-colors">Products</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-orange-500 transition-colors">{product.category}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-800 font-medium truncate max-w-[200px]">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Button
            variant="ghost"
            className="mb-6 gap-2 text-slate-500 hover:text-slate-800"
            onClick={() => navigate(-1)}>
            
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-3">
              
              {/* Main image */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 aspect-square">
                <img
                  src={displayImg}
                  alt={product.name}
                  className="w-full h-full object-cover" />
                
              </div>
              {/* Thumbnails — only shown when there are extra images */}
              {allImages.length > 1 &&
              <div className="flex gap-2">
                  {allImages.map((img) =>
                <button
                  key={img.src}
                  onClick={() => setSelectedImg(img.src)}
                  className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  displayImg === img.src ? 'border-orange-500 shadow-md' : 'border-slate-200 hover:border-orange-300'}`
                  }>
                  
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] text-center py-0.5 truncate px-1">
                        {img.label}
                      </span>
                    </button>
                )}
                </div>
              }
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col">
              
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">{product.category}</Badge>
                {product.isNew && <Badge className="bg-emerald-500 text-white">New Arrival</Badge>}
                {product.stock < 10 && product.stock > 0 &&
                <Badge className="bg-red-100 text-red-700 border-red-200">Only {product.stock} left</Badge>
                }
              </div>

              <h1 className="text-3xl font-black text-slate-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, j) =>
                  <Star key={j} className={`h-5 w-5 ${j < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                  )}
                </div>
                <span className="text-slate-600 font-semibold">{product.rating}</span>
                <span className="text-slate-400 text-sm">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black" style={{ color: "#1e293b" }}>₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice > product.price &&
                <>
                    <span className="text-xl text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <Badge className="bg-orange-500 text-white text-sm">{discount}% OFF</Badge>
                  </>
                }
              </div>

              <p className="text-slate-600 leading-relaxed mb-6 font-bold">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((f) =>
                  <li key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  )}
                </ul>
              </div>

              <Separator className="mb-6" />

              {/* Qty + CTA */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-3 hover:bg-slate-50 transition-colors">
                    
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-5 py-3 font-bold text-slate-800 border-x border-slate-200">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="px-4 py-3 hover:bg-slate-50 transition-colors">
                    
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-slate-400">{product.stock} in stock</span>
              </div>

              <div className="flex gap-3 mb-8">
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 gap-2"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}>
                  
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-bold py-6"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}>
                  
                  Buy Now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                { icon: Truck, label: 'Free Delivery', sub: 'Above ₹999' },
                { icon: ShieldCheck, label: '5-Year Warranty', sub: 'On most items' },
                { icon: Package, label: 'Easy Returns', sub: '7-day policy' }].
                map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <Icon className="h-5 w-5 text-orange-500 mb-1" />
                      <p className="text-xs font-semibold text-slate-700">{badge.label}</p>
                      <p className="text-xs text-slate-400">{badge.sub}</p>
                    </div>);

                })}
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {related.length > 0 &&
          <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                Related Products
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((p) =>
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                
                    <div className="h-36 bg-slate-50 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3">
                      <p className="text-slate-800 font-semibold text-sm line-clamp-2 group-hover:text-orange-500 transition-colors">{p.name}</p>
                      <p className="text-orange-500 font-bold text-sm mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </Link>
              )}
              </div>
            </div>
          }
        </div>
      </div>
    </>);

}