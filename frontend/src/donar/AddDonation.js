import React, { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Utensils, Hash, Clock, MapPin, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../components/ui/select';
import API_BASE_URL from '../config/api';

function FormRow({ label, id, required, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}{required && <span className="ml-0.5 text-destructive" aria-hidden="true">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive" role="alert">{error}</p>}
    </div>
  );
}

export default function AddDonation() {
  const [donation, setDonation] = useState({
    donationType: '',
    foodName: '',
    category: '',
    quantity: '',
    expiryTime: '',
    address: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem('token');

  function handleChange(field, value) {
    setDonation((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  }

  function validate() {
    const e = {};
    if (!donation.donationType) e.donationType = 'Please select a donation type';
    if (!donation.foodName?.trim()) e.foodName = 'Item name is required';
    if (!donation.category) e.category = 'Please select a category';
    if (!donation.quantity?.trim()) e.quantity = 'Quantity is required';
    if (!donation.expiryTime) e.expiryTime = 'Expiry time is required';
    if (!donation.address?.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function addDonation(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/donation/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donation),
      });

      if (response.ok) {
        toast.success('Donation added successfully! 🎉');
        // Reset form
        setDonation({
          donationType: '',
          foodName: '',
          category: '',
          quantity: '',
          expiryTime: '',
          address: '',
          description: '',
        });
      } else {
        toast.error('Unable to add donation. Please try again.');
      }
    } catch {
      toast.error('Server error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Add Donation</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Share food or supplies with your community
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Donation Details</CardTitle>
          <CardDescription>
            Fields marked with <span className="text-destructive font-medium">*</span> are required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addDonation} className="space-y-5" noValidate>
            {/* Donation Type */}
            <FormRow label="Donation Type" id="donationType" required error={errors.donationType}>
              <Select
                value={donation.donationType}
                onValueChange={(v) => handleChange('donationType', v)}
              >
                <SelectTrigger id="donationType" aria-invalid={!!errors.donationType}>
                  <SelectValue placeholder="Select donation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Dress">Dress</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>

            {/* Food/Item Name */}
            <FormRow label="Item Name" id="foodName" required error={errors.foodName}>
              <div className="relative">
                <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input
                  id="foodName"
                  type="text"
                  placeholder="e.g. Rice, Pasta, T-shirts..."
                  value={donation.foodName}
                  onChange={(e) => handleChange('foodName', e.target.value)}
                  aria-invalid={!!errors.foodName}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
            </FormRow>

            {/* Category */}
            <FormRow label="Category" id="category" required error={errors.category}>
              <Select
                value={donation.category}
                onValueChange={(v) => handleChange('category', v)}
              >
                <SelectTrigger id="category" aria-invalid={!!errors.category}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veg">Veg</SelectItem>
                  <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                  <SelectItem value="Snacks">Snacks</SelectItem>
                  <SelectItem value="Beverages">Beverages</SelectItem>
                  <SelectItem value="Clothes">Clothes</SelectItem>
                </SelectContent>
              </Select>
            </FormRow>

            {/* Quantity */}
            <FormRow
              label="Quantity"
              id="quantity"
              required
              hint="e.g. 5 kg, 10 plates, 3 bags"
              error={errors.quantity}
            >
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input
                  id="quantity"
                  type="text"
                  placeholder="e.g. 5 kg"
                  value={donation.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  aria-invalid={!!errors.quantity}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
            </FormRow>

            {/* Expiry Time */}
            <FormRow
              label="Expiry / Pickup Deadline"
              id="expiryTime"
              required
              hint="When should this be picked up by?"
              error={errors.expiryTime}
            >
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input
                  id="expiryTime"
                  type="datetime-local"
                  value={donation.expiryTime}
                  onChange={(e) => handleChange('expiryTime', e.target.value)}
                  aria-invalid={!!errors.expiryTime}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
            </FormRow>

            {/* Address */}
            <FormRow label="Pickup Address" id="address" required error={errors.address}>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Input
                  id="address"
                  type="text"
                  placeholder="Where can this be picked up?"
                  value={donation.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  aria-invalid={!!errors.address}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
            </FormRow>

            {/* Description */}
            <FormRow label="Description" id="description" hint="Optional additional details about the donation">
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
                <Textarea
                  id="description"
                  placeholder="Any additional details..."
                  rows={4}
                  value={donation.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="pl-9"
                  disabled={loading}
                />
              </div>
            </FormRow>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Adding donation…
                </>
              ) : (
                'Donate Now'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}