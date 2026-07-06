package com.example.zerowaste.repository;

import com.example.zerowaste.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByDonorEmail(String donorEmail);
    List<Donation> findByDonorEmailAndStatus(
        String donorEmail,
        String status
);

}