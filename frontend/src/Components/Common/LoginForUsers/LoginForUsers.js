import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../LoginForUsers/LoginStyles.css";

function LoginForUsers({ closeModal }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/loginForUsers", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userType", res.data.userType);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("name", res.data.name);

            if (res.data.userType === "patient") {
                navigate("/patientDetails");
            } else if (res.data.userType === "staff") {
                navigate("/patientDetails");
            }

            closeModal(); 
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={closeModal}>&times;</button>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input className='login-form-input' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className='login-form-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className='login-confirmation-button' type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForUsers;