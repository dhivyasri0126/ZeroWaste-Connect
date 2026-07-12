import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, Gift, Inbox, History, Settings
} from 'lucide-react';

import DashboardLayout from '../components/layout/DashboardLayout';
import RecipientHome from './RecipientHome';
import Profile from '../donar/Profile';
import SettingsPage from '../donar/Settings';
import AvailableDonations from './AvailableDonations';
import MyRequests from './MyRequests';
import RequestHistory from './RequestHistory';

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile',    label: 'My Profile', icon: User },
  { id: 'available',  label: 'Available Donations', icon: Gift },
  { id: 'requests',   label: 'My Requests', icon: Inbox },
  { id: 'history',    label: 'Request History', icon: History },
  { id: 'settings',   label: 'Settings', icon: Settings },
];

export default function RecipientDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState('dashboard');

  // Auth guard — redirect if no token
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const pageMap = {
    dashboard: <RecipientHome />,
    profile: <Profile />,
    available: <AvailableDonations />,
    requests: <MyRequests />,
    history: <RequestHistory />,
    settings: <SettingsPage />,
  };

  return (
    <DashboardLayout
      sidebarItems={NAV_ITEMS}
      activePage={page}
      onNavigate={setPage}
    >
      {pageMap[page] || <RecipientHome />}
    </DashboardLayout>
  );
}