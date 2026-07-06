import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Star, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProductStore, useCartStore, type ProductCategory } from '@/lib/store';
import { toast } from 'sonner';
import { Helmet } from '@dr.pogodin/react-helmet';

const CATEGORIES: ProductCategory[] = [
  'Mobile Stands', 'Door Handles', 'Storage Racks', 'Door Stoppers', 'Window Grips',
  'Window Handles', 'Modular Furniture', 'Pen Stands', 'Laptop Stands', 'Dustbins',
  'Lighting Panels', 'Distribution Panel', 'Standard Junction Box',
  'Wired Junction Box', 'Populated Junction Box', 'Switchgear Components',
];

// Products that have a dedicated configurator page instead of generic product detail
const CONFIGURATOR_ROUTES: Record<string, string> = {
  'standard-junction-box':   '/products/standard-junction-box',
  'switchgear-components-mcb': '/products/switchgear-components',
};

function getProductLink(productId: string): string {
  return CONFIGURATOR_ROUTES[productId] ?? `/products/${productId}`;
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { products } = useProductStore();
  const { addToCart, openCart } = useCartStore();

  const selectedCategory = searchParams.get('category') as ProductCategory | null;

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc': result.sort((a, b) => {
        if (a.price === 0) return 1;
        if (b.price === 0) return -1;
        return a.price - b.price;
      }); break;
      case 'price-desc': result.sort((a, b) => {
        if (a.price === 0) return 1;
        if (b.price === 0) return -1;
        return b.price - a.price;
      }); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
    return result;
  }, [products, selectedCategory, search, sort]);

  const handleCategoryClick = (cat: ProductCategory | null) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
    setMobileFiltersOpen(false);
  };

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      action: { label: 'View Cart', onClick: openCart },
    });
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-3">Categories</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              All Products ({products.length})
            </button>
          </li>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex justify-between items-center ${selectedCategory === cat ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <span>{cat}</span>
                  <span className="text-xs text-slate-400">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Products — Pyrotech Electronics</title>
        <meta name="description" content="Browse 200+ premium hardware products — door handles, storage racks, laptop stands, mobile stands, and more." />
        <link rel="canonical" href="https://pyrotechelectronics.com/products" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Page Header */}
        <div style={{ background: '#1a1a2e' }} className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {selectedCategory || 'All Products'}
            </h1>
            <p className="text-slate-400">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search + Sort bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white border-slate-200"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <Button
              variant="outline"
              className="sm:hidden gap-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          {/* Active filter badge */}
          {selectedCategory && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-slate-500">Filtering by:</span>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 gap-1">
                {selectedCategory}
                <button onClick={() => handleCategoryClick(null)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          )}

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden sm:block w-56 shrink-0">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-28">
                <FilterSidebar />
              </div>
            </aside>

            {/* Mobile filter drawer */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 flex">
                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
                <div className="relative ml-auto w-72 bg-white h-full p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-slate-800">Filters</h2>
                    <button onClick={() => setMobileFiltersOpen(false)}>
                      <X className="h-5 w-5 text-slate-500" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-slate-400 text-lg">No products found</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); handleCategoryClick(null); }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                      whileHover={{ y: -4 }}
                      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <Link to={getProductLink(product.id)}>
                        <div className="relative h-48 bg-slate-50 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            {product.isNew && <Badge className="bg-emerald-500 text-white text-xs">New</Badge>}
                            {product.originalPrice > product.price && (
                              <Badge className="bg-orange-500 text-white text-xs">
                                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                              </Badge>
                            )}
                          </div>
                          {product.stock < 10 && product.stock > 0 && (
                            <div className="absolute bottom-3 right-3">
                              <Badge className="bg-red-500 text-white text-xs">Only {product.stock} left</Badge>
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-4">
                        <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide mb-1">{product.category}</p>
                        <Link to={getProductLink(product.id)}>
                          <h3 className="text-slate-800 font-bold text-sm mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className={`h-3 w-3 ${j < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-slate-400">({product.reviewCount})</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            {product.price === 0 ? (
                              <span className="text-xs font-semibold text-orange-500 italic">Configure to get price</span>
                            ) : (
                              <>
                                <span className="text-lg font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
                                {product.originalPrice > product.price && (
                                  <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                                )}
                              </>
                            )}
                          </div>
                          {product.price > 0 && (
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600 text-white h-8 w-8 p-0"
                              onClick={(e) => handleAddToCart(product, e)}
                              disabled={product.stock === 0}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
