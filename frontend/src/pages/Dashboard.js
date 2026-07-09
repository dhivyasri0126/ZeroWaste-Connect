import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import DashboardHome from "./DashboardHome";
import Profile from "./Profile";
import AddDonation from "./AddDonation";
import MyDonations from "./MyDonations";
import MyRequests from "./MyRequests";

import {
  FaBars,
  FaUserCircle,
  FaGift,
  FaPlusCircle,
  FaBoxOpen,
  FaInbox,
  FaHistory,
  FaSignOutAlt
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";

export default function Dashboard() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [page, setPage] = useState("dashboard");

    const [donations, setDonations] = useState([]);

    useEffect(() => {
        loadDonations();
    }, []);

    async function loadDonations() {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            const response = await fetch(
                "http://localhost:8081/donation/all",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Unable to fetch donations");
            }

            const data = await response.json();

            setDonations(data);

        } catch (err) {

            console.log(err);

            alert("Unable to connect to server");

        }

    }

    function logout() {

        localStorage.clear();

        navigate("/");

    }

    return (

<div className="dashboard">

{/* ================= NAVBAR ================= */}

<nav className="navbar">

<div className="nav-left">

<FaBars
className="menu-btn"
onClick={() => setMenuOpen(!menuOpen)}
/>

<h2>🌱 ZeroWaste Connect</h2>

</div>

<button className="logout-btn" onClick={logout}>

<FaSignOutAlt />

Logout

</button>

</nav>

{/* ================= MAIN ================= */}

<div className="main">

{/* ================= SIDEBAR ================= */}

<div className={menuOpen ? "sidebar active" : "sidebar"}>

<ul>

<li onClick={() => {setPage("dashboard"); setMenuOpen(false)}}>

<MdDashboard className="icon"/>

<span>Dashboard</span>

</li>

<li onClick={() => {setPage("profile"); setMenuOpen(false)}}>

<FaUserCircle className="icon"/>

<span>My Profile</span>

</li>

<li onClick={() => {setPage("available"); setMenuOpen(false)}}>

<FaGift className="icon"/>

<span>Available Donations</span>

</li>

<li onClick={() => {setPage("add"); setMenuOpen(false)}}>

<FaPlusCircle className="icon"/>

<span>Add Donation</span>

</li>

<li onClick={() => {setPage("mydonation"); setMenuOpen(false)}}>

<FaBoxOpen className="icon"/>

<span>My Donations</span>

</li>

<li onClick={() => {setPage("requests"); setMenuOpen(false)}}>

<FaInbox className="icon"/>

<span>My Requests</span>

</li>

<li onClick={() => {setPage("received"); setMenuOpen(false)}}>

<HiClipboardDocumentList className="icon"/>

<span>Received Requests</span>

</li>

<li onClick={() => {setPage("history"); setMenuOpen(false)}}>

<FaHistory className="icon"/>

<span>Donation History</span>

</li>

</ul>

</div>

{/* ================= CONTENT ================= */}

<div className="content">

{/* Dashboard */}
{page==="dashboard" && <DashboardHome/>}

{/* Profile */}

{page==="profile" &&(

<div className="profile-card">

<h2>👤 My Profile</h2>

<p>Profile details will appear here.</p>

</div>

)}

{/* Available Donations */}

{page==="available" &&(

<>

<h2>Available Donations</h2>

<div className="card-container">

{donations.map(item=>(

<div className="card" key={item.id}>

<h3>{item.foodName}</h3>

<p><b>Category:</b> {item.category}</p>

<p><b>Quantity:</b> {item.quantity}</p>

<p><b>Address:</b> {item.address}</p>

<p><b>Status:</b> {item.status}</p>

<button>Request Food</button>

</div>

))}

</div>

</>

)}

{/* Other Pages */}

{page==="add" && <AddDonation />}

{page==="mydonation" && <MyDonations />}

{page==="requests" && <MyRequests/>}

{page==="received" && <h2>Received Requests</h2>}

{page==="history" && <h2>Donation History</h2>}

</div>

</div>

</div>

    );

}