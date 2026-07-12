import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, PlusCircle, Package,
  Inbox, History, Settings
} from 'lucide-react';

import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import AddDonation from './AddDonation';
import MyDonations from '../pages/MyDonations';
import DonationHistory from './DonationHistory';
import ReceivedRequest from './ReceivedRequest';
import SettingsPage from './Settings';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile',   label: 'My Profile', icon: User },
  { id: 'add',       label: 'Add Donation', icon: PlusCircle },
  { id: 'mydonations', label: 'My Donations', icon: Package },
  { id: 'received',  label: 'Received Requests', icon: Inbox },
  { id: 'history',   label: 'Donation History', icon: History },
  { id: 'settings',  label: 'Settings', icon: Settings },
];

export default function DonarDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState('dashboard');

  // Auth guard — redirect if no token
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const pageMap = {
    dashboard: <DashboardHome />,
    profile: <Profile />,
    add: <AddDonation />,
    mydonations: <MyDonations />,
    received: <ReceivedRequest />,
    history: <DonationHistory />,
    settings: <SettingsPage />,
  };

  return (
    <DashboardLayout
      sidebarItems={NAV_ITEMS}
      activePage={page}
      onNavigate={setPage}
    >
      {pageMap[page] || <DashboardHome />}
    </DashboardLayout>
  );
}