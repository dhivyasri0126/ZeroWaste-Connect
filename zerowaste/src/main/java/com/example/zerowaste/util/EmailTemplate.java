package com.example.zerowaste.util;

public class EmailTemplate {

    public static String welcomeEmail(String name, String email) {

        return """
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;background:#f4f6f9;font-family:Arial,sans-serif;">

<table width="100%%" bgcolor="#f4f6f9" cellpadding="30">

<tr>
<td align="center">

<table width="650" style="background:white;border-radius:12px;overflow:hidden;">

<tr>

<td style="background:#2E7D32;color:white;padding:35px;text-align:center;">

<h1>🌱 ZeroWaste Connect</h1>

<p>Reducing Food Waste • Feeding Communities</p>

</td>

</tr>

<tr>

<td style="padding:40px;">

<h2 style="color:#2E7D32;">
Welcome %s 👋
</h2>

<p>

Your account has been created successfully.

</p>

<p>

Thank you for joining ZeroWaste Connect.

Together we can reduce food waste and help people in need.

</p>

<table width="100%%"
style="background:#F3FFF6;
padding:15px;
border-left:5px solid green;">

<tr>

<td>

<b>Name</b><br>
%s

<br><br>

<b>Email</b><br>
%s

</td>

</tr>

</table>

<br>

<div align="center">

<a href="http://localhost:3000/login"

style="

background:#2E7D32;

color:white;

padding:15px 30px;

text-decoration:none;

border-radius:6px;

font-weight:bold;

">

Login Now

</a>

</div>

<br>

<p>

Thank you for supporting our mission to reduce food waste.

</p>

</td>

</tr>

<tr>

<td style="background:#263238;color:white;padding:20px;text-align:center;">

ZeroWaste Connect

<br>

zerowasteconnect.project@gmail.com

<br><br>

© 2026 ZeroWaste Connect

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
""".formatted(name, name, email);
    }
}