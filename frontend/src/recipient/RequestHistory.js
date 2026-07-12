import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { History, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from '../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

function StatusBadge({ status }) {
  const map = { COMPLETED: 'info', REJECTED: 'destructive' };
  return <Badge variant={map[status] || 'secondary'}>{status}</Badge>;
}

export default function RequestHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/request/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      // Preserve original filter: only COMPLETED and REJECTED requests
      const filtered = data.filter(
        (r) => r.status === 'COMPLETED' || r.status === 'REJECTED'
      );
      setHistory(filtered);
    } catch {
      toast.error('Unable to load request history. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Request History</h1>
        <p className="text-sm text-muted-foreground mt-1">
          A record of your completed and rejected requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-primary" aria-hidden="true" />
            Past Requests
            {!loading && history.length > 0 && (
              <Badge variant="secondary" className="ml-auto">{history.length}</Badge>
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
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <CheckCircle2 className="h-14 w-14 text-muted-foreground/40 mb-4" aria-hidden="true" />
              <h3 className="text-base font-semibold text-foreground mb-1">No history yet</h3>
              <p className="text-sm text-muted-foreground">
                Completed and rejected requests will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Donation</TableHead>
                  <TableHead className="hidden sm:table-cell">Donor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Requested At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">#{req.id}</TableCell>
                    <TableCell>#{req.donationId}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {req.donorEmail}
                    </TableCell>
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