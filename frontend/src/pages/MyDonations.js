import React, { useEffect, useState } from "react";
import "../css/myDonation.css";

export default function MyDonations() {

    const [donations, setDonations] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        loadMyDonations();
    }, []);

    async function loadMyDonations() {

        try {

            const response = await fetch(
                "http://localhost:8081/donation/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setDonations(data);

        }

        catch(error){

            console.log(error);

        }

    }

    async function deleteDonation(id){

        if(!window.confirm("Delete this donation?"))
            return;

        const response = await fetch(

            `http://localhost:8081/donation/delete/${id}`,

            {

                method:"DELETE",

                headers:{
                    Authorization:`Bearer ${token}`
                }

            }

        );

        const result = await response.text();

        alert(result);

        loadMyDonations();

    }

    return(

<div>

<h2>My Donations</h2>

<div className="my-grid">

{

donations.map(item=>(

<div className="my-card" key={item.id}>

<h3>{item.foodName}</h3>

<p><b>Category :</b> {item.category}</p>

<p><b>Quantity :</b> {item.quantity}</p>

<p><b>Address :</b> {item.address}</p>

<p><b>Status :</b> {item.status}</p>

<div className="btn-group">

<button className="edit-btn">

Edit

</button>

<button

className="delete-btn"

onClick={()=>deleteDonation(item.id)}

>

Delete

</button>

</div>

</div>

))

}

</div>

</div>

    );

}