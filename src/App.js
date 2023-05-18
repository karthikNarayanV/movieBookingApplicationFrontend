
import './App.css';
import Login from './login/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './register/Register';
import { SnackbarProvider,closeSnackbar} from 'notistack';

function App() {
  return (
    
     <SnackbarProvider maxSnack={3} 
     action={(snackbarId) => (
       <button className="btn btn-light" onClick={() => closeSnackbar(snackbarId)}>
         Dismiss
       </button>
     )}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
