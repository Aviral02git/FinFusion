import axios from "axios";
import React from "react";
import {useState} from "react";

function Login(){
    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=async ()=>{
        const res=await axios.post("http://localhost:5000/Login",{email,password});
        console.log(res.data);

    };
    return (
        <div className="flex flex-col items-center mt-20">
            <input className="border p-2 mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input className="border p-2 mb-2" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </div>
    );
}

export default Login;

