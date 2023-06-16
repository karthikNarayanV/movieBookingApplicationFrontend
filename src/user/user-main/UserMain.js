import React from 'react';
import {  Outlet } from 'react-router-dom'
import{ useNavigate } from 'react-router' ;
import {  useSnackbar } from 'notistack';

export default function UserMain(props){
  const { enqueueSnackbar } = useSnackbar();
  const navigate= useNavigate();
  const handleLogin=(event)=>{
    enqueueSnackbar("Logged out", {variant: 'warning' });
    navigate("/")
}
  return (
    
      <div data-testid="user-main-comp" className="outer-admin-main"> 
        <nav class="navbar navbar-expand-lg navbar-light  m-2">
            <a class="navbar-brand" href="/user-main/user-home">Movie Booking Application</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/user-main/user-home">Book Ticket<span class="sr-only">(current)</span></a>
                </li>
                
                
               
              </ul>
              
            </div>
            <div class="d-flex inline my-2 my-lg-0">
              
                <button class="btn btn-outline my-2 my-sm-0" data-testid="logout-comp" onClick={handleLogin}>Logout</button>
              </div>
          </nav>
          <Outlet />
            
        </div>
    
   
  
  );
}