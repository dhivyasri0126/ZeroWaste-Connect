package com.example.zerowaste.entity;

import jakarta.persistence.*;

@Entity
public class DonationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long donationId;

    private String donorEmail;

    private String recipientEmail;

    private String status;

    public DonationRequest() {
    }

    public DonationRequest(Long id, Long donationId,
                           String donorEmail,
                           String recipientEmail,
                           String status) {
        this.id = id;
        this.donationId = donationId;
        this.donorEmail = donorEmail;
        this.recipientEmail = recipientEmail;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDonationId() {
        return donationId;
    }

    public void setDonationId(Long donationId) {
        this.donationId = donationId;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}