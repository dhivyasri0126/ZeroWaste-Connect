import React, { useState } from "react";
import "./../css/login.css";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {

    const navigate = useNavigate();

    const [active, setActive] = useState(false);

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const [register, setRegister] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        role: "RECIPIENT"
    });

   // ================= LOGIN =================

const loginUser = async (e) => {

    e.preventDefault();

    try {

        const response = await fetch(
            "http://localhost:8081/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
            }
        );

        const token = await response.text();

        if (!response.ok) {
            alert(token);
            return;
        }

        // Save JWT Token
        localStorage.setItem("token", token);

        // Get Logged-in User Profile
        const profileResponse = await fetch(
            "http://localhost:8081/auth/profile",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!profileResponse.ok) {
            alert("Unable to fetch profile");
            return;
        }

        const user = await profileResponse.json();

        // Save User Details
        localStorage.setItem("user", JSON.stringify(user));

        alert("Login Successful");

        // Navigate Based on Role
        if (user.role === "DONOR") {

            navigate("/donor");

        }
        else if (user.role === "RECIPIENT") {

            navigate("/recipient");

        }
        else {

            alert("Invalid User Role");

        }

    }
    catch (err) {

        console.error(err);

        alert("Unable to connect to server.");

    }

};

// ================= REGISTER =================

const registerUser = async (e) => {

    e.preventDefault();

    try {

        const response = await fetch(
            "http://localhost:8081/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(register)
            }
        );

        const result = await response.text();

        alert(result);

        if (result === "Registration Successful") {

            setActive(false);

        }

    }
    catch (err) {

        console.error(err);

        alert("Unable to connect to server.");

    }

};

    return(

<div className={active?"container active":"container"}>

<div className="form-box login">

<form onSubmit={loginUser}>

<h1>Login</h1>

<div className="input-box">

<input
type="email"
placeholder="Email"
required
onChange={(e)=>setLogin({...login,email:e.target.value})}
/>

<i className='bx bxs-envelope'></i>

</div>

<div className="input-box">

<input

type={showLogin?"text":"password"}

placeholder="Password"

required

onChange={(e)=>setLogin({...login,password:e.target.value})}

/>

<i
className={showLogin?"bx bx-show":"bx bx-hide"}
onClick={()=>setShowLogin(!showLogin)}
></i>

</div>

<button className="btn">

Login

</button>

</form>

</div>

<div className="form-box register">

<form onSubmit={registerUser}>

<h1>Create Account</h1>

<div className="input-box">

<input

type="text"

placeholder="Full Name"

required

pattern="[A-Za-z ]{3,40}"

onChange={(e)=>setRegister({...register,name:e.target.value})}

/>

<i className='bx bxs-user'></i>

</div>

<div className="input-box">

<input

type="email"

placeholder="Email"

required

onChange={(e)=>setRegister({...register,email:e.target.value})}

/>

<i className='bx bxs-envelope'></i>

</div>

<div className="input-box">

<input

type="text"

placeholder="Phone Number"

required

pattern="[6-9]{1}[0-9]{9}"

maxLength="10"

onChange={(e)=>setRegister({...register,phone:e.target.value})}

/>

<i className='bx bxs-phone'></i>

</div>

<div className="input-box">

<input

type="text"

placeholder="Address"

required

onChange={(e)=>setRegister({...register,address:e.target.value})}

/>

<i className='bx bxs-map'></i>

</div>

<div className="input-box">

<select

onChange={(e)=>setRegister({...register,role:e.target.value})}

>

<option value="DONOR">Donor</option>

<option value="RECIPIENT">Recipient</option>

</select>

</div>

<div className="input-box">

<input

type={showRegister?"text":"password"}

placeholder="Password"

required

pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,15}$"

onChange={(e)=>setRegister({...register,password:e.target.value})}

/>

<i
className={showRegister?"bx bx-show":"bx bx-hide"}
onClick={()=>setShowRegister(!showRegister)}
></i>

</div>

<button className="btn">

Register

</button>

</form>

</div>

<div className="toggle-box">

<div className="toggle-panel toggle-left">

<h1>🌱 Welcome Back!</h1>

<p>

Login to continue your ZeroWaste journey.

</p>

<button

className="btn"

onClick={()=>setActive(true)}

>

Register

</button>

</div>

<div className="toggle-panel toggle-right">

<h1>🌿 Join Us</h1>

<p>

Reduce Food Waste.
Feed Communities.

</p>

<button

className="btn"

onClick={()=>setActive(false)}

>

Login

</button>

</div>

</div>

</div>

    )

}