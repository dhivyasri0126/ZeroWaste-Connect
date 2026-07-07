import React, { useEffect, useState } from "react";
import "../css/profile.css";

export default function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                "http://localhost:8081/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Unable to fetch profile");
            }

            const data = await response.json();

            setUser(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (

<div className="profile-container">

<h2>👤 My Profile</h2>

<div className="profile-card">

<div className="profile-row">
<label>Full Name</label>
<p>{user.name}</p>
</div>

<div className="profile-row">
<label>Email</label>
<p>{user.email}</p>
</div>

<div className="profile-row">
<label>Phone Number</label>
<p>{user.phone}</p>
</div>

<div className="profile-row">
<label>Address</label>
<p>{user.address}</p>
</div>

<div className="profile-row">
<label>Role</label>
<p>{user.role}</p>
</div>

</div>

</div>

    );

}