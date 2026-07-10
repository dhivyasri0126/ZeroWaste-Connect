package com.example.zerowaste.service;

import com.example.zerowaste.entity.Donation;
import com.example.zerowaste.entity.DonationRequest;
import com.example.zerowaste.repository.DonationRepository;
import com.example.zerowaste.repository.DonationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DonationRequestService {

    @Autowired
    private DonationRequestRepository requestRepository;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
private EmailService emailService;

    // Recipient requests a donation
    public DonationRequest requestDonation(Long donationId, String recipientEmail) {

        Donation donation = donationRepository.findById(donationId).orElse(null);

        if (donation == null) {
            return null;
        }

        // Donation must be available
        if (!donation.getStatus().equals("AVAILABLE")) {
            return null;
        }

        // Donor cannot request own donation
        if (donation.getDonorEmail().equals(recipientEmail)) {
            return null;
        }

        // Prevent duplicate request
        DonationRequest existing =
                requestRepository.findByDonationIdAndRecipientEmail(
                        donationId,
                        recipientEmail
                );

        if (existing != null) {
            return null;
        }
DonationRequest request = new DonationRequest();

request.setDonationId(donation.getId());
request.setDonorEmail(donation.getDonorEmail());
request.setRecipientEmail(recipientEmail);

// Copy donation details
request.setFoodName(donation.getFoodName());
request.setCategory(donation.getCategory());
request.setQuantity(donation.getQuantity());
request.setAddress(donation.getAddress());

request.setStatus("PENDING");
request.setRequestTime(LocalDateTime.now());

        String subject = "📩 New Donation Request | ZeroWaste Connect";
String html = String.format("""
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f5f5f5;font-family:Arial,sans-serif;">

<table width="100%%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="650" style="background:#ffffff;margin-top:30px;border-radius:10px;overflow:hidden;">

<tr style="background:#28a745;color:white;">
<td style="padding:25px;text-align:center;">
<h2>🌱 ZeroWaste Connect</h2>
<p>You have received a new donation request.</p>
</td>
</tr>

<tr>
<td style="padding:35px;">

<h3>Hello Donor 👋</h3>

<p>A recipient has requested your food donation.</p>

<table width="100%%" cellpadding="10"
style="border-collapse:collapse;border:1px solid #dddddd;">

<tr>
<td><b>Food Item</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>Category</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>Quantity</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>Pickup Address</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>Requested By</b></td>
<td>%s</td>
</tr>

</table>

<br>

<div style="text-align:center;">
<a href="http://localhost:3000/login"
style="
background:#28a745;
color:white;
padding:12px 25px;
text-decoration:none;
border-radius:6px;
font-weight:bold;">
View Request
</a>
</div>

</td>
</tr>

<tr style="background:#2c3e50;color:white;">
<td style="padding:20px;text-align:center;">
<b>ZeroWaste Connect</b><br>
Reducing Food Waste • Feeding Communities
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
""",
donation.getFoodName(),
donation.getCategory(),
donation.getQuantity(),
donation.getAddress(),
recipientEmail
);

emailService.sendHtmlEmail(
        donation.getDonorEmail(),
        subject,
        html
);


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

    // Donor accepts one request
    public DonationRequest acceptRequest(Long requestId, String donorEmail) {

        DonationRequest request = requestRepository.findById(requestId).orElse(null);

        if (request == null) {
            return null;
        }

        // Only donor can accept
        if (!request.getDonorEmail().equals(donorEmail)) {
            return null;
        }

        Donation donation =
                donationRepository.findById(request.getDonationId()).orElse(null);

        if (donation == null) {
            return null;
        }

        donation.setStatus("UNAVAILABLE");
        donationRepository.save(donation);

        List<DonationRequest> requests =
                requestRepository.findByDonationId(request.getDonationId());

    for (DonationRequest r : requests) {

    if (r.getId().equals(requestId)) {
        r.setStatus("ACCEPTED");
    }
    else if (r.getStatus().equals("PENDING")) {
        r.setStatus("REJECTED");
    }

    requestRepository.save(r);
}

DonationRequest acceptedRequest =
        requestRepository.findById(requestId).orElse(null);
String subject = "🎉 Donation Request Accepted | ZeroWaste Connect";

String html = String.format("""
<!DOCTYPE html>
<html>

<body style="margin:0;background:#f4f6f9;font-family:Arial,sans-serif;">

<table width="100%%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;margin-top:30px;border-radius:10px;overflow:hidden;box-shadow:0 3px 15px rgba(0,0,0,.2);">

<tr>
<td style="background:#28a745;padding:30px;text-align:center;color:white;">

<h1 style="margin:0;">🎉 ZeroWaste Connect</h1>

<p style="margin-top:10px;">
Your Donation Request has been Accepted
</p>

</td>
</tr>

<tr>

<td style="padding:35px;">

<h2 style="color:#28a745;">
Congratulations! 🎉
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">
Great news! Your donation request has been accepted by the donor.
Please contact the donor and collect the food before the expiry time.
</p>

<table width="100%%" cellpadding="10"
style="border-collapse:collapse;border:1px solid #dddddd;">

<tr>
<td><b>🍛 Food Item</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>📦 Category</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>🍽 Quantity</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>📍 Pickup Address</b></td>
<td>%s</td>
</tr>

</table>

<br>

<div style="text-align:center;">

<a href="http://localhost:3000/login"
style="
background:#28a745;
color:white;
padding:14px 30px;
text-decoration:none;
border-radius:6px;
font-weight:bold;">

View Request

</a>

</div>

<br>

<p style="color:#666;">
Thank you for helping reduce food waste and feeding communities.
</p>

</td>

</tr>

<tr>

<td style="background:#2c3e50;color:white;padding:20px;text-align:center;">

<b>ZeroWaste Connect</b>

<br><br>

📧 zerowasteconnect.project@gmail.com

<br>

© 2026 ZeroWaste Connect

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
""",
donation.getFoodName(),
donation.getCategory(),
donation.getQuantity(),
donation.getAddress()
);



emailService.sendHtmlEmail(
        acceptedRequest.getRecipientEmail(),
        subject,
        html
);

return acceptedRequest;
    }

    // Donor rejects a request
   public DonationRequest rejectRequest(Long requestId, String donorEmail) {

    DonationRequest request = requestRepository.findById(requestId).orElse(null);

    if (request == null) {
        return null;
    }

    if (!request.getDonorEmail().equals(donorEmail)) {
        return null;
    }

    request.setStatus("REJECTED");

    DonationRequest rejectedRequest = requestRepository.save(request);

    Donation donation =
            donationRepository.findById(request.getDonationId()).orElse(null);

    if (donation != null) {

        String subject = "❌ Donation Request Rejected | ZeroWaste Connect";

String html = String.format("""
<!DOCTYPE html>
<html>

<body style="margin:0;background:#f4f6f9;font-family:Arial,sans-serif;">

<table width="100%%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:white;margin-top:30px;border-radius:10px;overflow:hidden;box-shadow:0 3px 15px rgba(0,0,0,.2);">

<tr>

<td style="background:#dc3545;padding:30px;text-align:center;color:white;">

<h1 style="margin:0;">❌ ZeroWaste Connect</h1>

<p style="margin-top:10px;">
Donation Request Rejected
</p>

</td>

</tr>

<tr>

<td style="padding:35px;">

<h2 style="color:#dc3545;">
We're Sorry
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">

Unfortunately, your donation request was not accepted by the donor.

Don't worry! More donations will be available soon.

</p>

<table width="100%%" cellpadding="10"
style="border-collapse:collapse;border:1px solid #dddddd;">

<tr>
<td><b>🍛 Food Item</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>📦 Category</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>🍽 Quantity</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>📍 Pickup Address</b></td>
<td>%s</td>
</tr>

</table>

<br>

<div style="text-align:center;">

<a href="http://localhost:3000/donations"
style="
background:#dc3545;
color:white;
padding:14px 30px;
text-decoration:none;
border-radius:6px;
font-weight:bold;">

Browse More Donations

</a>

</div>

<br>

<p style="color:#666;">
Thank you for supporting ZeroWaste Connect.
We encourage you to request another available donation.
</p>

</td>

</tr>

<tr>

<td style="background:#2c3e50;color:white;padding:20px;text-align:center;">

<b>ZeroWaste Connect</b>

<br><br>

📧 zerowasteconnect.project@gmail.com

<br>

© 2026 ZeroWaste Connect

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
""",
donation.getFoodName(),
donation.getCategory(),
donation.getQuantity(),
donation.getAddress()
);

        emailService.sendHtmlEmail(
                rejectedRequest.getRecipientEmail(),
                subject,
                html
        );
    }

    return rejectedRequest;
}

    // Recipient confirms pickup
    public DonationRequest completeRequest(Long requestId,
                                           String recipientEmail) {

        DonationRequest request =
                requestRepository.findById(requestId).orElse(null);

        if (request == null) {
            return null;
        }

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
        String subject = "✅ Donation Successfully Completed | ZeroWaste Connect";

String html = String.format("""
<!DOCTYPE html>
<html>

<body style="margin:0;background:#f4f6f9;font-family:Arial,sans-serif;">

<table width="100%%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;margin-top:30px;border-radius:10px;overflow:hidden;box-shadow:0 3px 15px rgba(0,0,0,.2);">

<tr>

<td style="background:#007bff;padding:30px;text-align:center;color:white;">

<h1 style="margin:0;">🎉 ZeroWaste Connect</h1>

<p style="margin-top:10px;">
Donation Successfully Completed
</p>

</td>

</tr>

<tr>

<td style="padding:35px;">

<h2 style="color:#007bff;">
Thank You! 💙
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">

You have successfully collected the donated food.

Thank you for helping reduce food waste and making a positive impact in the community.

</p>

<table width="100%%" cellpadding="10"
style="border-collapse:collapse;border:1px solid #dddddd;">

<tr>
<td><b>🍛 Food Item</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>📦 Category</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>🍽 Quantity</b></td>
<td>%s</td>
</tr>

<tr>
<td><b>📍 Pickup Address</b></td>
<td>%s</td>
</tr>

</table>

<br>

<div style="text-align:center;">

<a href="http://localhost:3000/login"
style="
background:#007bff;
color:white;
padding:14px 30px;
text-decoration:none;
border-radius:6px;
font-weight:bold;">

Visit Dashboard

</a>

</div>

<br>

<p style="color:#666;line-height:24px;">

Together we are building a future with less food waste and more smiles.

Thank you for being part of ZeroWaste Connect.

</p>

</td>

</tr>

<tr>

<td style="background:#2c3e50;color:white;padding:20px;text-align:center;">

<b>ZeroWaste Connect</b>

<br><br>

📧 zerowasteconnect.project@gmail.com

<br>

© 2026 ZeroWaste Connect

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
""",
donation.getFoodName(),
donation.getCategory(),
donation.getQuantity(),
donation.getAddress()
);

emailService.sendHtmlEmail(
        request.getRecipientEmail(),
        subject,
        html
);

        return request;
    }
}