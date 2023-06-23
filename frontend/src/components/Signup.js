import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup({showalert}) {
  const [logindeatils,seloginDetails]=useState({name:"",email:"",password:""});

  const onChange=(e)=>{
    seloginDetails({...logindeatils,[e.target.name]:e.target.value});
  }

  const navigate = useNavigate();

  const handlesubmit= async (e)=>{
    e.preventDefault();
    let url = `http://localhost:5000/api/auth/createuser`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:logindeatils.name,email:logindeatils.email,password:logindeatils.password})
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem("authtoken",json.authtoken);
      showalert("Account successfully created ","success");
      navigate("/");
    }
    else{
      showalert(json.error,"danger")
    }

  }
  
  return (
    <form  onSubmit={handlesubmit}>
    <h2>Sign Up</h2>
      <div className="mb-3" >
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required minLength={3}/>
      </div>
      <div className="mb-3" >
        <label htmlFor="Email1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="Password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password"  name="password" onChange={onChange} required minLength={8}/>
      </div> 
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup