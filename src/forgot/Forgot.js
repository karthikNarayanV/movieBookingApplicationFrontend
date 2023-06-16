import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useSnackbar } from 'notistack';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { handleFetchResponse } from "../apiUtils";
export default function Forgot(props) {
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:8081/forgot";
    fetch(url, {
      method: 'POST',
      body: email,
      headers: { 'Content-Type': 'application/json' },
  }).then(handleFetchResponse)
  .then((response) => {
    if(response.status===200){
      response.text().then(json=>{
        console.log(json)
        sessionStorage.setItem("resetPasswordToken", json);
        navigate("/reset")
        enqueueSnackbar("Set your password", {variant: 'success' });
        
      })  
    }
    else if(response.status===400){
        enqueueSnackbar("Enter correct email id", {variant: 'error' });
      
    }
          
  },(error)=>{
    if(error.message==='Unauthorized'){
        enqueueSnackbar("Session expired", {variant: 'error' });
        navigate('/')
    } 
    else enqueueSnackbar(error, {variant: 'error' });
  })  
  };

  const handleLogin=(event)=>{
        navigate("/")
    }

    return (
        <div className="outer-forgot" style={{backgroundColor: "#f9EAD9"}}>
             <div>
            
                <AppBar  sx={{
                boxShadow: 0
            }} color="transparent" position="static">
                    <Toolbar className="d-flex justify-content-end">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Movie Booking Application
                    </Typography>
                        <Button onClick={handleLogin} data-testid="login-btn-comp" color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                
            </div>
            <div data-testid="forgot-comp" className="Auth-form-container">
                <form className="Auth-form" aria-label="forgot-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Forgot Password?</h3>
                    <div className="form-group mt-3">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        
                        aria-label="email"
                        className="form-control mt-2"
                        placeholder="Enter email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    </div>
                    
                </div>
                </form>
            </div>
        </div>
      
    )
  }
