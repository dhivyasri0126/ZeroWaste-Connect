import React from 'react';
import { Menu, Sun, Moon, Monitor, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

/**
 * Top Navbar — shared for Donor and Recipient dashboards
 * Props:
 *  - onMenuToggle: () => void (hamburger for mobile)
 *  - onLogout: () => void
 *  - user: { name, email, role }
 *  - theme: 'light' | 'dark' | 'system'
 *  - onThemeChange: (theme) => void
 */
export default function Navbar({ onMenuToggle, onLogout, user, theme, onThemeChange }) {
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const themeIcons = {
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    system: <Monitor className="h-4 w-4" />,
  };

  const nextTheme = { light: 'dark', dark: 'system', system: 'light' };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-sm px-4">
      {/* Hamburger — mobile only */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuToggle}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Brand — mobile only (desktop shows in sidebar) */}
      <div className="flex items-center gap-2 lg:hidden">
        <span className="text-lg font-bold text-primary">🌱</span>
        <span className="font-semibold text-sm text-foreground">ZeroWaste Connect</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onThemeChange && onThemeChange(nextTheme[theme] || 'light')}
        aria-label={`Current theme: ${theme}. Click to switch theme.`}
        title={`Theme: ${theme}`}
      >
        {themeIcons[theme] || themeIcons.light}
      </Button>

      {/* User Avatar + Name */}
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium leading-none">{user?.name || 'User'}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {user?.role?.toLowerCase() || ''}
          </span>
        </div>
      </div>

      {/* Logout */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogout}
        className="gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        aria-label="Logout"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </header>
  );
}
