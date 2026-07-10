import React,{useState} from "react";
import {useNavigate} from "react-router-dom";

import "../css/dashboard.css";

import RecipientHome from "./RecipientHome";
import Profile from "../donar/Profile";
import Settings from "../donar/Settings";
import AvailableDonations from "./AvailableDonations";
import MyRequests from "./MyRequests";
import RequestHistory from "../recipient/RequestHistory";

import {
FaBars,
FaUserCircle,
FaGift,
FaInbox,
FaHistory,
FaSignOutAlt
} from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import {MdDashboard} from "react-icons/md";

export default function RecipientDashboard(){

const navigate=useNavigate();

const [page,setPage]=useState("dashboard");

const [menuOpen,setMenuOpen]=useState(false);

function logout(){

localStorage.clear();

navigate("/");

}

return(

<div className="dashboard">

<nav className="navbar">

<div className="nav-left">

<FaBars
className="menu-btn"
onClick={()=>setMenuOpen(!menuOpen)}
/>

<h2>🌱 ZeroWaste Connect</h2>

</div>

<button
className="logout-btn"
onClick={logout}
>

<FaSignOutAlt/>

Logout

</button>

</nav>

<div className="main">

<div className={menuOpen?"sidebar active":"sidebar"}>

<ul>

<li onClick={()=>{setPage("dashboard");setMenuOpen(false)}}>

<MdDashboard className="icon"/>

<span>Dashboard</span>

</li>

<li onClick={()=>{setPage("profile");setMenuOpen(false)}}>

<FaUserCircle className="icon"/>

<span>My Profile</span>

</li>

<li onClick={()=>{setPage("available");setMenuOpen(false)}}>

<FaGift className="icon"/>

<span>Available Donations</span>

</li>

<li onClick={()=>{setPage("requests");setMenuOpen(false)}}>

<FaInbox className="icon"/>

<span>My Requests</span>

</li>

<li onClick={()=>{setPage("history");setMenuOpen(false)}}>

<FaHistory className="icon"/>

<span>Request History</span>

</li>
<li onClick={() => {
    setPage("settings");
    setMenuOpen(false);
}}>

<FaCog className="icon"/>

<span>Settings</span>

</li>

</ul>

</div>

<div className="content">

{page==="dashboard" && <RecipientHome/>}

{page==="profile" && <Profile/>}

{page==="available" && <AvailableDonations/>}

{page==="requests" && <MyRequests/>}

{page==="history" && <RequestHistory/>}

{page==="settings" && <Settings />}

</div>

</div>

</div>

);

}