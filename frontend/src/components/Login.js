import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login({showalert}) {
  const [logindeatils,seloginDetails]=useState({email:"",password:""});

  const onChange=(e)=>{
    seloginDetails({...logindeatils,[e.target.name]:e.target.value});
  }

  const navigate = useNavigate();

  const handlesubmit= async (e)=>{
    e.preventDefault();

    let url = `http://localhost:5000/api/auth/login`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:logindeatils.email,password:logindeatils.password})
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem("authtoken",json.authtoken);
      showalert("Account successfully logged in ","success");
      navigate("/");
    }
    else{
      showalert(json.error,"danger");
    }
  }

  return (
    <form  onSubmit={handlesubmit}>
    <h2>Login</h2>
      <div className="mb-3" >
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="password"  name="password" onChange={onChange}/>
      </div> 
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login
