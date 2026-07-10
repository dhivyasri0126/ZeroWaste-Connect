package com.example.zerowaste.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class DonationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long donationId;

    private String donorEmail;

    private String recipientEmail;

    private String status;
    private LocalDateTime requestTime;
    private String foodName;

private String category;

private String quantity;

private String address;

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
    public LocalDateTime getRequestTime() {
    return requestTime;
}

public void setRequestTime(LocalDateTime requestTime) {
    this.requestTime = requestTime;
}
public String getFoodName() {
    return foodName;
}

public void setFoodName(String foodName) {
    this.foodName = foodName;
}

public String getCategory() {
    return category;
}

public void setCategory(String category) {
    this.category = category;
}

public String getQuantity() {
    return quantity;
}

public void setQuantity(String quantity) {
    this.quantity = quantity;
}

public String getAddress() {
    return address;
}

public void setAddress(String address) {
    this.address = address;
}
}