import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Lock, Sun, Moon, Monitor, Eye, EyeOff,
  Loader2, Bell, Info, Settings as SettingsIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { cn } from '../lib/utils';

/* ── Theme Option Button ─────────────────────────────── */
function ThemeOption({ value, label, icon: Icon, current, onChange }) {
  const isActive = current === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={cn(
        'flex flex-1 flex-col items-center gap-2 rounded-lg border px-3 py-4 text-sm font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        isActive
          ? 'border-primary bg-primary-50 dark:bg-primary-950 text-primary'
          : 'border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
      aria-pressed={isActive}
      aria-label={`${label} theme`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  );
}

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const [emailNotification, setEmailNotification] = useState(true);
  const [requestNotification, setRequestNotification] = useState(true);
  const [pickupNotification, setPickupNotification] = useState(true);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

  // Apply theme on mount and change
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function applyTheme(selected) {
    const html = document.documentElement;
    html.classList.remove('dark');
    if (selected === 'dark') {
      html.classList.add('dark');
    } else if (selected === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
      }
    }
  }

  function handleThemeChange(selected) {
    setTheme(selected);
    localStorage.setItem('theme', selected);
  }

  async function changePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,15}$/.test(newPassword)) {
      toast.error('Password must be 8-15 characters with uppercase, lowercase, number and special character.');
      return;
    }

    setPwLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/auth/changepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const result = await response.text();
      if (response.ok) {
        toast.success(result || 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(result || 'Unable to update password. Please try again.');
      }
    } catch {
      toast.error('Server error. Please check your connection.');
    } finally {
      setPwLoading(false);
    }
  }

  function PasswordInput({ id, value, onChange, show, onToggle, placeholder, autoComplete }) {
    return (
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="pl-9 pr-10"
          disabled={pwLoading}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lock className="h-5 w-5 text-primary" aria-hidden="true" />
            Change Password
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="current-password">Current Password</Label>
            <PasswordInput
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              show={showCurrent}
              onToggle={() => setShowCurrent((v) => !v)}
              placeholder="Enter current password"
              autoComplete="current-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="new-password">New Password</Label>
            <PasswordInput
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <PasswordInput
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
          </div>
          <Button onClick={changePassword} disabled={pwLoading} className="w-full sm:w-auto">
            {pwLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Updating…
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
            Notifications
          </CardTitle>
          <CardDescription>Control which notifications you receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0 divide-y divide-border">
            {[
              {
                id: 'email-notif',
                label: 'Email Notifications',
                description: 'Receive updates via email',
                value: emailNotification,
                onChange: setEmailNotification,
              },
              {
                id: 'request-notif',
                label: 'Request Notifications',
                description: 'Get notified when someone requests your donation',
                value: requestNotification,
                onChange: setRequestNotification,
              },
              {
                id: 'pickup-notif',
                label: 'Pickup Notifications',
                description: 'Get notified when a pickup is confirmed',
                value: pickupNotification,
                onChange: setPickupNotification,
              },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <Label htmlFor={item.id} className="font-medium cursor-pointer">
                    {item.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                </div>
                <Switch
                  id={item.id}
                  checked={item.value}
                  onCheckedChange={item.onChange}
                  aria-label={item.label}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <SettingsIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            Appearance
          </CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3" role="group" aria-label="Theme selection">
            <ThemeOption value="light" label="Light" icon={Sun} current={theme} onChange={handleThemeChange} />
            <ThemeOption value="dark" label="Dark" icon={Moon} current={theme} onChange={handleThemeChange} />
            <ThemeOption value="system" label="System" icon={Monitor} current={theme} onChange={handleThemeChange} />
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-primary" aria-hidden="true" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            {[
              { label: 'Project', value: 'ZeroWaste Connect' },
              { label: 'Version', value: '2.0' },
              { label: 'Developer', value: 'Dhivyasri' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <dt className="text-muted-foreground min-w-[80px]">{label}</dt>
                <dd className="font-medium text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}