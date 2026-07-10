package com.example.zerowaste.controller;

import com.example.zerowaste.entity.Donation;
import com.example.zerowaste.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.zerowaste.dto.DashboardStats;

import java.util.List;

@RestController
@RequestMapping("/donation")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationController {

    @Autowired
    private DonationService service;

    // Add Donation
    @PostMapping("/add")
    public Donation addDonation(@RequestBody Donation donation,
                                Authentication authentication) {
                                       System.out.println(authentication.getName());
    System.out.println(authentication.getAuthorities());

        String email = authentication.getName();

        return service.addDonation(donation, email);
    }
    @GetMapping("/my")
    public List<Donation> getMyDonations(Authentication authentication) {

        String email = authentication.getName();

        return service.getMyDonations(email);
    }
    // View All Donations
    @GetMapping("/all")
    public List<Donation> getAllDonations() {
        return service.getAllDonations();
    }

    @PutMapping("/update/{id}")
    public Donation updateDonation(@PathVariable Long id,
                               @RequestBody Donation donation,
                               Authentication authentication) {

    String email = authentication.getName();

    return service.updateDonation(id, donation, email);
}
            @DeleteMapping("/delete/{id}")
        public String deleteDonation(@PathVariable Long id, Authentication authentication) {
                String email = authentication.getName();

                boolean deleted = service.deleteDonation(id, email);

                if (deleted) {
                    return "Donation Deleted Successfully";
                }

                return "You are not authorized to delete this donation";
        }
        @GetMapping("/test")
        public String test() {
            return "Donation Controller Working";
        }
        @GetMapping("/stats")
public DashboardStats dashboardStats(Authentication authentication){

    String email = authentication.getName();

    return service.getDashboardStats(email);

}
                // @GetMapping("/history")
        // public List<Donation> donationHistory(
        //         Authentication authentication) {

        //     String email = authentication.getName();

        //     return service.getDonationHistory(email);
        // }
      @GetMapping("/history")
    public List<Donation> donationHistory(Authentication authentication) {

    String email = authentication.getName();

    return service.getDonationHistory(email);
}

}
