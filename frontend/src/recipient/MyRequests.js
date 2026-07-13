import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Inbox, Loader2, PackageCheck } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import API_BASE_URL from '../config/api';

function StatusBadge({ status }) {
  const map = {
    PENDING: 'warning',
    ACCEPTED: 'success',
    REJECTED: 'destructive',
    COMPLETED: 'info',
  };
  return <Badge variant={map[status] || 'secondary'}>{status}</Badge>;
}

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/request/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setRequests(data);
    } catch {
      toast.error('Unable to load requests. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function confirmPickup(id) {
    setConfirmingId(id);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/request/complete/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success('Pickup confirmed! Thank you! 🎉');
        loadRequests();
      } else {
        toast.error('Unable to confirm pickup. Please try again.');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setConfirmingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track the status of your food donation requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Inbox className="h-5 w-5 text-primary" aria-hidden="true" />
            All Requests
            {!loading && requests.length > 0 && (
              <Badge variant="secondary" className="ml-auto">{requests.length}</Badge>
            )}
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
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <Inbox className="h-14 w-14 text-muted-foreground/40 mb-4" aria-hidden="true" />
              <h3 className="text-base font-semibold text-foreground mb-1">No requests yet</h3>
              <p className="text-sm text-muted-foreground">
                Browse available donations and make your first request.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Donation</TableHead>
                  <TableHead className="hidden sm:table-cell">Donor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Requested</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="text-muted-foreground font-mono text-xs">#{req.id}</TableCell>
                    <TableCell>#{req.donationId}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {req.donorEmail}
                    </TableCell>
                    <TableCell><StatusBadge status={req.status} /></TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                      {new Date(req.requestTime).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {req.status === 'ACCEPTED' ? (
                        <Button
                          size="sm"
                          className="gap-1.5"
                          onClick={() => confirmPickup(req.id)}
                          disabled={confirmingId === req.id}
                          aria-label={`Confirm pickup for request #${req.id}`}
                        >
                          {confirmingId === req.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                          ) : (
                            <PackageCheck className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                          Confirm Pickup
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">{req.status}</span>
                      )}
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