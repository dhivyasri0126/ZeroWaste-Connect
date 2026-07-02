import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();

        UserService.registerUser(user)
            .then((response) => {
                alert(response.data);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                alert("Registration Failed");
            });
    };

    return (

        <div className="container mt-5">

            <h2>User Registration</h2>

            <form onSubmit={register}>

                <input type="text" name="name" placeholder="Enter Name"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

     <textarea name="address"placeholder="Enter Address"className="form-control mb-3"onChange={handleChange} />

                <select name="role" className="form-control mb-3" onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="DONOR">Donor</option>
                    <option value="RECIPIENT">Recipient</option>
                </select>

                <button className="btn btn-primary">
                    Signup
                </button>

            </form>

            <br />

            <Link to="/">Already have an account? Login</Link>

        </div>

    );
}

export default Signup;