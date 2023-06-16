import React,{useState,useEffect} from 'react'
import {  useSnackbar } from 'notistack';
import { useNavigate } from 'react-router'
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { handleFetchResponse } from '../apiUtils';
import './AddMovie.css';

    const Theatre = (props) => {
        return (
        <div key={props.theatre.index}> 
                            <div className="form-group mt-3">
                                <TextField  data-testid="theatrename-comp"
                                    type="text"
                                    name="theatreName"
                                    aria-label="theatreName"
                                    className="form-control mt-1"
                                    placeholder="Enter Theatre Name"
                                    
                                    value={props.theatre.theatreName}
                                    onChange={(e) => props.handleTheatreChange(e, props.index)}
                                    required label="Theatre Name" variant="outlined" />
                            </div>
                            <div className="form-group mt-3">
                                <TextField  data-testid="noOfTickets-comp"
                                    type="text"
                                    name="noOfTickets"
                                    aria-label="noOfTickets"
                                    className="form-control mt-1"
                                    placeholder="Enter No Of Tickets"
                                    
                                    onChange={(e) => props.handleTheatreChange(e, props.index)}
                                    value={props.theatre.noOfTickets}
                                    required label="Number Of Tickets" variant="outlined" />
                                
                                </div>
                                <Divider className="mt-3" >Theatre {props.index+1}</Divider>
            
    
        </div>
        )
    }
export default function AddMovie(props){
    const [theatre,setTheatre]=useState({
        theatres:[
            {
                theatreName:"",
	            noOfTickets:""
            }
        ]
        
    });
    const [movie,setMovie]=useState({
        movieName:"",
        theatres:theatre.theatres
        
    });

    useEffect(() => {
        setMovie({...movie,theatres:theatre.theatres})
          
        },[theatre]);
    
    const navigate= useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleChange=(event)=>{
    
        const name=event.target.name;
        const value=event.target.value;
        
        setMovie(formInputs=>({...formInputs,[name]:value}));
        
        
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        
        console.log(movie)
        var token=sessionStorage.getItem("token");
        const url="http://localhost:8081/addMovie";
        
            fetch(url,{
                method:'POST',
                body:JSON.stringify(movie),
                headers:{'Content-type':'application/json','Authorization':`Bearer ${token}`},
            }).then(handleFetchResponse)
            .then((response)=>{
                if(response.status===200){
                    response.text().then(json=>{
                        
                        enqueueSnackbar("Movie Added Successfully", {variant: 'success' });
                       
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

    const addTheatreFields = (e) => {
        e.preventDefault();
        setTheatre({
          theatres: [
            ...theatre.theatres,
            {
                theatreName:"",
	            noOfTickets:""
            }
          ]
        });
        
        
      }
     const handleTheatreChange = (e, i) => {
        const name = e.target.name;
        const value = e.target.value;
        setTheatre(prevState => {
          return {
            theatres: [
              ...prevState.theatres.slice(0, i),
              { ...prevState.theatres[i], [name]: value },
              ...prevState.theatres.slice(i + 1)
            ]
          };
        });
        
        
      };
    return(
        <div className="add-movie-c">
<div data-testid="add-movie-comp" className="AM-form-container py-3">
                <form className="Auth-form-r " aria-label="add-movie-form" onSubmit={handleSubmit}>
                <div className="AM-form-content my-5">
                    <h3 className="AM-form-title">Add New Movie</h3>
                    <div className="row">
                        
                            <div className="form-group mt-3">
                                <TextField  data-testid="moviename-comp"
                                    type="text"
                                    name="movieName"
                                    aria-label="movieName"
                                    className="form-control mt-1"
                                    placeholder="Enter Movie Name"
                                    onChange={handleChange}
                                    value={movie.movieName}
                                    required label="Movie Name" variant="outlined" />
                            </div>
                            
                            
                        
                        
                        <div className="field mt-3">
                            <label>Theatres</label>
                        </div>
                        {theatre.theatres.map((theatre, index) => (
                            <Theatre
                            handleTheatreChange={handleTheatreChange}
                            
                            index={index}
                            key={index}
                            theatre={theatre}
                            />
                        ))}
                        <div className="d-grid gap-2 mt-3">
                                    <button onClick={addTheatreFields} aria-label="add-theatre" className="btn btn-info" ><span>Add Theatre</span></button>
                                </div>
                        <div className="d-grid gap-2 mt-3">
                            <input type="submit" className="btn btn-dark" />
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
        
            
        
    )
}