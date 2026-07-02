package com.example.zerowaste.controller;

import com.example.zerowaste.entity.Donation;
import com.example.zerowaste.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donation")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationController {

    @Autowired
    private DonationService service;

    @PostMapping("/add")
    public Donation addDonation(@RequestBody Donation donation) {
        return service.saveDonation(donation);
    }

    @GetMapping("/all")
    public List<Donation> getAllDonations() {
        return service.getAllDonations();
    }

}