package com.example.zerowaste.controller;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.zerowaste.entity.Donation;
import com.example.zerowaste.repository.DonationRepository;
@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001","http://127.0.0.1:3000","http://127.0.0.1:3001"})
public class DashboardController {

    @Autowired
    private DonationRepository donationRepository;

    @GetMapping("/stats")
    public Map<String,Integer> stats(){

        Map<String,Integer> map=new HashMap<>();

        List<Donation> list=donationRepository.findAll();

        map.put("total",list.size());

        map.put("available",
                (int)list.stream()
                        .filter(d->d.getStatus().equals("AVAILABLE"))
                        .count());

        map.put("completed",
                (int)list.stream()
                        .filter(d->d.getStatus().equals("COMPLETED"))
                        .count());

        map.put("pending",
                (int)list.stream()
                        .filter(d->d.getStatus().equals("PENDING"))
                        .count());

        return map;

    }

}