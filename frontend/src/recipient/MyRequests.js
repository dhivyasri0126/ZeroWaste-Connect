import React, { useEffect, useState } from "react";
import "../css/myrequests.css";

export default function MyRequests() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:8081/request/my",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        setRequests(data);
    }

    async function confirmPickup(id){

        const token = localStorage.getItem("token");

        const response = await fetch(

            `http://localhost:8081/request/complete/${id}`,

            {

                method:"PUT",

                headers:{
                    Authorization:`Bearer ${token}`
                }

            }

        );

        if(response.ok){

            alert("Pickup Confirmed Successfully");

            loadRequests();

        }
        else{

            alert("Unable to confirm pickup");

        }

    }

    return(

<div>

<h2>📦 My Requests</h2>

<table className="request-table">

<thead>

<tr>

<th>ID</th>

<th>Donation ID</th>

<th>Donor</th>

<th>Status</th>

<th>Request Time</th>

<th>Action</th>

</tr>

</thead>

<tbody>

{requests.map(request=>(

<tr key={request.id}>

<td>{request.id}</td>

<td>{request.donationId}</td>

<td>{request.donorEmail}</td>

<td>{request.status}</td>

<td>

{new Date(request.requestTime).toLocaleString()}

</td>

<td>

{

request.status==="ACCEPTED"

?

<button

className="pickup-btn"

onClick={()=>confirmPickup(request.id)}

>

Confirm Pickup

</button>

:

request.status

}

</td>

</tr>

))}

</tbody>

</table>

</div>

    );

}