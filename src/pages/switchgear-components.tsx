import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, ChevronDown, ShoppingCart, Check, Package,
  Truck, ShieldCheck, Minus, Plus, Zap, ArrowLeft, ChevronLeft,
  Activity, Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { MCB_SERIES, type MCBSeries, type MCBVariant } from '@/lib/mcb-data';

// ─── Reusable animated dropdown ──────────────────────────────────────────────
function Dropdown<T>({
  label,
  icon,
  value,
  displayValue,
  options,
  renderOption,
  onSelect,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  value: T | null;
  displayValue: string | null;
  options: T[];
  renderOption: (o: T, selected: boolean) => React.ReactNode;
  onSelect: (o: T) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all duration-200 bg-white ${
          disabled
            ? 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-50'
            : open
            ? 'border-orange-500 shadow-md shadow-orange-100'
            : value
            ? 'border-orange-400 bg-orange-50'
            : 'border-slate-200 hover:border-orange-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="p-1.5 bg-orange-100 rounded-lg text-orange-600">{icon}</span>
          {displayValue ? (
            <div className="text-left">
              <p className="font-bold text-slate-900 text-sm">{displayValue}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ) : (
            <span className="text-slate-400 text-sm font-medium">Select {label}…</span>
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
              {options.map((opt, i) => {
                const isSelected = JSON.stringify(opt) === JSON.stringify(value);
                return (
                  <button
                    key={i}
                    onClick={() => { onSelect(opt); setOpen(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      isSelected ? 'bg-orange-500 text-white' : 'hover:bg-orange-50 text-slate-700'
                    }`}
                  >
                    {renderOption(opt, isSelected)}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
    'qdb3-63':   <Zap className="h-5 w-5" />,
    'qdb3-125h': <Activity className="h-5 w-5" />,
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
              {icons[series.id] ?? <Settings className="h-5 w-5" />}
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
        <p className="text-xs text-slate-500 leading-snug mb-2">{series.fullName}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
            Up to {Math.max(...series.currentRatings)}A
          </span>
          <span className="text-[11px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
            {series.breakingCapacity} breaking
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Product Detail View ──────────────────────────────────────────────────────
function MCBDetailView({
  series,
  variant,
  onBack,
}: {
  series: MCBSeries;
  variant: MCBVariant;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCartStore();
  const [qty, setQty] = useState(1);

  const cartProduct = {
    id: variant.code,
    name: `${series.name} MCB — ${variant.currentRating}A ${variant.poles}`,
    category: 'Switchgear Components' as const,
    price: variant.price,
    originalPrice: variant.price,
    description: series.description,
    features: [
      `Rated current: ${variant.currentRating}A`,
      `Poles: ${variant.poles}`,
      `Breaking capacity: ${series.breakingCapacity}`,
      `Tripping characteristic: ${series.trippingCharacteristic}`,
      `Mounting: ${series.mounting}`,
      `IP Rating: ${series.protectionDegree}`,
    ],
    stock: variant.stock,
    rating: 4.8,
    reviewCount: 0,
    isNew: false,
    isFeatured: false,
    image: series.image,
  };

  const handleAddToCart = () => {
    addToCart(cartProduct, qty);
    toast.success(`${series.name} ${variant.currentRating}A ${variant.poles} added to cart`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  const handleBuyNow = () => {
    addToCart(cartProduct, qty);
    navigate('/checkout');
  };

  const specs = [
    { label: 'Part No.',             value: variant.code },
    { label: 'Series',               value: series.name },
    { label: 'Current Rating',       value: `${variant.currentRating}A` },
    { label: 'Poles',                value: variant.poles },
    { label: 'Rated Voltage',        value: series.ratedVoltage },
    { label: 'Breaking Capacity',    value: series.breakingCapacity },
    { label: 'Tripping Char.',       value: series.trippingCharacteristic },
    { label: 'IP Rating',            value: series.protectionDegree },
    { label: 'Electrical Life',      value: series.electricalLife },
    { label: 'Mechanical Life',      value: series.mechanicalLife },
    { label: 'Ambient Temp',         value: series.ambientTemp },
    { label: 'Mounting',             value: series.mounting },
  ];

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
        {/* Image */}
        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 aspect-square shadow-sm">
            <img
              src={series.image}
              alt={`${series.name} ${variant.currentRating}A ${variant.poles}`}
              className="w-full h-full object-contain p-6"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-orange-100 text-orange-700 border-orange-200">Switchgear Components</Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">MCB</Badge>
            <span className={`text-white text-xs font-bold px-3 py-1 rounded-full ${series.color}`}>{series.name}</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-1 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {series.name} — {variant.currentRating}A {variant.poles}
          </h1>
          <p className="text-slate-500 text-sm mb-4">{series.fullName}</p>

          {/* Spec badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { label: 'Part No.',          value: variant.code },
              { label: 'Current Rating',    value: `${variant.currentRating}A` },
              { label: 'Poles',             value: variant.poles },
              { label: 'Breaking Capacity', value: series.breakingCapacity },
              { label: 'Tripping Char.',    value: series.trippingCharacteristic },
              { label: 'IP Rating',         value: series.protectionDegree },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">{s.label}</p>
                <p className="text-xs font-bold text-slate-800">{s.value}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 leading-relaxed text-sm mb-5">{series.description}</p>

          {/* Full specs table */}
          <div className="mb-5">
            <h3 className="font-bold text-slate-800 mb-3 text-sm">Technical Specifications</h3>
            <div className="rounded-xl border border-slate-100 overflow-hidden">
              {specs.map((s, i) => (
                <div key={s.label} className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                  <span className="text-slate-500">{s.label}</span>
                  <span className="font-semibold text-slate-800 text-right max-w-[55%]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="mb-5" />

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-slate-900">₹{variant.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-slate-400">per unit</span>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 py-3 font-bold text-slate-800 border-x border-slate-200">{qty}</span>
              <button onClick={() => setQty(Math.min(variant.stock, qty + 1))} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-slate-400">{variant.stock} in stock</span>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-3 mb-4">
            <span className="text-sm font-semibold text-orange-700">Total</span>
            <span className="text-xl font-black text-orange-600">₹{(variant.price * qty).toLocaleString('en-IN')}</span>
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

// ─── Main Configurator ────────────────────────────────────────────────────────
function MCBConfiguratorView({
  onVariantSelected,
}: {
  onVariantSelected: (s: MCBSeries, v: MCBVariant) => void;
}) {
  const [selectedSeries, setSelectedSeries] = useState<MCBSeries | null>(null);
  const [selectedAmp,    setSelectedAmp]    = useState<number | null>(null);
  const [selectedPoles,  setSelectedPoles]  = useState<string | null>(null);

  const handleSeriesSelect = (s: MCBSeries) => {
    setSelectedSeries(s);
    setSelectedAmp(null);
    setSelectedPoles(null);
  };

  const handleAmpSelect = (amp: number) => {
    setSelectedAmp(amp);
    setSelectedPoles(null);
  };

  const selectedVariant =
    selectedSeries && selectedAmp !== null && selectedPoles
      ? selectedSeries.variants.find(
          (v) => v.currentRating === selectedAmp && v.poles === selectedPoles,
        ) ?? null
      : null;

  const handleConfigure = () => {
    if (selectedSeries && selectedVariant) {
      onVariantSelected(selectedSeries, selectedVariant);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10">
      {/* Left — steps */}
      <div className="space-y-8">

        {/* Step 1 — Series */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">1</span>
            <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Choose MCB Series</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MCB_SERIES.map((s) => (
              <SeriesCard
                key={s.id}
                series={s}
                selected={selectedSeries?.id === s.id}
                onClick={() => handleSeriesSelect(s)}
              />
            ))}
          </div>
        </div>

        {/* Step 2 — Current Rating */}
        <AnimatePresence>
          {selectedSeries && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">2</span>
                <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Select Current Rating</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-sm text-slate-500 mb-4">
                  {selectedSeries.currentRatings.length} ratings available for{' '}
                  <span className="font-semibold text-slate-700">{selectedSeries.name}</span>
                </p>
                <Dropdown<number>
                  label="Current Rating"
                  icon={<Zap className="h-4 w-4" />}
                  value={selectedAmp}
                  displayValue={selectedAmp !== null ? `${selectedAmp}A` : null}
                  options={selectedSeries.currentRatings}
                  renderOption={(amp, sel) => (
                    <p className={`font-bold text-sm ${sel ? 'text-white' : 'text-slate-900'}`}>{amp}A</p>
                  )}
                  onSelect={handleAmpSelect}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3 — Poles */}
        <AnimatePresence>
          {selectedSeries && selectedAmp !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-black text-sm shrink-0">3</span>
                <h2 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Select Poles</h2>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <p className="text-sm text-slate-500 mb-4">
                  {selectedSeries.poles.length} pole configurations available
                </p>
                <Dropdown<string>
                  label="Poles"
                  icon={<Activity className="h-4 w-4" />}
                  value={selectedPoles}
                  displayValue={selectedPoles}
                  options={selectedSeries.poles}
                  renderOption={(pole, sel) => (
                    <p className={`font-bold text-sm ${sel ? 'text-white' : 'text-slate-900'}`}>{pole}</p>
                  )}
                  onSelect={setSelectedPoles}
                />

                {/* Variant preview once both selected */}
                <AnimatePresence>
                  {selectedVariant && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {[
                          { label: 'Part No.',       value: selectedVariant.code },
                          { label: 'Current Rating', value: `${selectedVariant.currentRating}A` },
                          { label: 'Poles',          value: selectedVariant.poles },
                          { label: 'In Stock',       value: `${selectedVariant.stock} units` },
                        ].map((spec) => (
                          <div key={spec.label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                            <p className="text-xs text-slate-400 mb-1">{spec.label}</p>
                            <p className="font-black text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{spec.value}</p>
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

        {/* Series info card */}
        <AnimatePresence>
          {selectedSeries && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
            >
              <h3 className="font-black text-slate-900 mb-3 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                About {selectedSeries.name}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-5">{selectedSeries.description}</p>
              <Separator className="mb-5" />
              <h4 className="font-bold text-slate-800 mb-3 text-sm">Technical Data</h4>
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                {[
                  { label: 'Rated Voltage',        value: selectedSeries.ratedVoltage },
                  { label: 'Breaking Capacity',    value: selectedSeries.breakingCapacity },
                  { label: 'Tripping Char.',       value: selectedSeries.trippingCharacteristic },
                  { label: 'IP Rating',            value: selectedSeries.protectionDegree },
                  { label: 'Electrical Life',      value: selectedSeries.electricalLife },
                  { label: 'Mechanical Life',      value: selectedSeries.mechanicalLife },
                  { label: 'Mounting',             value: selectedSeries.mounting },
                  { label: 'Terminal (Cable)',      value: selectedSeries.terminalSizeCable },
                  { label: 'Tightening Torque',    value: selectedSeries.tighteningTorque },
                ].map((row, i) => (
                  <div key={row.label} className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <span className="text-slate-500">{row.label}</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[55%]">{row.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right — selection summary */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
          <h3 className="font-black text-slate-900 text-lg" style={{ fontFamily: 'var(--font-heading)' }}>Your Selection</h3>
          <div className="space-y-2">
            {[
              { label: 'Product',        value: 'MCB' },
              { label: 'Series',         value: selectedSeries?.name },
              { label: 'Current Rating', value: selectedAmp !== null ? `${selectedAmp}A` : undefined },
              { label: 'Poles',          value: selectedPoles ?? undefined },
              { label: 'Part No.',       value: selectedVariant?.code },
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
            {selectedVariant
              ? <span className="text-3xl font-black text-slate-900">₹{selectedVariant.price.toLocaleString('en-IN')}</span>
              : <span className="text-2xl font-black text-slate-300">₹ —</span>
            }
          </div>

          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 gap-2 text-base"
            disabled={!selectedVariant}
            onClick={handleConfigure}
          >
            View Product Details →
          </Button>

          {!selectedVariant && (
            <p className="text-center text-xs text-slate-400">
              {!selectedSeries
                ? 'Select a series to continue'
                : selectedAmp === null
                ? 'Select current rating to continue'
                : 'Select poles to continue'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function SwitchgearComponentsPage() {
  const navigate = useNavigate();
  const [detailView, setDetailView] = useState<{ series: MCBSeries; variant: MCBVariant } | null>(null);

  return (
    <>
      <Helmet>
        <title>Switchgear Components — Pyrotech Electronics</title>
        <meta name="description" content="Pyrotech MCB switchgear components — QDB3-63 and QDB3-125H series miniature circuit breakers. Configure current rating and poles online." />
        <link rel="canonical" href="https://pyrotechelectronics.com/products/switchgear-components" />
        <meta property="og:title" content="Switchgear Components — Pyrotech Electronics" />
        <meta property="og:description" content="Configure and order Pyrotech MCBs online. QDB3-63 (up to 63A) and QDB3-125H (up to 125A) series." />
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
              <Link to="/products?category=Switchgear+Components" className="hover:text-orange-500 transition-colors">Switchgear Components</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-800 font-medium">
                {detailView
                  ? `${detailView.series.name} — ${detailView.variant.currentRating}A ${detailView.variant.poles}`
                  : 'MCB Configurator'}
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
                <Badge className="bg-orange-100 text-orange-700 border-orange-200">Switchgear Components</Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">MCB</Badge>
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">2 Series Available</Badge>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Miniature Circuit Breakers
              </h1>
              <p className="text-slate-500 max-w-2xl leading-relaxed">
                Select your MCB series, then choose the current rating and pole configuration — view full product details, add to cart, or buy directly.
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {detailView ? (
              <MCBDetailView
                key="detail"
                series={detailView.series}
                variant={detailView.variant}
                onBack={() => setDetailView(null)}
              />
            ) : (
              <motion.div key="configurator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MCBConfiguratorView
                  onVariantSelected={(s, v) => setDetailView({ series: s, variant: v })}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
