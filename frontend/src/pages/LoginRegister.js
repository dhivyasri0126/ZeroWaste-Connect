import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Mail, Lock, Eye, EyeOff, User, Phone, MapPin,
  UserCheck, Loader2, Leaf
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { cn } from '../lib/utils';
import API_BASE_URL from '../config/api';

/* ── Framer Motion variants ──────────────────────────── */
const panelVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: (dir) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  }),
};

/* ── Password Strength ───────────────────────────────── */
function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[@$!%*?&]/.test(pw)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-error-500' };
  if (score === 2) return { score, label: 'Fair', color: 'bg-warning-500' };
  if (score === 3) return { score, label: 'Good', color: 'bg-info-500' };
  return { score, label: 'Strong', color: 'bg-success-500' };
}

/* ── Field Component ─────────────────────────────────── */
function FormField({ label, id, icon: Icon, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
        )}
        {children}
      </div>
      {error && (
        <p className="text-xs text-destructive" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   LOGIN FORM
════════════════════════════════════════════════════════ */
function LoginForm({ onSwitch }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const token = await res.text();
      if (!res.ok) {
        toast.error(token || 'Login failed. Please try again.');
        return;
      }
      localStorage.setItem('token', token);

      const profileRes = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!profileRes.ok) {
        toast.error('Unable to fetch profile. Please try again.');
        return;
      }
      const user = await profileRes.json();
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name || 'User'}!`);

      if (user.role === 'DONOR') navigate('/donor');
      else if (user.role === 'RECIPIENT') navigate('/recipient');
      else toast.error('Invalid user role. Please contact support.');
    } catch {
      toast.error('Unable to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4" noValidate>
      <FormField label="Email address" id="login-email" icon={Mail} error={errors.email}>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'login-email-error' : undefined}
          className="pl-9"
          disabled={loading}
        />
      </FormField>

      <FormField label="Password" id="login-password" icon={Lock} error={errors.password}>
        <Input
          id="login-password"
          type={showPw ? 'text' : 'password'}
          placeholder="Enter your password"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          aria-invalid={!!errors.password}
          className="pl-9 pr-10"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label={showPw ? 'Hide password' : 'Show password'}
        >
          {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </FormField>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          'Sign in'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Create one
        </button>
      </p>
    </form>
  );
}

/* ══════════════════════════════════════════════════════
   REGISTER FORM
════════════════════════════════════════════════════════ */
function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: 'RECIPIENT',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const strength = getPasswordStrength(form.password);

  function validate() {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = 'Name must be at least 3 characters';
    else if (!/^[A-Za-z ]{3,40}$/.test(form.name)) e.name = 'Name can only contain letters and spaces';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.phone) e.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.password) e.password = 'Password is required';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,15}$/.test(form.password)) {
      e.password = 'Password must be 8-15 characters with uppercase, lowercase, number and special character';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.text();
      if (result === 'Registration Successful') {
        toast.success('Account created! You can now sign in.');
        onSwitch();
      } else {
        toast.error(result || 'Registration failed. Please try again.');
      }
    } catch {
      toast.error('Unable to connect to server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-3" noValidate>
      <FormField label="Full name *" id="reg-name" icon={User} error={errors.name}>
        <Input
          id="reg-name"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          aria-invalid={!!errors.name}
          className="pl-9"
          disabled={loading}
        />
      </FormField>

      <FormField label="Email address *" id="reg-email" icon={Mail} error={errors.email}>
        <Input
          id="reg-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-invalid={!!errors.email}
          className="pl-9"
          disabled={loading}
        />
      </FormField>

      <FormField label="Phone number *" id="reg-phone" icon={Phone} error={errors.phone}>
        <Input
          id="reg-phone"
          type="tel"
          placeholder="9876543210"
          autoComplete="tel"
          maxLength={10}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          aria-invalid={!!errors.phone}
          className="pl-9"
          disabled={loading}
        />
      </FormField>

      <FormField label="Address *" id="reg-address" icon={MapPin} error={errors.address}>
        <Input
          id="reg-address"
          type="text"
          placeholder="Your address"
          autoComplete="street-address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          aria-invalid={!!errors.address}
          className="pl-9"
          disabled={loading}
        />
      </FormField>

      {/* Role Selector */}
      <div className="space-y-1.5">
        <Label htmlFor="reg-role">I am a *</Label>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Select role">
          {['DONOR', 'RECIPIENT'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setForm({ ...form, role: r })}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                form.role === r
                  ? 'border-primary bg-primary-50 dark:bg-primary-950 text-primary'
                  : 'border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
              aria-pressed={form.role === r}
            >
              <UserCheck className="h-4 w-4" aria-hidden="true" />
              {r.charAt(0) + r.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <FormField label="Password *" id="reg-password" icon={Lock} error={errors.password}>
        <Input
          id="reg-password"
          type={showPw ? 'text' : 'password'}
          placeholder="Create a strong password"
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          aria-invalid={!!errors.password}
          className="pl-9 pr-10"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label={showPw ? 'Hide password' : 'Show password'}
        >
          {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </FormField>

      {/* Password Strength */}
      {form.password && (
        <div className="space-y-1" aria-live="polite" aria-label={`Password strength: ${strength.label}`}>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-colors duration-300',
                  i <= strength.score ? strength.color : 'bg-neutral-200 dark:bg-neutral-700'
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Password strength: <span className="font-medium">{strength.label}</span>
          </p>
        </div>
      )}

      <Button type="submit" className="w-full mt-1" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Creating account…
          </>
        ) : (
          'Create account'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN: LoginRegister Page
════════════════════════════════════════════════════════ */
export default function LoginRegister() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [direction, setDirection] = useState(1);

  function switchTo(next) {
    setDirection(next === 'register' ? 1 : -1);
    setMode(next);
  }

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950">
      {/* Left brand panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700">
        {/* Background circles */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-2xl">
              🌱
            </div>
            <span className="text-2xl font-bold tracking-tight">ZeroWaste Connect</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="space-y-4"
            >
              {mode === 'login' ? (
                <>
                  <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                    Welcome<br />back! 👋
                  </h1>
                  <p className="text-lg text-white/80 max-w-sm">
                    Continue your ZeroWaste journey. Your community is waiting.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
                    Join the<br />movement 🌿
                  </h1>
                  <p className="text-lg text-white/80 max-w-sm">
                    Reduce food waste. Feed communities. Make a real difference today.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Impact stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 max-w-xs">
            {[
              { value: '2,400+', label: 'Donations made' },
              { value: '850+', label: 'Families helped' },
              { value: '12k kg', label: 'Food saved' },
              { value: '120+', label: 'Communities' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 backdrop-blur-sm p-3">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <Leaf className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="text-xl font-bold text-foreground">ZeroWaste Connect</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Title */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode + '-title'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold text-foreground">
                  {mode === 'login' ? 'Sign in' : 'Create account'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === 'login'
                    ? 'Enter your credentials to access your dashboard'
                    : 'Fill in the details below to get started'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form with slide animation */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={mode}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {mode === 'login' ? (
                <LoginForm onSwitch={() => switchTo('register')} />
              ) : (
                <RegisterForm onSwitch={() => switchTo('login')} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}