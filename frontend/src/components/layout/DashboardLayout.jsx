import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * DashboardLayout — wraps Donor and Recipient dashboards
 * Props:
 *  - sidebarItems: array of nav items
 *  - activePage: string
 *  - onNavigate: (page) => void
 *  - children: page content
 */
export default function DashboardLayout({ sidebarItems, activePage, onNavigate, children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Apply theme to <html> element (Tailwind dark mode)
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function applyTheme(selectedTheme) {
    const html = document.documentElement;
    html.classList.remove('dark');

    if (selectedTheme === 'dark') {
      html.classList.add('dark');
    } else if (selectedTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) html.classList.add('dark');
    }
    // 'light' — no class needed (default)
  }

  function handleThemeChange(newTheme) {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  // Brand header for Sidebar
  const sidebarHeader = (
    <div className="flex items-center gap-2">
      <span className="text-xl">🌱</span>
      <span className="font-bold text-sm text-sidebar-foreground">ZeroWaste Connect</span>
    </div>
  );

  const pageVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        activePage={activePage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        header={sidebarHeader}
      />

      {/* Main Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onMenuToggle={() => setSidebarOpen((v) => !v)}
          onLogout={handleLogout}
          user={user}
          theme={theme}
          onThemeChange={handleThemeChange}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="h-full p-4 sm:p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
