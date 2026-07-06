import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, ChevronDown, ShoppingCart, Check, Package,
  Truck, ShieldCheck, Minus, Plus, FileText, Layers,
  Shield, Zap, Ruler, ArrowLeft, ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  JUNCTION_BOX_MATERIALS,
  type JBMaterial,
  type JBDimension,
} from '@/lib/junction-box-data';

// ─── Material Selector Card ───────────────────────────────────────────────────
function MaterialCard({
  material,
  selected,
  onClick,
}: {
  material: JBMaterial;
  selected: boolean;
  onClick: () => void;
}) {
  const icons: Record<string, React.ReactNode> = {
    crca: <Layers className="h-5 w-5" />,
    ss:   <Shield className="h-5 w-5" />,
    frp:  <Zap className="h-5 w-5" />,
    grp:  <Package className="h-5 w-5" />,
    pc:   <Ruler className="h-5 w-5" />,
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 cursor-pointer overflow-hidden ${
        selected
          ? 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-100'
          : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-md'
      }`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${material.color}`} />
      <div className="pl-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg text-white ${material.color}`}>
              {icons[material.id]}
            </span>
            <span className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
              {material.name}
            </span>
          </div>
          {selected && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-orange-500 text-white rounded-full p-0.5">
              <Check className="h-3.5 w-3.5" />
            </motion.span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-snug">{material.fullName}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{material.ip}</span>
          <span className="text-[11px] text-slate-400">{material.finish}</span>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Dimension Dropdown ───────────────────────────────────────────────────────
function DimensionSelector({
  dimensions,
  selected,
  onSelect,
}: {
  dimensions: JBDimension[];
  selected: JBDimension | null;
  onSelect: (d: JBDimension) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all duration-200 bg-white ${
          open ? 'border-orange-500 shadow-md shadow-orange-100'
               : selected ? 'border-orange-400 bg-orange-50' : 'border-slate-200 hover:border-orange-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="p-1.5 bg-orange-100 rounded-lg">
            <Ruler className="h-4 w-4 text-orange-600" />
          </span>
          {selected ? (
            <div className="text-left">
              <p className="font-bold text-slate-900 text-sm">{selected.label}</p>
              <p className="text-xs text-slate-500">{selected.code}</p>
            </div>
          ) : (
            <span className="text-slate-400 text-sm font-medium">Select dimensions…</span>
          )}
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-5 w-5 text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{ transformOrigin: 'top' }}
            className="absolute z-30 top-full mt-2 w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="p-2 grid grid-cols-1 gap-1 max-h-72 overflow-y-auto">
              {dimensions.map((dim) => (
                <button
                  key={dim.code}
                  onClick={() => { onSelect(dim); setOpen(false); }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                    selected?.code === dim.code ? 'bg-orange-500 text-white' : 'hover:bg-orange-50 text-slate-700'
                  }`}
                >
                  <div>
                    <p className={`font-bold text-sm ${selected?.code === dim.code ? 'text-white' : 'text-slate-900'}`}>{dim.label}</p>
                    <p className={`text-xs mt-0.5 ${selected?.code === dim.code ? 'text-orange-100' : 'text-slate-400'}`}>{dim.code}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-sm ${selected?.code === dim.code ? 'text-white' : 'text-orange-500'}`}>₹{dim.price.toLocaleString('en-IN')}</p>
                    <p className={`text-xs ${selected?.code === dim.code ? 'text-orange-100' : 'text-slate-400'}`}>{dim.stock} in stock</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Product Detail View (shown after dimension selected) ─────────────────────
function ProductDetailView({
  material,
  dim,
  onBack,
}: {
  material: JBMaterial;
  dim: JBDimension;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCartStore();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(material.image);


  const cartProduct = {
    id: dim.code,
    name: `Standard Junction Box — ${material.name} ${dim.label}`,
    category: 'Standard Junction Box' as const,
    price: dim.price,
    originalPrice: dim.price,
    description: material.description,
    features: material.features,
    stock: dim.stock,
    rating: 4.7,
    reviewCount: 0,
    isNew: false,
    isFeatured: false,
    image: material.image,
  };

  const handleAddToCart = () => {
    addToCart(cartProduct, qty);
    toast.success(`${material.name} ${dim.label} added to cart`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  const handleBuyNow = () => {
    addToCart(cartProduct, qty);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.35 }}
    >
      {/* Back to configurator */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" /> Back to configurator
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image gallery */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 aspect-square shadow-sm">
            <img
              src={activeImg}
              alt={`${material.name} Junction Box ${dim.label}`}
              className="w-full h-full object-contain p-4"
            />
          </div>
          {material.images.length > 1 && (
            <div className="flex gap-2">
              {material.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(src)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === src ? 'border-orange-500 shadow-md' : 'border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <img
                    src={src}
                    alt={i === 0 ? 'Product photo' : 'Technical drawing'}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200">Standard Junction Box</Badge>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${material.color}`}>{material.ip}</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {material.name} Junction Box
          </h1>
          <p className="text-slate-500 text-sm mb-1">{material.fullName}</p>

          {/* Specs row */}
          <div className="flex flex-wrap gap-2 mb-4 mt-2">
            {[
              { label: 'Part No.',   value: dim.code },
              { label: 'Dimensions', value: dim.label },
              { label: 'IP Rating',  value: material.ip },
              { label: 'Finish',     value: material.finish },
              ...(dim.mountingPlate ? [{ label: 'Mounting Plate', value: `${dim.mountingPlate} mm` }] : []),
              ...(dim.cgPlateCount  !== undefined ? [{ label: 'C.G. Plates', value: String(dim.cgPlateCount) }] : []),
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{s.label}</p>
                <p className="text-xs font-bold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Dimension specs */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Length', value: `${dim.l} mm` },
              { label: 'Width',  value: `${dim.w} mm` },
              { label: 'Depth',  value: `${dim.d} mm` },
            ].map((spec) => (
              <div key={spec.label} className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                <p className="text-xs text-orange-400 mb-1">{spec.label}</p>
                <p className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{spec.value}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 leading-relaxed text-sm mb-5">{material.description}</p>

          {/* Features */}
          <div className="mb-5">
            <h3 className="font-bold text-slate-800 mb-3 text-sm">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {material.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-600 text-sm">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="mb-5" />

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-slate-900">₹{dim.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-slate-400">per unit</span>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 py-3 font-bold text-slate-800 border-x border-slate-200">{qty}</span>
              <button onClick={() => setQty(Math.min(dim.stock, qty + 1))} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-slate-400">{dim.stock} in stock</span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3 mb-4">
            <span className="text-sm font-semibold text-orange-700">Total</span>
            <span className="text-xl font-black text-orange-600">₹{(dim.price * qty).toLocaleString('en-IN')}</span>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mb-6">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" className="flex-1 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white font-bold py-6" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck,       label: 'Free Delivery', sub: 'Above ₹999' },
              { icon: ShieldCheck, label: '5-Yr Warranty',  sub: 'On most items' },
              { icon: Package,     label: 'Easy Returns',   sub: '7-day policy' },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Icon className="h-5 w-5 text-orange-500 mb-1" />
                  <p className="text-xs font-semibold text-slate-700">{b.label}</p>
                  <p className="text-xs text-slate-400">{b.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Configurator View ───────────────────────────────────────────────────
function ConfiguratorView({
  onDimensionSelected,
}: {
  onDimensionSelected: (m: JBMaterial, d: JBDimension) => void;
}) {
  const [selectedMaterial, setSelectedMaterial] = useState<JBMaterial | null>(null);
  const [selectedDim, setSelectedDim] = useState<JBDimension | null>(null);

  const handleMaterialSelect = (m: JBMaterial) => {
    setSelectedMaterial(m);
    setSelectedDim(null);
  };

  const handleDimSelect = (d: JBDimension) => {
    setSelectedDim(d);
  };

  const handleConfigure = () => {
    if (selectedMaterial && selectedDim) {
      onDimensionSelected(selectedMaterial, selectedDim);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10">
      {/* Left — steps */}
      <div className="space-y-8">
        {/* Step 1 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">1</span>
            <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Choose Material</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {JUNCTION_BOX_MATERIALS.map((m) => (
              <MaterialCard
                key={m.id}
                material={m}
                selected={selectedMaterial?.id === m.id}
                onClick={() => handleMaterialSelect(m)}
              />
            ))}
          </div>
        </div>

        {/* Step 2 — revealed after material */}
        <AnimatePresence>
          {selectedMaterial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">2</span>
                <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Choose Dimensions</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-sm text-slate-500 mb-4">
                  {selectedMaterial.dimensions.length} sizes available for{' '}
                  <span className="font-semibold text-slate-700">{selectedMaterial.fullName}</span>
                </p>
                <DimensionSelector
                  dimensions={selectedMaterial.dimensions}
                  selected={selectedDim}
                  onSelect={handleDimSelect}
                />
                <AnimatePresence>
                  {selectedDim && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {[
                          { label: 'Length', value: `${selectedDim.l} mm` },
                          { label: 'Width',  value: `${selectedDim.w} mm` },
                          { label: 'Depth',  value: `${selectedDim.d} mm` },
                        ].map((spec) => (
                          <div key={spec.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                            <p className="text-xs text-slate-400 mb-1">{spec.label}</p>
                            <p className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Material description */}
        <AnimatePresence>
          {selectedMaterial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
            >
              <h3 className="font-black text-slate-900 mb-3 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                About {selectedMaterial.fullName}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-5">{selectedMaterial.description}</p>
              <Separator className="mb-5" />
              <h4 className="font-bold text-slate-800 mb-3 text-sm">Key Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedMaterial.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-600 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right — preview + CTA */}
      <div className="space-y-5">
        {/* Summary + CTA */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <h3 className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>Your Selection</h3>
          <div className="space-y-2">
            {[
              { label: 'Material',   value: selectedMaterial?.name },
              { label: 'Dimensions', value: selectedDim?.label },
              { label: 'Code',       value: selectedDim?.code },
              { label: 'IP Rating',  value: selectedMaterial?.ip },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-slate-500">{row.label}</span>
                <span className={`font-semibold ${row.value ? 'text-slate-800' : 'text-slate-300'}`}>
                  {row.value ?? '—'}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex items-baseline justify-between">
            <span className="text-slate-500 text-sm">Unit Price</span>
            {selectedDim
              ? <span className="text-3xl font-black text-slate-900">₹{selectedDim.price.toLocaleString('en-IN')}</span>
              : <span className="text-2xl font-black text-slate-300">₹ —</span>
            }
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 gap-2 text-base"
            disabled={!selectedMaterial || !selectedDim}
            onClick={handleConfigure}
          >
            View Product Details →
          </Button>

          {(!selectedMaterial || !selectedDim) && (
            <p className="text-center text-xs text-slate-400">
              {!selectedMaterial ? 'Select a material to continue' : 'Select dimensions to continue'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function StandardJunctionBoxPage() {
  const navigate = useNavigate();
  const [detailView, setDetailView] = useState<{ material: JBMaterial; dim: JBDimension } | null>(null);

  return (
    <>
      <Helmet>
        <title>Standard Junction Box — Pyrotech Electronics</title>
        <meta name="description" content="Pyrotech Standard Junction Boxes in CRCA, SS 304, FRP, and Aluminium Die Cast. IP55–IP65 rated. Multiple dimensions. Configure and order online." />
        <link rel="canonical" href="https://pyrotechelectronics.com/products/standard-junction-box" />
        <meta property="og:title" content="Standard Junction Box — Pyrotech Electronics" />
        <meta property="og:description" content="Pyrotech Standard Junction Boxes in CRCA, SS 304, FRP, GRP, and Polycarbonate. IP55–IP66 rated." />
        <meta property="og:type" content="website" />
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
              <Link to="/products?category=Standard+Junction+Box" className="hover:text-orange-500 transition-colors">Standard Junction Box</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-800 font-medium">
                {detailView ? `${detailView.material.name} — ${detailView.dim.label}` : 'Configure'}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Button variant="ghost" className="mb-6 gap-2 text-slate-500 hover:text-slate-800" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          {/* Page header */}
          {!detailView && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">Standard Junction Box</Badge>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">4 Materials Available</Badge>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Standard Junction Boxes
              </h1>
              <p className="text-slate-500 max-w-2xl leading-relaxed">
                Select your preferred material and dimension — then view the full product detail, add to cart, or buy directly.
              </p>
              <a
                href="/data/Small Junction Box.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                <FileText className="h-4 w-4" />
                Download Full Catalogue (PDF)
              </a>
            </div>
          )}

          <AnimatePresence mode="wait">
            {detailView ? (
              <ProductDetailView
                key="detail"
                material={detailView.material}
                dim={detailView.dim}
                onBack={() => setDetailView(null)}
              />
            ) : (
              <motion.div key="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ConfiguratorView onDimensionSelected={(m, d) => setDetailView({ material: m, dim: d })} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
