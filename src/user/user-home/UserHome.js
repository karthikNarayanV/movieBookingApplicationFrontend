import React,{useState,useEffect} from 'react';
import {  useSnackbar } from 'notistack';
import './UserHome.css'
import{ useNavigate } from 'react-router' ;
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { handleFetchResponse } from '../../apiUtils';

export default function UserHome(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [list,setList]=useState([]);
    const [dlist,setDlist]=useState(list);
    const navigate= useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [query, setquery] = useState('')
    

    const handleSearch = (e) => {
        const results = list.filter(l => {
                    if (e.target.value === "") return list
                    return l.movieName.toLowerCase().includes(e.target.value.toLowerCase())
                })
           
                setDlist(results)
                setquery(e.target.value)
             }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

   


    
    useEffect(()=>{
        setDlist(list)
        loadData();
    },[])

    useEffect(()=>{
        setDlist(list)
    },[list])

    const loadData=async ()=>{
        var token=sessionStorage.getItem("token");
        const url="http://localhost:8081/all";
        fetch(url,{
            
            method:'GET',
            
            headers:{
                'Authorization':`Bearer ${token}`,
            },
        }).then(handleFetchResponse)
        .then((response)=>{
            if(response.status===200){
                response.json().then(json=>{
                   setList(json)    
                   setDlist(list)
                  
                               
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
        <div className="movieList" data-testid="user-home-comp">
            <div className="my-3">
            <figure class="text-center ">
                <blockquote class="blockquote">
                    <h1><i>Grab your tickets soon.</i></h1>
                </blockquote>
                
                </figure>
            </div>
            
            <div className="searchbox">
            <div className="text-center mt-4 mb-2 font-weight-bold h4">
                    Browse by Movies
                </div>
                <form>
                    <div className="row height d-flex justify-content-center align-items-center">
                        <div className="col-md-8">
                            <div className="search">
                                <i className="fa fa-search"></i>
                                <input type="text" className="form-control"  value={query} onChange={handleSearch}  placeholder="Search a Movie"/>
                                
                            </div>
                        </div>
                    </div>
                 
        
                </form>
            </div>
            <div className="movieList container p-4">
            <div className="text-center my-3 font-weight-bold h4">
                    Now Showing
                </div>
                <div className="row">
                    <div className="col">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-cinema-tickets-app-7238246-5902638.png"></img>
                    </div>
                    <div className="col d-flex align-content-center m-auto flex-column">
                    {dlist.map((method)=>(
                                        <Accordion key={method.movieName} expanded={expanded === method.movieName} onChange={handleChange(method.movieName)}>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls={method.movieName}
                                          id={method.movieName}
                                          key={method.movieName}
                                        >
                                            
                                                
                                                <div className="h5">
                                                    {method.movieName}
                                                </div>
                                                
                                            
                                          
                                          
                                        </AccordionSummary>
                                       <hr/>
                                            {method.theatres.map((theatre)=>(
                                                <AccordionDetails key={theatre.theatreName}>
                                                    <div className="d-flex justify-content-between m-1">
                                                        <div>
                                                            
                                                            <div className="h6">
                                                            {theatre.theatreName}
                                                            </div>
                                                            Available Tickets: {theatre.noOfTickets}
                                                        </div>
                                                        
                                                        <button aria-label={"book-ticket-btn-comp-"+method.movieName+"-"+theatre.theatreName}  className={theatre.status!=="BOOK ASAP"?" btn btn-dark disabled":"btn btn-dark"}  onClick={()=>navigate("/bookTicket",{
                                                            state:{
                                                                movieName:method.movieName,
                                                                theatreName:theatre.theatreName,
                                                                seatNumbers:theatre.seatNumbers
                                                            }
                                                        })}>{theatre.status}</button>
                                                    </div>
                                                    
                                               
                                              
                                            </AccordionDetails>
                                            ))}
                                          
                                       
                                      </Accordion>
                                    )
                                )
                            }
                    </div>
                </div>
                            
            </div>
            
        </div>
    )
}