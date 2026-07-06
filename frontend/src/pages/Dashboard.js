import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: "RECIPIENT"

    });

    const register = async (e) => {

        e.preventDefault();

        const response = await fetch("http://localhost:8081/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });

        const result = await response.text();

        alert(result);

        if (result === "Registration Successful") {

            navigate("/");

        }

    };

    return (

<div
className="container-fluid d-flex justify-content-center align-items-center"
style={{
minHeight:"100vh",
background:"linear-gradient(to right,#56ab2f,#a8e063)"
}}
>

<div className="card shadow-lg border-0" style={{width:"650px",borderRadius:"20px"}}>

<div
className="card-header text-center text-white"
style={{
background:"#198754",
borderTopLeftRadius:"20px",
borderTopRightRadius:"20px"
}}
>

<h2>🌱 ZeroWaste Connect</h2>

<p className="mb-0">
Create your account
</p>

</div>

<div className="card-body p-4">

<form onSubmit={register}>

<div className="row">

<div className="col-md-6 mb-3">

<label>Name</label>

<input
type="text"
className="form-control"
placeholder="Enter Full Name"
required
onChange={(e)=>setUser({...user,name:e.target.value})}
/>

</div>

<div className="col-md-6 mb-3">

<label>Email</label>

<input
type="email"
className="form-control"
placeholder="Enter Email"
required
onChange={(e)=>setUser({...user,email:e.target.value})}
/>

</div>

</div>

<div className="row">

<div className="col-md-6 mb-3">

<label>Phone Number</label>

<input
type="tel"
className="form-control"
placeholder="9876543210"
required
onChange={(e)=>setUser({...user,phone:e.target.value})}
/>

</div>

<div className="col-md-6 mb-3">

<label>Role</label>

<select
className="form-select"
onChange={(e)=>setUser({...user,role:e.target.value})}
>

<option value="DONOR">Donor</option>

<option value="RECIPIENT">Recipient</option>

</select>

</div>

</div>

<div className="mb-3">

<label>Address</label>

<textarea
rows="3"
className="form-control"
placeholder="Enter Complete Address"
required
onChange={(e)=>setUser({...user,address:e.target.value})}
>

</textarea>

</div>

<div className="mb-4">

<label>Password</label>

<input
type="password"
className="form-control"
placeholder="Create Password"
required
onChange={(e)=>setUser({...user,password:e.target.value})}
/>

</div>

<button
className="btn btn-success w-100 py-2"
>

Create Account

</button>

</form>

<hr/>

<p className="text-center">

Already have an account?

</p>

<Link
to="/"
className="btn btn-outline-success w-100"
>

Login

</Link>

</div>

</div>

</div>

    );

}

export default Register;