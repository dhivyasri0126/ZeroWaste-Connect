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
}