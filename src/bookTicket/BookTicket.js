import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './BookTicket.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'
import {  useSnackbar } from 'notistack';
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
export default function BookTicket(props){
    const navigate= useNavigate();
    const{state}=useLocation()
    const { enqueueSnackbar } = useSnackbar();
    const[seatNumber,setSeatNumber]=useState({
        seatNumberList:[...state.seatNumbers.map((number)=>{ return {number,selected:false}})]
})
const seatsSelected=[]
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
    const[ticketDetail,setTicketDetail]=useState({
        movieName:state.movieName,
        theatreName:state.theatreName,
        seatNumber:seatsSelected,
        noOfTickets:0
    })

    useEffect(()=>{
        
    },[seatNumber.seatNumberList,seatsSelected])

    
   const addSeat=(index)=>{
       
        const seatNumberList=seatNumber.seatNumberList;
        seatNumberList[index].selected=!seatNumberList[index].selected;
        setSeatNumber({seatNumberList})
        seatNumber.seatNumberList.map(seat=>{
            if(seat.selected){
                seatsSelected.push(seat.number)
            }
        })
        setTicketDetail(
            {
                movieName:state.movieName,
                theatreName:state.theatreName,
                seatNumber:seatsSelected,
                noOfTickets:seatsSelected.length
            }
        )
        
    }

    const bookTicket=()=>{
        if(ticketDetail.seatNumber.length===0){
            enqueueSnackbar("Please select the seats", {variant: 'warning' });
        }else{
       handleOpen()
        }
    }

    const goBack=()=>{
        navigate(-1)
     }

     

    const handleConfirm=()=>{
        const url="http://localhost:8081/"+ticketDetail.movieName+"/add";
        var token=sessionStorage.getItem("token");
            fetch(url,{
                method:'POST',
                body:JSON.stringify(ticketDetail),
                headers:{
                    'Content-type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
            }).then(handleFetchResponse)
            .then((response)=>{
                if(response.status===200){
                    response.text().then(json=>{
                        
                        enqueueSnackbar("Booked Successfully. "+json, {variant: 'success' });
                        navigate(-1)
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

    
    

    return(
        <div className="outer-booking" data-testid="book-ticket-comp">
<div className="p-5">
            <div className="row ">
                <div className="col px-4">
                    <div className="h6 px-4">Movie Name: <em className="h4">{state.movieName}</em></div>
                    <div className="h6 px-4">Theatre Name: <em className="h4">{state.theatreName}</em></div>
                    
                </div>
                <div className="col px-4">
                    <div className="h3 ">Movie Booking Application</div>
                    
                    
                </div>
                <div className="col px-4 d-flex align-items-end flex-column">
                    <div className="h6 px-4">No of seats selected: <em className="h4">{ticketDetail.seatNumber.length}</em></div>
                    
                </div>
            </div>
            
            <div className="container slot m-auto p-3">
            
        
            <hr/>
            <div className="d-flex justify-content-center mt-3">
            
            <p className="h6">Screen <i className="fa fa-arrow-up" aria-hidden="true"></i></p>
            
            </div>
            
           
                
            
                <div className="row">
                    {seatNumber.seatNumberList.map((numberstatus,index)=>(
                        
                        
                            <div key={index} className="col mb-1" data-testid={"seat-number-"+index} onClick={()=>addSeat(index)}>
                                
                            <div className={numberstatus.selected?"box-c":"box-o"}>
                                <div  className="card text-center mx-auto">
                                    <div className="card-body">
                                        <p className="card-text">{numberstatus.number}</p>
                                    </div>
                                
                                </div>
                            </div>
                            
                        </div>
                        
                        

                        
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-around mt-4">
                <button className="btn btn-dark" data-testid="book-btn-comp" onClick={()=>bookTicket()}>Book Ticket</button>
                <button className="btn btn-info" data-testid="goback-btn-comp" onClick={()=>goBack()}>Go Back</button>
            </div>
            
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <h3>Movie Name <span className="mx-2">:</span>{state.movieName}</h3>
                <h3>Theatre Name: {state.theatreName}</h3>
                <h3>Seat Numbers: {ticketDetail.seatNumber.map(number=>(<span>{" "+number}</span>))}</h3>
                <hr/>
                <h3>Total Cost <span className="ml-5"> : </span> {ticketDetail.noOfTickets*180}</h3>
                <div className="d-flex justify-content-around ">
                        <button className="btn btn-info" data-testid="cancel-btn-comp" onClick={handleClose}>Cancel</button>
                        <button className="btn btn-dark" data-testid="confirm-btn-comp" onClick={handleConfirm}>Confirm</button>
                </div>
                </Box>
            </Modal>
        </div>

        </div>
                
    )
}
