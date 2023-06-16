import React from 'react';
import {  Outlet } from 'react-router-dom'
import{ useNavigate } from 'react-router' ;
import {  useSnackbar } from 'notistack';
import'./AdminMain.css';

export default function AdminMain(props){
  const { enqueueSnackbar } = useSnackbar();
  const navigate= useNavigate();
  const handleLogin=(event)=>{
    enqueueSnackbar("Logged out", {variant: 'warning' });
    navigate("/")
}
  return (
    <div className="outer-admin-main" data-testid="admin-main-comp">
      <div> 
        <nav className="navbar navbar-expand-lg navbar-light mx-2">
            <a className="navbar-brand" href="/admin-main/admin-home">Movie Booking Application</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" data-toggle="tab" href="/admin-main/admin-home">View Details <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="/admin-main/user-home">Book Ticket</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="/admin-main/add-movie">Add Movie</a>
                </li>
                
               
              </ul>
              
            </div>
            <div className="d-flex inline my-2 my-lg-0">
              
                <button className="btn btn-outline my-2 my-sm-0" data-testid="logout-comp"  onClick={handleLogin}>Logout</button>
              </div>
          </nav>
            
            
        </div>
    
    <Outlet />
  </div>
  );
}