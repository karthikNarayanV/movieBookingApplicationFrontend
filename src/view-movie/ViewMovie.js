import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'
import {  useSnackbar } from 'notistack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './ViewMovie.css';
import { handleFetchResponse } from '../apiUtils';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function ViewMovie(props){
    const location=useLocation()
    const state=location.state
    
    const navigate= useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const[status,setStatus]=useState("BOOK ASAP")
    const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
    const[movieDetail,setMovieDetail]=useState({
        movieName: state.movieName,
        theatreName: state.theatreName,
        available: 0,
        booked: 0
    })
    useEffect(()=>{
        loadData();
    },[state.movieName,state.theatreName])
    const loadData=async ()=>{
        var token=sessionStorage.getItem("token");
        const url="http://localhost:8081/"+state.movieName+"/ticket/"+state.theatreName;
        fetch(url,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`,
            },
        }).then(handleFetchResponse)
        .then((response)=>{
            if(response.status===200){
                response.json().then(json=>{
                  setMovieDetail(json)
                               
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

        
    }

    const handleConfirm=()=>{
        const url="http://localhost:8081/"+state.movieName+"/update/"+state.theatreName;
        
        var token=sessionStorage.getItem("token");
            fetch(url,{
                method:'PUT',
                body:status,
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
            }).then(handleFetchResponse)
            .then((response)=>{
                console.log(response.status)
                if(response.status===200){
                    response.text().then(json=>{
                        
                        enqueueSnackbar("Status changed Successfully.", {variant: 'success' });
                        navigate("/admin-main/admin-home")
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
    
        
 
     }

    const handleSubmit=(event)=>{
        event.preventDefault();
        
        handleOpen()
    }
    return(
        <div className="outer-view" data-testid="view-movie-comp">
        <div className="container">
        <div className="my-3">
            <figure class="text-center ">
                <blockquote class="blockquote">
                    <h1><i>Update tickets status.</i></h1>
                </blockquote>
                
                </figure>
            </div>
            <div className="row  ">
                
                <div className="col-8 mt-4 pt-3">
                    <div className="row">
                        <div className="col-6">
                            <h4>Movie Name: <em>{movieDetail.movieName}</em></h4>
                            <h4>Available Tickets: <em>{movieDetail.available}</em></h4>
                        </div>
                        <div className="col-6">
                            <h4>Theatre Name: <em>{movieDetail.theatreName}</em></h4>
                            <h4>Booked Tickets: <em>{movieDetail.booked}</em></h4>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className=".offset-md-2 .col-md-4 .offset-md-6">
                            <div className="input-box ">
                            <form onSubmit={handleSubmit} aria-label="ticket-detail" className="d-flex flex-column justify-content-center align-items-center py-4">
                            <FormControl >
                                <FormLabel id="demo-radio-buttons-group-label">Booking Status</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={state.status}
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="BOOK ASAP"  control={<Radio onChange={()=>{setStatus("BOOK ASAP")}}/>} name="BOOK ASAP" label="BOOK ASAP" />
                                    <FormControlLabel value="SOLD OUT"  control={<Radio  onChange={()=>{setStatus("SOLD OUT")}}/>} name="SOLD OUT" label="SOLD OUT" />
                                </RadioGroup>
                            </FormControl>
                             <input type="submit" className="btn btn-info" />
                            </form>
                            </div>
                        </div>
                    
                    </div>
                    
                
                   
                    
                </div>
                <div className="col-4">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/task-management-4517376-3742807.png"/>
                </div>
            </div>
            
                    
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                        <p>Are you sure to set Status as: <h3>{status}</h3></p>
                        
                        <div className="d-flex justify-content-around ">
                                <button  aria-label="cancel-ticket" className="btn btn-info" onClick={handleClose}>Cancel</button>
                                <button  aria-label="confirm-ticket" className="btn btn-dark" onClick={handleConfirm}>Confirm</button>
                        </div>
                        </Box>
                    </Modal>
                
        </div>
        </div>
        
    )
}