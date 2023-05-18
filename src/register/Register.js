import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import './Register.css'
import {  useSnackbar } from 'notistack';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



export default function Register(props){
    const navigate= useNavigate();
    const [userDetail,setUserDetail]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        contactNumber:"",
        userRoles:["ROLE_USER"]
    });
    
    const [errMsg,setErrMsg]=useState("");
    const [cp,setcp]=useState("");
    const { enqueueSnackbar } = useSnackbar();
    

    const handleSubmit=(event)=>{
        event.preventDefault();
        const url="http://localhost:8081/register";
        if (cp!==userDetail.password) {
            setErrMsg("Enter Correct Confirm Password")
        } else {
            fetch(url,{
                method:'POST',
                body:JSON.stringify(userDetail),
                headers:{'Content-type':'application/json'},
            }).then((response)=>{
                if(response.status===200){
                    response.json().then(json=>{
                        sessionStorage.setItem("token",json.token)
                        const roles=json.roles;
                        enqueueSnackbar("Registered Successfully", {variant: 'success' });
                        if(roles.includes('ROLE_ADMIN'))
                            navigate('/admin-home')
                        else
                        navigate('/user-home')
                    })
                }
                else if(response.status===400){
                    response.text().then(message=>{
                        enqueueSnackbar(message, {variant: 'error' });
                    })
                }
                
            },(error)=>{
                enqueueSnackbar(error, {variant: 'error' });
            })
    
        }
        
        
    }

    const handleChange=(event)=>{
    
        const name=event.target.name;
        const value=event.target.value;
        if(name==="password"&&cp!==""&&value!==cp){
            setErrMsg("Enter Correct Confirm Password")
            setUserDetail(formInputs=>({...formInputs,[name]:value}));
        }else{
            setErrMsg("")
            setUserDetail(formInputs=>({...formInputs,[name]:value}));
        }
        
    }
    const handleConfirmation=(event)=>{
        
        const value=event.target.value;
        if(userDetail.password!==value){
            setErrMsg("Enter Correct Confirm Password")
        }
        else{
            setcp(value)
            setErrMsg("") 
        }
    }

    const handleLogin=(event)=>{
        navigate("/")
    }

    return(
        <div className="outer-register">
            <div>
            
                <AppBar position="static">
                    <Toolbar className="d-flex justify-content-end">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Movie Booking Application
                    </Typography>
                        <Button onClick={handleLogin} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                
            </div>
            
            <div data-testid="register-comp" className="Auth-form-container">
                <form className="Auth-form-r" aria-label="register-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="row">
                        <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
                            <div className="form-group mt-3">
                                <TextField  data-testid="fname-comp"
                                    type="text"
                                    name="firstName"
                                    aria-label="firstName"
                                    className="form-control mt-1"
                                    placeholder="Enter First Name"
                                    onChange={handleChange}
                                    value={userDetail.firstName}
                                    required label="First Name" variant="outlined" />
                            </div>
                            <div className="form-group mt-3">
                            <TextField  data-testid="lname-comp"
                                type="text"
                                name="lastName"
                                aria-label="lastName"
                                className="form-control mt-1"
                                placeholder="Enter Last Name"
                                onChange={handleChange}
                                value={userDetail.lastName}
                                required label="Last Name" variant="outlined" />
                            </div>
                            <div className="form-group mt-3">
                            <TextField   data-testid="email-comp"
                                type="text"
                                name="email"
                                aria-label="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={handleChange}
                                value={userDetail.email}
                                required label="Email" variant="outlined" />
                            
                            </div>
                        </div>
                        <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
                            <div className="form-group mt-3">
                            <TextField   type="password"
                                name="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={handleChange}
                                value={userDetail.password}
                                required label="Password" variant="outlined" />
                            
                            </div>
                            <div className="form-group mt-3">
                            <TextField  type="password"
                                name="cpassword"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={handleConfirmation}
                                required label="Confirm Password" variant="outlined" />
                            
                            <span style={{ color: "red" }}>{errMsg}</span>
                            </div>
                            <div className="form-group mt-3">
                            <TextField  data-testid="cnumber-comp"
                                type="text"
                                name="contactNumber"
                                aria-label="contactNumber"
                                className="form-control mt-1"
                                placeholder="Enter Contact Number"
                                onChange={handleChange}
                                value={userDetail.contactNumber}
                                required label="Contact Number" variant="outlined" />
                            
                            </div>
                        </div>
                    </div>
                   
                    
                    <div className="d-grid gap-2 mt-3">
                    <input type="submit" className="btn btn-primary" />
                    
                    
                    </div>
                    
                </div>
                </form>
            </div>
            
        </div>
        
    )
}