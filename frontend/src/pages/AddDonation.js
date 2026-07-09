import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/addDonation.css";

export default function AddDonation() {

    const navigate = useNavigate();

    const [donation, setDonation] = useState({
        donationType: "",
        foodName: "",
        category: "",
        quantity: "",
        expiryTime: "",
        address: "",
        description: ""
    });

    const token = localStorage.getItem("token");

    function handleChange(e) {
        setDonation({
            ...donation,
            [e.target.name]: e.target.value
        });
    }

    async function addDonation(e) {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8081/donation/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(donation)
                }
            );

            if(response.ok){

                alert("Donation Added Successfully");

                navigate("/dashboard");

            }

            else{

                alert("Unable to add donation");

            }

        }

        catch(error){

            console.log(error);

            alert("Server Error");

        }

    }

    return(

<div className="addDonation">

<div className="add-card">

<h2>Add Donation</h2>

<form onSubmit={addDonation}>

<select
name="donationType"
onChange={handleChange}
required>

<option value="">Donation Type</option>
<option>Food</option>
<option>Groceries</option>
<option>Dress</option>

</select>

<input
type="text"
name="foodName"
placeholder="Food Name"
onChange={handleChange}
/>

<select
name="category"
onChange={handleChange}
required>

<option value="">Category</option>
<option>Veg</option>
<option>Non-Veg</option>
<option>Snacks</option>
<option>Beverages</option>
<option>Clothes</option>

</select>

<input
type="text"
name="quantity"
placeholder="Quantity"
onChange={handleChange}
required
/>

<input
type="datetime-local"
name="expiryTime"
onChange={handleChange}
required
/>

<input
type="text"
name="address"
placeholder="Address"
onChange={handleChange}
required
/>

<textarea
name="description"
placeholder="Description"
rows="5"
onChange={handleChange}
/>

<button type="submit">

Donate Now

</button>

</form>

</div>

</div>

    );

}