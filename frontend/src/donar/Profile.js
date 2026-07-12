import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Skeleton } from '../components/ui/skeleton';

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-50 dark:bg-primary-950">
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-foreground mt-0.5 break-words">
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8081/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Unable to fetch profile');
      const data = await response.json();
      setUser(data);
    } catch {
      toast.error('Unable to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (loading) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Separator />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-1">
                <Skeleton className="h-9 w-9 rounded-md" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your account information
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          {/* Avatar + Name hero */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 text-xl">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
              <Badge variant={user?.role === 'DONOR' ? 'default' : 'info'} className="mt-1">
                {user?.role}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Separator className="mb-2" />

          <div className="divide-y divide-border">
            <ProfileField icon={Mail} label="Email Address" value={user?.email} />
            <ProfileField icon={Phone} label="Phone Number" value={user?.phone} />
            <ProfileField icon={MapPin} label="Address" value={user?.address} />
            <ProfileField icon={Shield} label="Account Role" value={user?.role} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}