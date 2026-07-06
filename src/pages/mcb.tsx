import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, ChevronDown, ShoppingCart, Check, Package,
  Truck, ShieldCheck, Minus, Plus, Zap, Power,
  Gauge, Activity, ArrowLeft, ChevronLeft, Settings2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import {
  MCB_SERIES,
  mcbPrice,
  mcbStock,
  mcbCode,
  type MCBSeries,
  type MCBPole,
} from '@/lib/mcb-data';

// ─── Series Selector Card ─────────────────────────────────────────────────────
function SeriesCard({
  series,
  selected,
  onClick,
}: {
  series: MCBSeries;
  selected: boolean;
  onClick: () => void;
}) {
  const icons: Record<string, React.ReactNode> = {
    'qdb3-63':  <Zap className="h-5 w-5" />,
    'qdb3-125': <Power className="h-5 w-5" />,
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
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${series.color}`} />
      <div className="pl-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg text-white ${series.color}`}>
              {icons[series.id]}
            </span>
            <span className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
              {series.name}
            </span>
          </div>
          {selected && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-orange-500 text-white rounded-full p-0.5">
              <Check className="h-3.5 w-3.5" />
            </motion.span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-snug">{series.tagline}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{series.breakingCapacity}</span>
          <span className="text-[11px] text-slate-400">{series.curve}</span>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Current Rating Dropdown ──────────────────────────────────────────────────
function CurrentSelector({
  series,
  selected,
  onSelect,
}: {
  series: MCBSeries;
  selected: number | null;
  onSelect: (c: number) => void;
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
            <Gauge className="h-4 w-4 text-orange-600" />
          </span>
          {selected ? (
            <div className="text-left">
              <p className="font-bold text-slate-900 text-sm">{selected} A</p>
              <p className="text-xs text-slate-500">Rated current In</p>
            </div>
          ) : (
            <span className="text-slate-400 text-sm font-medium">Select current rating…</span>
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
            <div className="p-2 grid grid-cols-3 sm:grid-cols-4 gap-1 max-h-72 overflow-y-auto">
              {series.currents.map((c) => (
                <button
                  key={c}
                  onClick={() => { onSelect(c); setOpen(false); }}
                  className={`flex flex-col items-center justify-center px-3 py-3 rounded-xl transition-all ${
                    selected === c ? 'bg-orange-500 text-white' : 'hover:bg-orange-50 text-slate-700'
                  }`}
                >
                  <span className={`font-black text-base ${selected === c ? 'text-white' : 'text-slate-900'}`}>{c} A</span>
                  <span className={`text-[10px] ${selected === c ? 'text-orange-100' : 'text-slate-400'}`}>In</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Poles Selector (grid of buttons) ─────────────────────────────────────────
function PoleSelector({
  series,
  selected,
  onSelect,
}: {
  series: MCBSeries;
  selected: MCBPole | null;
  onSelect: (p: MCBPole) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      {series.poles.map((p) => {
        const active = selected?.code === p.code;
        return (
          <motion.button
            key={p.code}
            onClick={() => onSelect(p)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl border-2 transition-all text-left ${
              active
                ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-100'
                : 'border-slate-200 bg-white hover:border-orange-300 text-slate-700'
            }`}
          >
            <span className={`font-black text-base ${active ? 'text-white' : 'text-slate-900'}`}>{p.code}</span>
            <span className={`text-[11px] ${active ? 'text-orange-100' : 'text-slate-400'}`}>{p.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Spec table block (electrical / mechanical / installation) ────────────────
function SpecTable({ title, rows, icon }: { title: string; rows: { label: string; value: string }[]; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-1.5 bg-orange-100 rounded-lg text-orange-600">{icon}</span>
        <h3 className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
      </div>
      <dl className="divide-y divide-slate-100">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-4 py-2.5">
            <dt className="text-sm text-slate-500">{r.label}</dt>
            <dd className="text-sm font-semibold text-slate-800 text-right">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ─── Product Detail View (after series + current + poles selected) ────────────
function ProductDetailView({
  series,
  current,
  pole,
  onBack,
}: {
  series: MCBSeries;
  current: number;
  pole: MCBPole;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCartStore();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(series.image);

  const price = mcbPrice(series, current, pole);
  const stock = mcbStock(current, pole);
  const code = mcbCode(series, current, pole);

  // Electrical features with the user's selection substituted in
  const electrical = series.electrical.map((row) =>
    row.label === 'Rated current In'
      ? { ...row, value: `${current} A` }
      : row.label === 'Poles'
        ? { ...row, value: `${pole.code} — ${pole.label}` }
        : row
  );

  const cartProduct = {
    id: code,
    name: `${series.name} MCB — ${current}A ${pole.code}`,
    category: 'Switchgear Components' as const,
    price,
    originalPrice: price,
    description: series.description,
    features: series.features,
    stock,
    rating: 4.8,
    reviewCount: 0,
    isNew: false,
    isFeatured: false,
    image: series.image,
  };

  const handleAddToCart = () => {
    addToCart(cartProduct, qty);
    toast.success(`${series.name} ${current}A ${pole.code} added to cart`, {
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
              alt={`${series.name} MCB ${current}A ${pole.code}`}
              className="w-full h-full object-contain p-6"
            />
          </div>
          {series.images.length > 1 && (
            <div className="flex gap-2">
              {series.images.map((src) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(src)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === src ? 'border-orange-500 shadow-md' : 'border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <img src={src} alt="MCB" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200">Switchgear · MCB</Badge>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${series.color}`}>{series.breakingCapacity}</span>
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{series.ip}</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {series.name} Miniature Circuit Breaker
          </h1>
          <p className="text-slate-500 text-sm mb-1">{series.fullName}</p>

          {/* Specs chips */}
          <div className="flex flex-wrap gap-2 mb-4 mt-3">
            {[
              { label: 'Part No.',         value: code },
              { label: 'Current Rating',   value: `${current} A` },
              { label: 'Poles',            value: pole.code },
              { label: 'Breaking Cap.',    value: series.breakingCapacity },
              { label: 'Curve',            value: series.curve },
              { label: 'IP Rating',        value: series.ip },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{s.label}</p>
                <p className="text-xs font-bold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Headline selection tiles */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Current', value: `${current} A` },
              { label: 'Poles',   value: pole.code },
              { label: 'Breaking', value: series.breakingCapacity.split(' ')[0] },
            ].map((spec) => (
              <div key={spec.label} className="bg-orange-50 rounded-xl p-3 text-center border border-orange-100">
                <p className="text-xs text-orange-400 mb-1">{spec.label}</p>
                <p className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{spec.value}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 leading-relaxed text-sm mb-5">{series.description}</p>

          <Separator className="mb-5" />

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-slate-900">₹{price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-slate-400">per unit</span>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 py-3 font-bold text-slate-800 border-x border-slate-200">{qty}</span>
              <button onClick={() => setQty(Math.min(stock, qty + 1))} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-slate-400">{stock} in stock</span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3 mb-4">
            <span className="text-sm font-semibold text-orange-700">Total</span>
            <span className="text-xl font-black text-orange-600">₹{(price * qty).toLocaleString('en-IN')}</span>
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

      {/* Electrical & Mechanical features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <SpecTable title="Electrical Features" rows={electrical} icon={<Zap className="h-4 w-4" />} />
        <SpecTable title="Mechanical Features" rows={series.mechanical} icon={<Settings2 className="h-4 w-4" />} />
        <SpecTable title="Installation" rows={series.installation} icon={<Activity className="h-4 w-4" />} />
        {series.accessories && (
          <SpecTable title="Accessories" rows={series.accessories} icon={<Package className="h-4 w-4" />} />
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Configurator View ───────────────────────────────────────────────────
function ConfiguratorView({
  onConfigured,
}: {
  onConfigured: (s: MCBSeries, c: number, p: MCBPole) => void;
}) {
  const [series, setSeries] = useState<MCBSeries | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [pole, setPole] = useState<MCBPole | null>(null);

  const handleSeries = (s: MCBSeries) => {
    setSeries(s);
    setCurrent(null);
    setPole(null);
  };

  const ready = series && current !== null && pole;
  const price = ready ? mcbPrice(series, current, pole) : null;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10">
      {/* Left — steps */}
      <div className="space-y-8">
        {/* Step 1 — Series */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">1</span>
            <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Choose Type / Series</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MCB_SERIES.map((s) => (
              <SeriesCard key={s.id} series={s} selected={series?.id === s.id} onClick={() => handleSeries(s)} />
            ))}
          </div>
        </div>

        {/* Step 2 — Current rating */}
        <AnimatePresence>
          {series && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">2</span>
                <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Choose Current Rating</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-sm text-slate-500 mb-4">
                  {series.currents.length} current ratings available for{' '}
                  <span className="font-semibold text-slate-700">{series.name}</span>
                </p>
                <CurrentSelector series={series} selected={current} onSelect={(c) => { setCurrent(c); setPole(null); }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3 — Poles */}
        <AnimatePresence>
          {series && current !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">3</span>
                <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Choose Number of Poles</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <PoleSelector series={series} selected={pole} onSelect={setPole} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Series description */}
        <AnimatePresence>
          {series && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
            >
              <h3 className="font-black text-slate-900 mb-3 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                About {series.name}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-5">{series.description}</p>
              <Separator className="mb-5" />
              <h4 className="font-bold text-slate-800 mb-3 text-sm">Key Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {series.features.map((f) => (
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

      {/* Right — summary + CTA */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 xl:sticky xl:top-28">
          <h3 className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>Your Selection</h3>
          <div className="space-y-2">
            {[
              { label: 'Series',           value: series?.name },
              { label: 'Current Rating',   value: current !== null ? `${current} A` : undefined },
              { label: 'Poles',            value: pole?.code },
              { label: 'Breaking Cap.',    value: series?.breakingCapacity },
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
            {price !== null
              ? <span className="text-3xl font-black text-slate-900">₹{price.toLocaleString('en-IN')}</span>
              : <span className="text-2xl font-black text-slate-300">₹ —</span>
            }
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 gap-2 text-base"
            disabled={!ready}
            onClick={() => ready && onConfigured(series, current, pole)}
          >
            View Product Details →
          </Button>

          {!ready && (
            <p className="text-center text-xs text-slate-400">
              {!series ? 'Select a series to continue'
                : current === null ? 'Select a current rating to continue'
                : 'Select number of poles to continue'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function MCBPage() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<{ series: MCBSeries; current: number; pole: MCBPole } | null>(null);

  return (
    <>
      <Helmet>
        <title>MCB — Miniature Circuit Breakers | Pyrotech Electronics</title>
        <meta name="description" content="Pyrotech MCB — QDB3-63 (6kA) and QDB3-125 (10kA) miniature circuit breakers. 1A–125A, 1P to 4P. Select series, current rating and poles to configure and order online." />
        <link rel="canonical" href="https://pyrotechelectronics.com/products/mcb" />
        <meta property="og:title" content="MCB — Miniature Circuit Breakers | Pyrotech Electronics" />
        <meta property="og:description" content="QDB3-63 & QDB3-125 series MCB. 6kA / 10kA breaking capacity, 1A–125A, 1P–4P." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
              <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/products" className="hover:text-orange-500 transition-colors">Products</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/products?category=Switchgear+Components" className="hover:text-orange-500 transition-colors">Switchgear Components</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-800 font-medium">
                {detail ? `${detail.series.name} — ${detail.current}A ${detail.pole.code}` : 'MCB · Configure'}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Button variant="ghost" className="mb-6 gap-2 text-slate-500 hover:text-slate-800" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          {/* Page header */}
          {!detail && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">Switchgear Components</Badge>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">2 Series Available</Badge>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Miniature Circuit Breakers (MCB)
              </h1>
              <p className="text-slate-500 max-w-2xl leading-relaxed">
                Select your series, current rating, and number of poles — then view the full product
                detail with electrical &amp; mechanical specifications, add to cart, or buy directly.
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {detail ? (
              <ProductDetailView
                key="detail"
                series={detail.series}
                current={detail.current}
                pole={detail.pole}
                onBack={() => setDetail(null)}
              />
            ) : (
              <motion.div key="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ConfiguratorView onConfigured={(series, current, pole) => setDetail({ series, current, pole })} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
