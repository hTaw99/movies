import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import './Login.css';

const userName = "admin";
const password = "123456";

export default function Login() {
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showPassword = () => {
        setIsVisible(!isVisible);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const user = userName === form[0].value;
        const pass = password === form[1].value;
        if (user && pass) {
            setError("");
            dispatch(login())
            navigate('/dashboard');
        } else {
            setError("wrong credentials");
        }
    };

    return (
        <div className="login">
            <h1>Movie App Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <input type="text" placeholder="Username" />
                <input type={isVisible ? "text" : "password"} placeholder="Password" />
                <div style={{ width: "50%", paddingLeft: "26%", display: "flex", gap: "10px" }}>
                    <button type="submit" style={{ width: "50%" }}>Login</button>
                    <button type="button" onClick={showPassword} style={{ width: "50%" }}>
                        {isVisible ? "Hide" : "Show"}
                    </button>
                </div>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}