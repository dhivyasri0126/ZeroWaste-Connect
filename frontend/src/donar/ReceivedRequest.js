import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Inbox, Loader2, CheckCircle, XCircle } from 'lucide-react';
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

export default function ReceivedRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null); // tracks which row is pending

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/request/received`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Unable to fetch requests');
      const data = await response.json();
      setRequests(data);
    } catch {
      toast.error('Unable to load requests. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function acceptRequest(id) {
    setActionId(id + '-accept');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/request/accept/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success('Request accepted successfully!');
        loadRequests();
      } else {
        toast.error('Unable to accept request. Please try again.');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setActionId(null);
    }
  }

  async function rejectRequest(id) {
    setActionId(id + '-reject');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/request/reject/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success('Request rejected.');
        loadRequests();
      } else {
        toast.error('Unable to reject request. Please try again.');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Received Requests</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review and respond to donation requests from recipients
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Inbox className="h-5 w-5 text-primary" aria-hidden="true" />
            Incoming Requests
            {!loading && requests.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {requests.length}
              </Badge>
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
                When recipients request your donations, they'll appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Food Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="hidden md:table-cell">Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.foodName}</TableCell>
                    <TableCell className="text-muted-foreground">{request.category}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground max-w-[180px] truncate">
                      {request.address}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {request.status === 'PENDING' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => acceptRequest(request.id)}
                            disabled={!!actionId}
                            aria-label={`Accept request for ${request.foodName}`}
                          >
                            {actionId === request.id + '-accept' ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1.5"
                            onClick={() => rejectRequest(request.id)}
                            disabled={!!actionId}
                            aria-label={`Reject request for ${request.foodName}`}
                          >
                            {actionId === request.id + '-reject' ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <StatusBadge status={request.status} />
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