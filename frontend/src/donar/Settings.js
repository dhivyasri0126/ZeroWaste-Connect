import React, { useEffect, useState } from "react";
import "../css/settings.css";
import {
    FaSun,
    FaMoon,
    FaDesktop
} from "react-icons/fa";

export default function Settings() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailNotification, setEmailNotification] = useState(true);
    const [requestNotification, setRequestNotification] = useState(true);
    const [pickupNotification, setPickupNotification] = useState(true);

        const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
);

    async function changePassword() {

        if(newPassword !== confirmPassword){

            alert("Passwords do not match");

            return;

        }

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:8081/auth/changepassword",
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({
                    currentPassword,
                    newPassword
                })
            }
        );

        const result = await response.text();

        alert(result);

        if(response.ok){

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        }

    }

    function logout(){

        localStorage.clear();

        window.location="/";

    }


function changeTheme(selectedTheme){

    setTheme(selectedTheme);

    localStorage.setItem("theme", selectedTheme);

    document.body.classList.remove("light-theme","dark-theme");

    if(selectedTheme==="light"){

        document.body.classList.add("light-theme");

    }

    else if(selectedTheme==="dark"){

        document.body.classList.add("dark-theme");

    }

    else{

        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if(systemDark){

            document.body.classList.add("dark-theme");

        }else{

            document.body.classList.add("light-theme");

        }

    }

}
useEffect(() => {

    changeTheme(theme);

}, []);

    return(

<div className="settings-container">

<h2>⚙ Settings</h2>

<div className="settings-card">

<h3>Change Password</h3>

<input
type="password"
placeholder="Current Password"
value={currentPassword}
onChange={(e)=>setCurrentPassword(e.target.value)}
/>

<input
type="password"
placeholder="New Password"
value={newPassword}
onChange={(e)=>setNewPassword(e.target.value)}
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
/>

<button
className="save-btn"
onClick={changePassword}
>
Update Password
</button>

</div>

<div className="settings-card">

<h3>Notifications</h3>

<label>

<input
type="checkbox"
checked={emailNotification}
onChange={()=>setEmailNotification(!emailNotification)}
/>

Email Notifications

</label>

<label>

<input
type="checkbox"
checked={requestNotification}
onChange={()=>setRequestNotification(!requestNotification)}
/>

Request Notifications

</label>

<label>

<input
type="checkbox"
checked={pickupNotification}
onChange={()=>setPickupNotification(!pickupNotification)}
/>

Pickup Notifications

</label>
<div className="settings-card">

<h3>🎨 Appearance</h3>

<div className="theme-option">

<label>

<input
type="radio"
name="theme"
checked={theme==="light"}
onChange={()=>changeTheme("light")}
/>

☀️ Light

</label>

</div>

<div className="theme-option">

<label>

<input
type="radio"
name="theme"
checked={theme==="dark"}
onChange={()=>changeTheme("dark")}
/>

🌙 Dark

</label>

</div>

<div className="theme-option">

<label>

<input
type="radio"
name="theme"
checked={theme==="system"}
onChange={()=>changeTheme("system")}
/>

💻 System Default

</label>

</div>


</div>

</div>

<div className="settings-card">

<h3>About</h3>

<p><b>Project :</b> ZeroWaste Connect</p>

<p><b>Version :</b> 1.0</p>

<p><b>Developer :</b> Dhivyasri</p>

</div>

<div className="settings-card">

<button
className="logout-setting"
onClick={logout}
>

Logout

</button>

</div>

</div>

    );

}