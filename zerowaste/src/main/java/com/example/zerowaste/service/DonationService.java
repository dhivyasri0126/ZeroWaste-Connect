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

    public Donation addDonation(Donation donation) {
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

    public void deleteDonation(Long id) {
        repository.deleteById(id);
    }
}