package com.example.zerowaste.repository;

import com.example.zerowaste.entity.DonationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRequestRepository extends JpaRepository<DonationRequest, Long> {

    List<DonationRequest> findByRecipientEmail(String recipientEmail);

    List<DonationRequest> findByDonorEmail(String donorEmail);

}