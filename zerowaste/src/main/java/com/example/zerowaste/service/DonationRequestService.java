package com.example.zerowaste.service;

import com.example.zerowaste.entity.Donation;
import com.example.zerowaste.entity.DonationRequest;
import com.example.zerowaste.repository.DonationRepository;
import com.example.zerowaste.repository.DonationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationRequestService {

    @Autowired
    private DonationRequestRepository requestRepository;

    @Autowired
    private DonationRepository donationRepository;

    // Recipient requests a donation
    public DonationRequest requestDonation(Long donationId, String recipientEmail) {

        Donation donation = donationRepository.findById(donationId).orElse(null);

        if (donation == null) {
            return null;
        }

        DonationRequest request = new DonationRequest();

        request.setDonationId(donationId);
        request.setDonorEmail(donation.getDonorEmail());
        request.setRecipientEmail(recipientEmail);
        request.setStatus("PENDING");

        return requestRepository.save(request);
    }

    // Recipient views their requests
    public List<DonationRequest> getMyRequests(String recipientEmail) {
        return requestRepository.findByRecipientEmail(recipientEmail);
    }

    // Donor views received requests
    public List<DonationRequest> getReceivedRequests(String donorEmail) {
        return requestRepository.findByDonorEmail(donorEmail);
    }
    // Donor accepts a request
    public DonationRequest acceptRequest(Long requestId, String donorEmail) {

    DonationRequest request = requestRepository.findById(requestId).orElse(null);

    if (request == null) {
        return null;
    }

    // Only the donor can accept
    if (!request.getDonorEmail().equals(donorEmail)) {
        return null;
    }

    // Mark donation as unavailable
    Donation donation = donationRepository.findById(request.getDonationId()).orElse(null);

    if (donation != null) {
        donation.setStatus("UNAVAILABLE");
        donationRepository.save(donation);
    }

    // Get all requests for this donation
    List<DonationRequest> requests =
            requestRepository.findByDonationId(request.getDonationId());

    // Accept one, reject the rest
    for (DonationRequest r : requests) {

        if (r.getId().equals(requestId)) {
            r.setStatus("ACCEPTED");
        } else if (r.getStatus().equals("PENDING")) {
            r.setStatus("REJECTED");
        }

        requestRepository.save(r);
    }

    return requestRepository.findById(requestId).orElse(null);
}

// Donor rejects a request
public DonationRequest rejectRequest(Long requestId, String donorEmail) {

    DonationRequest request = requestRepository.findById(requestId).orElse(null);

    if (request == null) {
        return null;
    }

    // Only donor can reject
    if (!request.getDonorEmail().equals(donorEmail)) {
        return null;
    }

    request.setStatus("REJECTED");

    return requestRepository.save(request);
}
        // Recipient confirms pickup
public DonationRequest completeRequest(Long requestId, String recipientEmail) {

    DonationRequest request =
            requestRepository.findById(requestId).orElse(null);

    if (request == null) {
        return null;
    }

    // Only accepted recipient can complete
    if (!request.getRecipientEmail().equals(recipientEmail)) {
        return null;
    }

    if (!request.getStatus().equals("ACCEPTED")) {
        return null;
    }

    request.setStatus("COMPLETED");

    requestRepository.save(request);

    Donation donation =
            donationRepository.findById(request.getDonationId()).orElse(null);

    if (donation != null) {

        donation.setStatus("COMPLETED");

        donationRepository.save(donation);
    }

    return request;
}
}