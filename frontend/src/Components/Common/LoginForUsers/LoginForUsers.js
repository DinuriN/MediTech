import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForUsers() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError]=useState("");
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        setError("");

        try{
            const res=await axios.post("http://localhost:5000/api/auth/loginForUsers", {email, password});
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("patientId", res.data.patientId);
            localStorage.setItem("name", res.data.name);
            navigate("/patientDetails");
        }catch(error){
            setError(error.response?.data?.message || "Login failed");
        }
    };
  return (
    <div className='login-container'>
        <h2>Login</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleLogin}>
            <input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>

            <button type='submit'>Login</button>
        </form>
      
    </div>
  );
}

export default LoginForUsers;
