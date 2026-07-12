import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Trash2, Edit3, Package, Loader2, AlertTriangle
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent } from '../components/ui/card';

function StatusBadge({ status }) {
  const variantMap = {
    AVAILABLE: 'default',
    COMPLETED: 'success',
    PENDING: 'warning',
    ACCEPTED: 'info',
  };
  return <Badge variant={variantMap[status] || 'secondary'}>{status}</Badge>;
}

function DonationCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    loadMyDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMyDonations() {
    try {
      const response = await fetch('http://localhost:8081/donation/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDonations(data);
    } catch {
      toast.error('Unable to load donations. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function promptDelete(id) {
    setPendingDeleteId(id);
    setDialogOpen(true);
  }

  async function confirmDelete() {
    const id = pendingDeleteId;
    setDialogOpen(false);
    setDeletingId(id);
    try {
      const response = await fetch(`http://localhost:8081/donation/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.text();
      if (response.ok) {
        toast.success(result || 'Donation deleted successfully.');
        loadMyDonations();
      } else {
        toast.error(result || 'Unable to delete donation.');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Donations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your active and past donations
          </p>
        </div>
        {!loading && donations.length > 0 && (
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {donations.length} {donations.length === 1 ? 'donation' : 'donations'}
          </Badge>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
              Delete Donation
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this donation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Skeleton Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <DonationCardSkeleton key={i} />)}
        </div>
      )}

      {/* Empty State */}
      {!loading && donations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground/40 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-foreground mb-1">No donations yet</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            You haven't made any donations yet. Click "Add Donation" in the sidebar to get started.
          </p>
        </div>
      )}

      {/* Donation Cards Grid */}
      {!loading && donations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {donations.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-foreground line-clamp-1 text-base">
                      {item.foodName}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>

                  <dl className="space-y-1.5 text-sm flex-1">
                    <div className="flex items-center gap-1">
                      <dt className="text-muted-foreground min-w-[72px]">Category:</dt>
                      <dd className="text-foreground">{item.category}</dd>
                    </div>
                    <div className="flex items-center gap-1">
                      <dt className="text-muted-foreground min-w-[72px]">Quantity:</dt>
                      <dd className="text-foreground">{item.quantity}</dd>
                    </div>
                    <div className="flex items-start gap-1">
                      <dt className="text-muted-foreground min-w-[72px] mt-0.5">Address:</dt>
                      <dd className="text-foreground line-clamp-2">{item.address}</dd>
                    </div>
                  </dl>

                  <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5"
                      disabled={deletingId === item.id}
                      aria-label={`Edit ${item.foodName}`}
                    >
                      <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => promptDelete(item.id)}
                      disabled={deletingId === item.id}
                      aria-label={`Delete ${item.foodName}`}
                    >
                      {deletingId === item.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}