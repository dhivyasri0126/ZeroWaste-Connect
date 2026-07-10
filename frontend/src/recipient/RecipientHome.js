import React, { useEffect, useState } from "react";
import "../css/dashboardhome.css";

export default function RecipientHome() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {

        try {

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

        } catch (err) {

            console.log(err);

        }

    }

    const total = requests.length;

    const pending = requests.filter(
        r => r.status === "PENDING"
    ).length;

    const accepted = requests.filter(
        r => r.status === "ACCEPTED"
    ).length;

    const completed = requests.filter(
        r => r.status === "COMPLETED"
    ).length;

    return (

<div>

{/* Summary */}

<div className="summary">

<div className="summary-card">

<h4>Total Requests</h4>

<h2>{total}</h2>

</div>

<div className="summary-card">

<h4>Pending</h4>

<h2>{pending}</h2>

</div>

<div className="summary-card">

<h4>Accepted</h4>

<h2>{accepted}</h2>

</div>

<div className="summary-card">

<h4>Completed</h4>

<h2>{completed}</h2>

</div>

</div>

{/* Recent Requests */}

<div className="table-box">

<h2>Recent Requests</h2>

<table>

<thead>

<tr>

<th>Request ID</th>

<th>Donation ID</th>

<th>Status</th>

<th>Request Time</th>

</tr>

</thead>

<tbody>

{requests.slice(0,5).map(request=>(

<tr key={request.id}>

<td>{request.id}</td>

<td>{request.donationId}</td>

<td>{request.status}</td>

<td>
{new Date(request.requestTime).toLocaleString()}
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

    );

}