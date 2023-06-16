import React from "react"
import { useNavigate } from "react-router-dom";
import {  useSnackbar } from 'notistack';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { handleFetchResponse } from "../apiUtils";
export default function Reset(props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
    const[password,setPassword]=React.useState('');
    const[checkPassword,setCheckPassword]=React.useState();
    const [passwordCredential,setPasswordCredential]=React.useState({
      password:'',
      token:sessionStorage.getItem("resetPasswordToken").substring(5)
    });

    const handleChange=(e) => {
      
      setPasswordCredential(formInputs =>
         ({...formInputs, [e.target.name]: e.target.value})
      )
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      
      if(password===checkPassword){
        const url = "http://localhost:8081/reset";
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(passwordCredential),
          headers: { 'Content-Type': 'application/json' },
        }).then(handleFetchResponse)
        .then((response) => {
        if(response.status===200){
            enqueueSnackbar("Password reseted successfully", {variant: 'success' });
            
            navigate("/")
          
        }
        else if(response.status===400){
            enqueueSnackbar("Try Again", {variant: 'error' });
            
            navigate("/")
          
        }
        
              
        },(error)=>{
          if(error.message==='Unauthorized'){
            enqueueSnackbar("Session expired", {variant: 'error' });
            navigate('/')
        } 
        else enqueueSnackbar(error, {variant: 'error' });
        })
      }else{
        enqueueSnackbar("Password is Not Matching", {variant: 'error' });
        
      }
        
    };
    const handleLogin=(event)=>{
        navigate("/")
    }


    return (
        <div className="outer-reset" style={{backgroundColor: "#f9EAD9"}}>
            <div>
            
                <AppBar sx={{
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
                <div data-testid="reset-comp" className="Auth-form-container">
                    <form className="Auth-form" aria-label="reset-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Enter New Password</h3>
                        <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-2"
                            placeholder="Enter password"
                            name="password" aria-label="password-field"
                            onChange={handleChange}
                            onKeyUp={(e)=>{setPassword(e.target.value)}}
                        />
                        </div>
                        <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control mt-2"
                            aria-label="checkpassword-field"
                            placeholder="Enter Confirm password"
                            onChange={(e) => setCheckPassword(e.target.value)}
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
