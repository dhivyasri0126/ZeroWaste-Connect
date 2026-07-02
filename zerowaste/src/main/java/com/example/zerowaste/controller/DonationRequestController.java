package com.example.zerowaste.controller;

import com.example.zerowaste.entity.DonationRequest;
import com.example.zerowaste.service.DonationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationRequestController {

    @Autowired
    private DonationRequestService service;

    // Recipient requests a donation
    @PostMapping("/add/{donationId}")
    public DonationRequest requestDonation(@PathVariable Long donationId,
                                           Authentication authentication) {

        String recipientEmail = authentication.getName();

        return service.requestDonation(donationId, recipientEmail);
    }

    // Recipient views their requests
    @GetMapping("/my")
    public List<DonationRequest> myRequests(Authentication authentication) {

        String recipientEmail = authentication.getName();

        return service.getMyRequests(recipientEmail);
    }

    // Donor views received requests
    @GetMapping("/received")
    public List<DonationRequest> receivedRequests(Authentication authentication) {

        String donorEmail = authentication.getName();

        return service.getReceivedRequests(donorEmail);
    }
}