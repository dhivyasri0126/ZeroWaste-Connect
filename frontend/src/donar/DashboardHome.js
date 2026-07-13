import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift, CheckCircle2, Clock, Package,
  TrendingUp
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '../components/ui/table';
import API_BASE_URL from '../config/api';

/* ── Stat Card ─────────────────────────────────────── */
function StatCard({ title, value, icon: Icon, color, loading }) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ── Custom Tooltip for Recharts ────────────────────── */
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-border bg-popover p-3 shadow-md">
        <p className="text-sm font-medium text-popover-foreground">{payload[0].name}</p>
        <p className="text-lg font-bold text-popover-foreground">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

/* ── Status Badge helper ────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    COMPLETED: 'success',
    AVAILABLE: 'default',
    PENDING: 'warning',
    ACCEPTED: 'info',
  };
  return (
    <Badge variant={map[status] || 'secondary'}>
      {status}
    </Badge>
  );
}

/* ── CHART COLORS (from design system chart tokens) ── */
const CHART_COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

/* ══════════════════════════════════════════════════════
   DashboardHome
════════════════════════════════════════════════════════ */
export default function DashboardHome() {
  const [stats, setStats] = useState({ total: 0, available: 0, completed: 0, pending: 0 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([loadStats(), loadHistory()]).finally(() => setLoading(false));
  }, []);

  async function loadStats() {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setStats(await res.json());
    } catch {/* silent */ }
  }

  async function loadHistory() {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/donation/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setHistory(await res.json());
    } catch {/* silent */ }
  }

  const pieData = [
    { name: 'Available', value: stats.available },
    { name: 'Completed', value: stats.completed },
    { name: 'Pending', value: stats.pending },
  ];

  const statCards = [
    { title: 'Total Donations', value: stats.total, icon: Gift, color: 'bg-primary-500' },
    { title: 'Available', value: stats.available, icon: Package, color: 'bg-success-500' },
    { title: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'bg-info-500' },
    { title: 'Pending', value: stats.pending, icon: Clock, color: 'bg-warning-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your donation activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <StatCard {...card} loading={loading} />
          </motion.div>
        ))}
      </div>

      {/* Charts + History Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
              Donation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[280px] w-full rounded-md" />
            ) : stats.total === 0 ? (
              <div className="flex h-[280px] flex-col items-center justify-center text-center">
                <Gift className="h-12 w-12 text-muted-foreground/40 mb-3" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">No donations yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Add your first donation to see statistics
                </p>
              </div>
            ) : (
              <div
                role="img"
                aria-label={`Donation status chart: ${stats.available} available, ${stats.completed} completed, ${stats.pending} pending`}
              >
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={3}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{ fontSize: '13px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Completed Donations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground/40 mb-3" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">No completed donations yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Food</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.slice(0, 5).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.foodName}</TableCell>
                      <TableCell className="text-muted-foreground">{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}