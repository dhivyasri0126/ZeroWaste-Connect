import React, { useEffect, useState } from "react";
import "../css/myRequest.css";

export default function MyRequests() {

    const [requests, setRequests] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {

        try {

            const response = await fetch(
                "http://localhost:8081/request/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if(response.ok){

                const data = await response.json();

                setRequests(data);

            }

        }

        catch(error){

            console.log(error);

        }

    }

    return(

<div>

<h2>My Requests</h2>

<div className="request-grid">

{

requests.map(item=>(

<div className="request-card" key={item.id}>

<h3>{item.foodName}</h3>

<p><b>Donor :</b> {item.donorName}</p>

<p><b>Quantity :</b> {item.quantity}</p>

<p><b>Status :</b> {item.status}</p>

</div>

))

}

</div>

</div>

    );

}