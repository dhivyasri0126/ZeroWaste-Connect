import React, { useEffect, useState } from "react";
import "../css/history.css";

export default function DonationHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    async function loadHistory() {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:8081/donation/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {

                throw new Error("Unable to fetch history");

            }

            const data = await response.json();

            setHistory(data);

        }

        catch (err) {

            console.log(err);

            alert("Unable to load donation history");

        }

    }

    return (

<div className="history-container">

<h2>Donation History</h2>

{
history.length===0 ?

<div className="empty">

No completed donations available.

</div>

:

<table>

<thead>

<tr>

<th>Food</th>

<th>Category</th>

<th>Quantity</th>

<th>Address</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{
history.map(item=>(

<tr key={item.id}>

<td>{item.foodName}</td>

<td>{item.category}</td>

<td>{item.quantity}</td>

<td>{item.address}</td>

<td>

<span className="completed">

{item.status}

</span>

</td>

</tr>

))
}

</tbody>

</table>

}

</div>

    );

}