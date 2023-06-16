import React,{useState,useEffect} from 'react';
import {  useSnackbar } from 'notistack';
import{ useNavigate } from 'react-router' ;
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './AdminHome.css';
import Popover from '@mui/material/Popover';
import { handleFetchResponse } from '../apiUtils';

export default function AdminHome(props){

    const { enqueueSnackbar } = useSnackbar();
    const [list,setList]=useState([]);
    const [dlist,setDlist]=useState(list);
    const navigate= useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [query, setquery] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
        

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

    const deleteApi = (mname,tname) =>  {
        var token=sessionStorage.getItem("token");
        const url="http://localhost:8081/"+mname+"/delete/"+tname;
        fetch(url,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${token}`,
            },
        }).then(handleFetchResponse)
        .then((response)=>{
            if(response.status===200){
                response.text().then(json=>{
                    enqueueSnackbar(" Delete Successfully", {variant: 'success' });
                    window.location.reload(false);
                               
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
                   
                   console.log(list)
                               
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
        <div className="movieList" data-testid="admin-home-comp" >
        
            
            <div className="searchbox ">
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
                <div className="text-left my-3 font-weight-bold h4">
                    Now Showing
                </div>
                
                            {console.log(dlist)}
                           {dlist.map(method=>(
                                        <Accordion key={method.movieName} expanded={expanded === method.movieName} onChange={handleChange(method.movieName)}>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls={method.movieName}
                                          id={method.movieName}
                                          key={method.movieName}
                                          className="d-flex justify-content-around"
                                        >
                                            
                                                <Typography className="m-1" sx={{ width: '33%', flexShrink: 0 }}>
                                                    <h5><b>{method.movieName}</b></h5>
                                                </Typography>
                                                <button className="btn btn-info mx-5" aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose} aria-label={"delete-movie-btn-comp-"+method.movieName} onClick={()=>deleteApi(method.movieName,"all")}>Delete Movie</button>
                                            
                                          
                                          
                                        </AccordionSummary>
                                        <hr/>
                                            {method.theatres.map((theatre)=>(
                                                <AccordionDetails key={theatre.theatreName}>
                                                    <div className="d-flex justify-content-between m-1">
                                                        <div>
                                                            <Typography className="m-2">
                                                                <h6><b>{theatre.theatreName}</b></h6>
                                                            </Typography>
                                                            
                                                        </div>
                                                        <div className="d-flex justify-content-between m-1">
                                                        
                                                            <button aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose} className="btn btn-info m-1" aria-label={"delete-movie-btn-comp-"+method.movieName+"-"+theatre.theatreName} onClick={()=>deleteApi(method.movieName,theatre.theatreName)}>Delete Theatre</button>
                                                            <button  className="btn btn-dark m-1"  onClick={()=>navigate("/admin-main/getDetail",{
                                                                state:{
                                                                    movieName:method.movieName,
                                                                    theatreName:theatre.theatreName,
                                                                    status:theatre.status
                                                                    
                                                                }
                                                            })}>View Details</button>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                               
                                              
                                            </AccordionDetails>
                                            ))}
                                          
                                       
                                      </Accordion>
                                    )
                                )
                            }
            </div>
            <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Are you sure to delete?</Typography>
      </Popover>
        </div>
    )
}