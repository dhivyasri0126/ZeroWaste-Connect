import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Search, Utensils, MapPin, Clock, Tag, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import API_BASE_URL from '../config/api';

function DonationCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-9 w-full mt-2" />
      </CardContent>
    </Card>
  );
}

function CategoryBadge({ category }) {
  const map = {
    Veg: 'success',
    'Non-Veg': 'destructive',
    Snacks: 'warning',
    Beverages: 'info',
    Clothes: 'secondary',
  };
  return <Badge variant={map[category] || 'secondary'}>{category}</Badge>;
}

export default function AvailableDonations() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);

  useEffect(() => {
    loadDonations();
  }, []);

  async function loadDonations() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/donation/all`, {
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

  async function requestFood(id, foodName) {
    setRequestingId(id);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}/request/add/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        toast.success(`Request sent for "${foodName}"! 🎉`);
      } else {
        const result = await response.text();
        toast.error(result || 'Unable to send request. Please try again.');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setRequestingId(null);
    }
  }

  const filtered = donations.filter(
    (d) => d.foodName && d.foodName.toLowerCase().includes(search.toLowerCase())
  );

  function formatExpiry(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Available Donations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse and request food donations from your community
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search donations…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
          aria-label="Search available donations"
        />
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-muted-foreground">
          {search
            ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search}"`
            : `${donations.length} donation${donations.length !== 1 ? 's' : ''} available`}
        </p>
      )}

      {/* Skeleton Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <DonationCardSkeleton key={i} />)}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Utensils className="h-16 w-16 text-muted-foreground/40 mb-4" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {search ? 'No results found' : 'No donations available'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {search
              ? `No donations match "${search}". Try a different search term.`
              : 'Check back later for new food donations from donors in your area.'}
          </p>
          {search && (
            <Button variant="outline" className="mt-4" onClick={() => setSearch('')}>
              Clear search
            </Button>
          )}
        </div>
      )}

      {/* Donation Cards Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.04 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                <CardContent className="p-5 flex flex-col flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-foreground line-clamp-1 text-base">
                      {item.foodName}
                    </h3>
                    <CategoryBadge category={item.category} />
                  </div>

                  {/* Details */}
                  <dl className="space-y-1.5 text-sm flex-1">
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
                      <dt className="sr-only">Quantity</dt>
                      <dd className="text-foreground">{item.quantity}</dd>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
                      <dt className="sr-only">Address</dt>
                      <dd className="text-muted-foreground line-clamp-2">{item.address}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
                      <dt className="sr-only">Expiry</dt>
                      <dd className="text-muted-foreground">{formatExpiry(item.expiryTime)}</dd>
                    </div>
                  </dl>

                  {/* Status + CTA */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <Button
                      className="w-full"
                      onClick={() => requestFood(item.id, item.foodName)}
                      disabled={requestingId === item.id}
                      aria-label={`Request ${item.foodName}`}
                    >
                      {requestingId === item.id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Requesting…
                        </>
                      ) : (
                        'Request Food'
                      )}
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