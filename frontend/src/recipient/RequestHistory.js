import React, { useEffect, useState } from "react";
import "../css/requesthistory.css";

export default function RequestHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {

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

            const filtered = data.filter(
                request =>
                    request.status === "COMPLETED" ||
                    request.status === "REJECTED"
            );

            setHistory(filtered);

        } catch (error) {

            console.log(error);

        }

    }

    return (

<div className="history-container">

<h2>📜 Request History</h2>

<table className="history-table">

<thead>

<tr>

<th>Request ID</th>

<th>Donation ID</th>

<th>Donor Email</th>

<th>Status</th>

<th>Request Time</th>

</tr>

</thead>

<tbody>

{history.length === 0 ? (

<tr>

<td colSpan="5">
No request history available.
</td>

</tr>

) : (

history.map(request => (

<tr key={request.id}>

<td>{request.id}</td>

<td>{request.donationId}</td>

<td>{request.donorEmail}</td>

<td>

<span
className={
request.status === "COMPLETED"
? "completed"
: "rejected"
}
>

{request.status}

</span>

</td>

<td>
{new Date(request.requestTime).toLocaleString()}
</td>

</tr>

))

)}

</tbody>

</table>

</div>

    );

}