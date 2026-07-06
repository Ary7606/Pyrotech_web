import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';
import { Helmet } from '@dr.pogodin/react-helmet';

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password required'),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useAuthStore();
  const [showPw, setShowPw] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const result = adminLogin(data.email, data.password);
    if (result.success) {
      toast.success('Admin access granted');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.error || 'Invalid credentials');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login — Pyrotech Electronics</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0d0d1a' }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-400" />
            </div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>Admin Portal</h1>
            <p className="text-slate-500 mt-1 text-sm">Pyrotech Electronics</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-slate-500"
                  placeholder="admin@pyrotechelectronics.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    {...register('password')}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 pr-10"
                    placeholder="Admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </form>

            <p className="text-slate-600 text-xs text-center mt-4">
              Default: admin@pyrotechelectronics.com / Admin@2024
            </p>
          </div>

          {/* Credentials hint */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">Demo Credentials</p>
            <div className="space-y-2">
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <p className="text-slate-400 text-xs font-semibold mb-0.5">Admin Account</p>
                <p className="text-slate-300 text-xs font-mono">admin@pyrotechelectronics.com</p>
                <p className="text-slate-300 text-xs font-mono">Admin@2024</p>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <p className="text-slate-400 text-xs font-semibold mb-0.5">Manager Account</p>
                <p className="text-slate-300 text-xs font-mono">manager@pyrotechelectronics.com</p>
                <p className="text-slate-300 text-xs font-mono">Manager@2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
