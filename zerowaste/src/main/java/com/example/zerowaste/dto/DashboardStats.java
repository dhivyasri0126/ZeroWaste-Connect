package com.example.zerowaste.dto;

public class DashboardStats {

    private long totalDonations;
    private long availableDonations;
    private long completedDonations;

    public DashboardStats() {
    }

    public DashboardStats(long totalDonations,
                          long availableDonations,
                          long completedDonations) {

        this.totalDonations = totalDonations;
        this.availableDonations = availableDonations;
        this.completedDonations = completedDonations;
    }

    public long getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(long totalDonations) {
        this.totalDonations = totalDonations;
    }

    public long getAvailableDonations() {
        return availableDonations;
    }

    public void setAvailableDonations(long availableDonations) {
        this.availableDonations = availableDonations;
    }

    public long getCompletedDonations() {
        return completedDonations;
    }

    public void setCompletedDonations(long completedDonations) {
        this.completedDonations = completedDonations;
    }

}