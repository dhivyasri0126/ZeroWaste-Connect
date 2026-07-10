import React, { useEffect, useState } from "react";
import "../css/availabledonations.css";
import { FaUtensils } from "react-icons/fa";

export default function AvailableDonations() {

    const [donations, setDonations] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadDonations();
    }, []);

    async function loadDonations() {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8081/donation/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setDonations(data);

        } catch (err) {

            console.log(err);

        }

    }

    async function requestFood(id) {

        const token = localStorage.getItem("token");

        const response = await fetch(

            `http://localhost:8081/request/add/${id}`,

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const result = await response.json();

        alert("✅ Request Sent Successfully");

        console.log(result);

    }

    const filtered = donations.filter(d =>

        d.foodName &&
        d.foodName.toLowerCase().includes(search.toLowerCase())

    );

    return (

<div>

<h2>
    <FaUtensils style={{ marginRight: "10px", color: "#16a34a" }} />
    Available Donations
</h2>
<br/>

<input

type="text"

placeholder="Search Food..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="search-box"

/>

<div className="card-container">

{filtered.map(item=>(

<div className="card" key={item.id}>

<h3>{item.foodName}</h3>

<p><b>Category:</b> {item.category}</p>

<p><b>Quantity:</b> {item.quantity}</p>

<p><b>Address:</b> {item.address}</p>

<p><b>Expiry:</b> {item.expiryTime}</p>

<p><b>Status:</b> {item.status}</p>

<button
className="request-btn"
onClick={()=>requestFood(item.id)}
>

Request Food

</button>

</div>

))}

</div>

</div>

    );

}