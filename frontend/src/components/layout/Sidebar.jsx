import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

/**
 * Sidebar — shared layout for Donor and Recipient dashboards
 * Props:
 *  - items: [{ id, label, icon: LucideIcon, badge? }]
 *  - activePage: string
 *  - onNavigate: (id) => void
 *  - isOpen: boolean (mobile overlay state)
 *  - onClose: () => void
 *  - header: ReactNode (logo/brand)
 */
export default function Sidebar({
  items = [],
  activePage,
  onNavigate,
  isOpen,
  onClose,
  header,
}) {
  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { x: -280, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = activePage === item.id;

    return (
      <li>
        <button
          onClick={() => {
            onNavigate(item.id);
            onClose();
          }}
          aria-current={isActive ? 'page' : undefined}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
            isActive
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )}
        >
          {Icon && (
            <Icon
              className={cn('h-4 w-4 shrink-0', isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/70')}
              aria-hidden="true"
            />
          )}
          <span>{item.label}</span>
          {item.badge != null && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 px-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
              {item.badge}
            </span>
          )}
        </button>
      </li>
    );
  };

  const SidebarContent = () => (
    <aside
      className="flex h-full w-64 flex-col bg-sidebar-background border-r border-sidebar-border"
      aria-label="Sidebar navigation"
    >
      {/* Brand Header */}
      {header && (
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          {header}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {items.map((item) => (
            <NavItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar — always visible */}
      <div className="hidden lg:flex lg:shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar — overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onClose}
              aria-hidden="true"
            />
            {/* Sidebar Panel */}
            <motion.div
              key="sidebar"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
