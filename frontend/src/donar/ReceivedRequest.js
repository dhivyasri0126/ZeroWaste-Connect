import React, { useEffect, useState } from "react";
import "../css/request.css";

export default function ReceivedRequests() {

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8081/request/received",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Unable to fetch requests");
            }

            const data = await response.json();

            setRequests(data);

        } catch (err) {

            console.log(err);

        }

    }

    // async function acceptRequest(id) {

    //     const token = localStorage.getItem("token");

    //     await fetch(
    //         `http://localhost:8081/request/accept/${id}`,
    //         {
    //             method: "PUT",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     );

    //     loadRequests();

    // }

    // async function rejectRequest(id) {

    //     const token = localStorage.getItem("token");

    //     await fetch(
    //         `http://localhost:8081/request/reject/${id}`,
    //         {
    //             method: "PUT",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     );

    //     loadRequests();

    // }
    async function acceptRequest(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:8081/request/accept/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if(response.ok){

        alert("Request Accepted Successfully");

        loadRequests();

    }
    else{

        alert("Unable to Accept Request");

    }

}
async function rejectRequest(id){

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:8081/request/reject/${id}`,
        {
            method:"PUT",
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );

    if(response.ok){

        alert("Request Rejected Successfully");

        loadRequests();

    }

    else{

        alert("Unable to Reject Request");

    }

}

    return (

<div className="request-container">

<h2>Received Requests</h2>

{
requests.length === 0 ?

<p>No Requests Yet.</p>

:

<table>

<thead>

<tr>

<th>Food</th>
<th>Category</th>
<th>Quantity</th>
<th>Address</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>
<tbody>

{requests.map((request) => (

<tr key={request.id}>

<td>{request.foodName}</td>

<td>{request.category}</td>

<td>{request.quantity}</td>

<td>{request.address}</td>

<td>{request.status}</td>

<td>

{request.status === "PENDING" ? (

<>

<button
className="accept-btn"
onClick={() => acceptRequest(request.id)}
>
Accept
</button>

<button
className="reject-btn"
onClick={() => rejectRequest(request.id)}
>
Reject
</button>

</>

) : (

<b>{request.status}</b>

)}

</td>

</tr>

))}

</tbody>
</table>

}

</div>

    );

}