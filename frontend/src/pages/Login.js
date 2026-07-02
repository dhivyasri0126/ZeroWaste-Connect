import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const login = (e) => {
        e.preventDefault();

        UserService.loginUser(user)
            .then((response) => {

                if (response.data === "DONOR") {
                    alert("Login Successful");
                    navigate("/donor");
                }
                else if (response.data === "RECIPIENT") {
                    alert("Login Successful");
                    navigate("/recipient");
                }
                else if (response.data === "ADMIN") {
                    alert("Login Successful");
                    navigate("/admin");
                }
                else {
                    alert(response.data);
                }

            })
            .catch((error) => {
                console.log(error);
                alert("Login Failed");
            });
    };

    return (

        <div className="container mt-5">

            <h2>User Login</h2>

            <form onSubmit={login}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="form-control mb-3"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control mb-3"
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-primary">
                    Login
                </button>

            </form>

            <br />

            <Link to="/signup">
                Don't have an account? Signup
            </Link>

        </div>

    );
}

export default Login;