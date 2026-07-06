package com.example.zerowaste.service;

import com.example.zerowaste.entity.Donation;
import com.example.zerowaste.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository repository;

    public Donation addDonation(Donation donation, String email) {

        donation.setDonorEmail(email);
        donation.setStatus("AVAILABLE");

        return repository.save(donation);
    }

    public List<Donation> getAllDonations() {
        return repository.findAll();
    }

    public Donation getDonationById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Donation updateDonation(Donation donation) {
        return repository.save(donation);
    }

    public boolean deleteDonation(Long id, String email) {

    Donation donation = repository.findById(id).orElse(null);

    if (donation == null) {
        return false;
    }

    // Only owner can delete
    if (!donation.getDonorEmail().equals(email)) {
        return false;
    }

    repository.delete(donation);

    return true;
}
    public List<Donation> getMyDonations(String email) {
    return repository.findByDonorEmail(email);
}
    public Donation updateDonation(Long id, Donation updatedDonation, String email) {

    Donation donation = repository.findById(id).orElse(null);

    if (donation == null) {
        return null;
    }

    // Only the owner can update
    if (!donation.getDonorEmail().equals(email)) {
        return null;
    }

    donation.setDonationType(updatedDonation.getDonationType());
    donation.setFoodName(updatedDonation.getFoodName());
    donation.setCategory(updatedDonation.getCategory());
    donation.setQuantity(updatedDonation.getQuantity());
    donation.setExpiryTime(updatedDonation.getExpiryTime());
    donation.setAddress(updatedDonation.getAddress());
    donation.setDescription(updatedDonation.getDescription());

    return repository.save(donation);
}
public List<Donation> getDonationHistory(String email) {
    return repository.findByDonorEmailAndStatus(email, "COMPLETED");
}
}