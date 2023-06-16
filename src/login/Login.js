import React,{useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router' 

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {  useSnackbar } from 'notistack'
import { handleFetchResponse } from '../apiUtils';

export default function Login(props) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate= useNavigate();
    const [loginCredential,setLoginCredential]=useState({
        email:'',
        password:''
    });
    const handleSubmit=(event)=>{
        event.preventDefault();
        const url="http://localhost:8081/login";
        fetch(url,{
            method:'POST',
            body:JSON.stringify(loginCredential),
            headers:{'Content-type':'application/json'},
        }).then(handleFetchResponse)
        .then((response)=>{
            if(response.status===200){
                response.json().then(json=>{
                    sessionStorage.setItem("token",json.token)
                    const roles=json.roles;
                    if(roles.includes('ROLE_ADMIN')){
                        enqueueSnackbar("Welcome Admin", {variant: 'success' });
                        navigate('/admin-main/admin-home')
                    }
                    
                    else{
                        enqueueSnackbar("Welcome User", {variant: 'success' });
                        navigate('/user-main/user-home')
                    }
                    
                })
            }
            else if(response.status===400){
                response.text().then(message=>{
                    enqueueSnackbar(message, {variant: 'error' });
                })
            }
                
            
        },(error)=>{
            if(error.message==='Unauthorized'){
                enqueueSnackbar("Session expired", {variant: 'error' });
                navigate('/')
            } 
            else enqueueSnackbar(error, {variant: 'error' });
        })

        navigate('/')
    }

    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setLoginCredential(formInputs=>({...formInputs,[name]:value}));
    }
    const handleRegister=(event)=>{
        navigate("/register")
    }
    return(
        <div data-testid="login-comp"  className="outer">
            <div>
            
            <AppBar sx={{
                boxShadow: 0
            }} color="transparent" position="static">
                <Toolbar className="d-flex justify-content-end">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Movie Booking Application
                </Typography>
                    <Button onClick={handleRegister}  data-testid="register-btn-comp" color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
            
        </div>
            <div  className="Auth-form-container">
                <form className="Auth-form" aria-label="login-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                    <TextField  data-testid="email-comp"
                        type="text"
                        name="email"
                        aria-label="email"
                        className="form-control mt-1"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={loginCredential.email} label="Email" variant="outlined" >
                
                    </TextField>
                    
                    </div>
                    <div className="form-group mt-3">
                    <TextField  type="password"
                        name="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={loginCredential.password} label="Password" variant="outlined" >
                
                    </TextField>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                    <input type="submit" className="btn btn-dark" />
                    
                    
                    </div>
                    
                    <div className="d-flex justify-content-start mt-1">
                        <span className="forgot-password text-right ">
                        <a className="text-decoration-none forgot-text" href="/forgot">Forgot password?</a>
                        </span>
                        
                    
                    
                    </div>
                </div>
                </form>
            </div>

        </div>
        
    )
}