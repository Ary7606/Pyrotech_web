import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/index'));
const NotFoundPage = lazy(() => import('./pages/_404'));
const ProductsPage = lazy(() => import('./pages/products'));
const ProductDetailPage = lazy(() => import('./pages/product-detail'));
const StandardJunctionBoxPage = lazy(() => import('./pages/standard-junction-box'));
const SwitchgearComponentsPage = lazy(() => import('./pages/switchgear-components'));
const CheckoutPage = lazy(() => import('./pages/checkout'));
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));
const OrdersPage = lazy(() => import('./pages/orders'));
const AboutPage = lazy(() => import('./pages/about'));
const ContactPage = lazy(() => import('./pages/contact'));
const AdminLoginPage = lazy(() => import('./pages/admin/login'));
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/standard-junction-box', element: <StandardJunctionBoxPage /> },
  { path: '/products/switchgear-components', element: <SwitchgearComponentsPage /> },
  { path: '/products/:id', element: <ProductDetailPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/orders', element: <OrdersPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/admin/login', element: <AdminLoginPage /> },
  { path: '/admin/dashboard', element: <AdminDashboardPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export type Path =
  | '/'
  | '/products'
  | '/checkout'
  | '/login'
  | '/register'
  | '/orders'
  | '/about'
  | '/contact'
  | '/admin/login'
  | '/admin/dashboard';

export type Params = Record<string, string | undefined>;
