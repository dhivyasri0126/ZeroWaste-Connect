import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ClipboardList, Clock, CheckCircle2, PackageCheck, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '../components/ui/table';

function StatCard({ title, value, icon: Icon, color, loading }) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
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
  );
}

function StatusBadge({ status }) {
  const map = {
    PENDING: 'warning',
    ACCEPTED: 'success',
    REJECTED: 'destructive',
    COMPLETED: 'info',
  };
  return <Badge variant={map[status] || 'secondary'}>{status}</Badge>;
}

export default function RecipientHome() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/request/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setRequests(data);
    } catch {
      toast.error('Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }

  const total = requests.length;
  const pending = requests.filter((r) => r.status === 'PENDING').length;
  const accepted = requests.filter((r) => r.status === 'ACCEPTED').length;
  const completed = requests.filter((r) => r.status === 'COMPLETED').length;

  const statCards = [
    { title: 'Total Requests', value: total, icon: ClipboardList, color: 'bg-primary-500' },
    { title: 'Pending', value: pending, icon: Clock, color: 'bg-warning-500' },
    { title: 'Accepted', value: accepted, icon: CheckCircle2, color: 'bg-success-500' },
    { title: 'Completed', value: completed, icon: PackageCheck, color: 'bg-info-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your food request activity
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

      {/* Recent Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
            Recent Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground/40 mb-3" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">No requests yet.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Browse available donations to make your first request.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Donation ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Requested At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.slice(0, 5).map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium text-muted-foreground">#{req.id}</TableCell>
                    <TableCell>#{req.donationId}</TableCell>
                    <TableCell><StatusBadge status={req.status} /></TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {new Date(req.requestTime).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}