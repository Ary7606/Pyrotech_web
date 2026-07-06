import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingBag, Users,
  LogOut, Edit2, Save, X, CheckCircle, Clock, Truck, XCircle,
  MessageSquare, BarChart2, Settings, Bell, Search, ArrowUpRight,
  ArrowDownRight, ChevronRight, IndianRupee, Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuthStore, useOrderStore, useProductStore } from '@/lib/store';
import { toast } from 'sonner';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  enquiry: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  pending: Clock,
  paid: CheckCircle,
  enquiry: MessageSquare,
  shipped: Truck,
  cancelled: XCircle,
};

// Monthly revenue chart is built from real orders below, not mock data

const CATEGORY_COLORS = [
  '#f97316', '#169cf9', '#10b981', '#8b5cf6',
  '#f59e0b', '#ef4444', '#06b6d4', '#ec4899',
  '#84cc16', '#6366f1',
];

type Tab = 'overview' | 'orders' | 'inventory' | 'customers';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { isAdmin, logout, users } = useAuthStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const { products, updateStock } = useProductStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-slate-500">Access denied. Admin login required.</p>
        <Button onClick={() => navigate('/admin/login')} className="bg-orange-500 hover:bg-orange-600 text-white">
          Admin Login
        </Button>
      </div>
    );
  }

  const totalRevenue = orders.filter((o) => o.status === 'paid').reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  // Build monthly revenue from real orders (current year)
  const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const currentYear = new Date().getFullYear();
  const MONTHLY_DATA = MONTH_LABELS.map((month, idx) => {
    const monthOrders = orders.filter((o) => {
      const d = new Date(o.createdAt);
      return d.getFullYear() === currentYear && d.getMonth() === idx;
    });
    return {
      month,
      revenue: monthOrders.filter((o) => o.status === 'paid').reduce((s, o) => s + o.total, 0),
      orders: monthOrders.length,
    };
  });

  // Category breakdown
  const categoryMap: Record<string, number> = {};
  products.forEach((p) => {
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
  });
  const categoryData = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const maxCatCount = Math.max(...categoryData.map((c) => c[1]));

  // Chart max
  const maxRevenue = Math.max(...MONTHLY_DATA.map((d) => d.revenue));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const startEditStock = (productId: string, currentStock: number) => {
    setEditingStock(productId);
    setStockValue(String(currentStock));
  };

  const saveStock = (productId: string) => {
    const val = parseInt(stockValue);
    if (isNaN(val) || val < 0) { toast.error('Invalid stock value'); return; }
    updateStock(productId, val);
    setEditingStock(null);
    toast.success('Stock updated');
  };

  const navItems: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrders || undefined },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: lowStockProducts || undefined },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  const stats = [
    {
      label: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      sub: 'From paid orders',
      icon: IndianRupee,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      trend: orders.filter((o) => o.status === 'paid').length > 0 ? `${orders.filter((o) => o.status === 'paid').length} paid` : 'No paid orders',
      up: orders.filter((o) => o.status === 'paid').length > 0,
    },
    {
      label: 'Total Orders',
      value: orders.length,
      sub: `${pendingOrders} pending`,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      trend: orders.length > 0 ? `${orders.length} total` : 'No orders yet',
      up: orders.length > 0,
    },
    {
      label: 'Products',
      value: products.length,
      sub: `${lowStockProducts} low stock`,
      icon: Package,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      trend: lowStockProducts > 0 ? `${lowStockProducts} alerts` : 'All stocked',
      up: lowStockProducts === 0,
    },
    {
      label: 'Customers',
      value: users.length,
      sub: 'Registered users',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      trend: users.length > 0 ? `${users.length} registered` : 'No users yet',
      up: users.length > 0,
    },
  ];

  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Pyrotech Electronics</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex h-screen bg-[#f4f6fb] overflow-hidden">
        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <aside
          className={`${sidebarOpen ? 'w-60' : 'w-16'} transition-all duration-300 flex flex-col shrink-0 shadow-xl`}
          style={{ background: '#1a1a2e' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-white font-black text-sm leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>PYROTECH</p>
                <p className="text-orange-400 text-xs">Admin Panel</p>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-5 space-y-1">
            {sidebarOpen && (
              <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3">Main Menu</p>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge ? (
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-orange-500 text-white'}`}>
                          {item.badge}
                        </span>
                      ) : null}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-3 py-4 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
              <Settings className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>Settings</span>}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* ── Main Content ─────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <BarChart2 className="h-5 w-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search..." className="pl-9 w-56 h-9 text-sm bg-slate-50 border-slate-200 focus:bg-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100">
                <Bell className="h-5 w-5" />
                {pendingOrders > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
                )}
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">Admin</p>
                  <p className="text-xs text-slate-400">Super Admin</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">

            {/* ── Overview Tab ── */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Dashboard Overview</h1>
                  <p className="text-slate-400 text-sm">Welcome back! Here's what's happening with your store.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.07 }}
                        className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                            <Icon className={`h-5 w-5 ${stat.color}`} />
                          </div>
                          <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-500'}`}>
                            {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {stat.trend}
                          </span>
                        </div>
                        <p className="text-2xl font-black text-slate-900 mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                        <p className="text-slate-500 text-xs font-medium">{stat.label}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{stat.sub}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Bar Chart */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-bold text-slate-800">Revenue Overview</h2>
                        <p className="text-slate-400 text-xs mt-0.5">Monthly revenue for 2026</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" />
                        <span className="text-xs text-slate-500">Revenue</span>
                      </div>
                    </div>
                    {/* Bar Chart */}
                    <div className="flex items-end gap-1.5 h-40">
                      {MONTHLY_DATA.map((d, i) => {
                        const heightPct = (d.revenue / maxRevenue) * 100;
                        return (
                          <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                            <div className="relative w-full flex items-end" style={{ height: '128px' }}>
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPct}%` }}
                                transition={{ duration: 0.5, delay: i * 0.04 }}
                                className="w-full rounded-t-md bg-orange-500 group-hover:bg-orange-400 transition-colors cursor-pointer"
                                title={`₹${d.revenue.toLocaleString('en-IN')}`}
                              />
                            </div>
                            <span className="text-slate-400 text-[10px]">{d.month}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="mb-5">
                      <h2 className="font-bold text-slate-800">Products by Category</h2>
                      <p className="text-slate-400 text-xs mt-0.5">Inventory distribution</p>
                    </div>
                    <div className="space-y-3">
                      {categoryData.map(([cat, count], i) => (
                        <div key={cat}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-600 font-medium truncate max-w-[120px]">{cat}</span>
                            <span className="text-xs font-bold text-slate-700">{count}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(count / maxCatCount) * 100}%` }}
                              transition={{ duration: 0.5, delay: i * 0.06 }}
                              className="h-full rounded-full"
                              style={{ background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Top Products */}
                  <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-bold text-slate-800">Top Products</h2>
                      <button
                        onClick={() => setActiveTab('inventory')}
                        className="text-xs text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
                      >
                        View All <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {topProducts.map((product, i) => (
                        <div key={product.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                          <span className="text-slate-300 text-xs font-black w-5 text-center">{i + 1}</span>
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 truncate">{product.name}</p>
                            <p className="text-xs text-slate-400">{product.category}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-slate-400">{product.reviewCount} reviews</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Status Breakdown */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="font-bold text-slate-800">Order Status</h2>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1"
                      >
                        View All <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                    {orders.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 text-sm">No orders yet</div>
                    ) : (
                      <div className="space-y-3">
                        {(['pending', 'paid', 'shipped', 'enquiry', 'cancelled'] as const).map((status) => {
                          const count = orders.filter((o) => o.status === status).length;
                          const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
                          return (
                            <div key={status} className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full shrink-0 ${
                                status === 'paid' ? 'bg-emerald-500' :
                                status === 'pending' ? 'bg-yellow-500' :
                                status === 'shipped' ? 'bg-purple-500' :
                                status === 'enquiry' ? 'bg-blue-500' : 'bg-red-500'
                              }`} />
                              <span className="text-xs text-slate-600 capitalize flex-1">{status}</span>
                              <span className="text-xs font-bold text-slate-800">{count}</span>
                              <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Recent orders */}
                    <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Recent</p>
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-slate-800 truncate max-w-[110px]">{order.customerName}</p>
                            <p className="text-xs text-slate-400 font-mono">{order.id.slice(-6)}</p>
                          </div>
                          <Badge className={`text-xs ${STATUS_COLORS[order.status]} border`}>
                            {order.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Orders Tab ── */}
            {activeTab === 'orders' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Orders</h1>
                  <p className="text-slate-400 text-sm">{orders.length} total orders · {pendingOrders} pending</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  {orders.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">No orders yet</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Update'].map((h) => (
                              <th key={h} className="text-left px-5 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {orders.map((order) => {
                            const StatusIcon = STATUS_ICONS[order.status] || Clock;
                            return (
                              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4 font-mono text-xs text-slate-500">{order.id.slice(-10)}</td>
                                <td className="px-5 py-4">
                                  <p className="font-medium text-slate-800">{order.customerName}</p>
                                  <p className="text-slate-400 text-xs">{order.customerPhone}</p>
                                </td>
                                <td className="px-5 py-4 text-slate-600">{order.items.length}</td>
                                <td className="px-5 py-4 font-bold text-slate-900">₹{order.total.toLocaleString('en-IN')}</td>
                                <td className="px-5 py-4">
                                  <Badge className={`${STATUS_COLORS[order.status]} border gap-1`}>
                                    <StatusIcon className="h-3 w-3" />
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </Badge>
                                </td>
                                <td className="px-5 py-4 text-slate-500 text-xs">
                                  {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                </td>
                                <td className="px-5 py-4">
                                  <select
                                    value={order.status}
                                    onChange={(e) => {
                                      updateOrderStatus(order.id, e.target.value as typeof order.status);
                                      toast.success('Order status updated');
                                    }}
                                    className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="enquiry">Enquiry</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Inventory Tab ── */}
            {activeTab === 'inventory' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Inventory</h1>
                  <p className="text-slate-400 text-sm">{products.length} products · {lowStockProducts} low stock</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          {['Product', 'Category', 'Price', 'Stock', 'Status'].map((h) => (
                            <th key={h} className="text-left px-5 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {products.map((product) => (
                          <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="font-medium text-slate-800 line-clamp-1 max-w-[200px]">{product.name}</p>
                              </div>
                            </td>
                            <td className="px-5 py-4 text-slate-500 text-xs">{product.category}</td>
                            <td className="px-5 py-4 font-semibold text-slate-800">₹{product.price.toLocaleString('en-IN')}</td>
                            <td className="px-5 py-4">
                              {editingStock === product.id ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={stockValue}
                                    onChange={(e) => setStockValue(e.target.value)}
                                    className="w-20 h-8 text-sm"
                                    type="number"
                                    min="0"
                                  />
                                  <button onClick={() => saveStock(product.id)} className="text-emerald-500 hover:text-emerald-600">
                                    <Save className="h-4 w-4" />
                                  </button>
                                  <button onClick={() => setEditingStock(null)} className="text-slate-400 hover:text-slate-600">
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className={`font-semibold ${product.stock < 10 ? 'text-red-500' : 'text-slate-800'}`}>
                                    {product.stock}
                                  </span>
                                  <button
                                    onClick={() => startEditStock(product.id, product.stock)}
                                    className="text-slate-300 hover:text-orange-500 transition-colors"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="px-5 py-4">
                              {product.stock === 0 ? (
                                <Badge className="bg-red-100 text-red-700 border border-red-200">Out of Stock</Badge>
                              ) : product.stock < 10 ? (
                                <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200">Low Stock</Badge>
                              ) : (
                                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">In Stock</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── Customers Tab ── */}
            {activeTab === 'customers' && (
              <div>
                <div className="mb-6">
                  <h1 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Customers</h1>
                  <p className="text-slate-400 text-sm">{users.length} registered customers</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                  {users.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">No registered customers yet</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100">
                          <tr>
                            {['Name', 'Email', 'Phone', 'Joined'].map((h) => (
                              <th key={h} className="text-left px-5 py-3 text-slate-500 font-semibold text-xs uppercase tracking-wide">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                    <span className="text-orange-600 font-bold text-sm">{user.name[0]}</span>
                                  </div>
                                  <span className="font-medium text-slate-800">{user.name}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-slate-600">{user.email}</td>
                              <td className="px-5 py-4 text-slate-600">{user.phone}</td>
                              <td className="px-5 py-4 text-slate-500 text-xs">
                                {new Date(user.createdAt).toLocaleDateString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
}
