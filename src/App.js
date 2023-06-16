
import './App.css';
import Login from './login/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './register/Register';
import { SnackbarProvider,closeSnackbar} from 'notistack';
import UserHome from './user/user-home/UserHome';
import BookTicket from './bookTicket/BookTicket';
import Forgot from './forgot/Forgot';
import Reset from './reset/Reset';
import AdminHome from './admin-home/AdminHome';
import ViewMovie from './view-movie/ViewMovie';
import AdminMain from './admin-main/AdminMain';
import UserMain from './user/user-main/UserMain';
import AddMovie from './addMovie/AddMovie';

function App() {
  return (
    
     <SnackbarProvider maxSnack={3}  aria-label="snackbar"
     action={(snackbarId) => (
       <button className="btn btn-light" onClick={() => closeSnackbar(snackbarId)}>
         Dismiss
       </button>
     )}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/bookTicket" element={<BookTicket/>}/>
          <Route path="/user-home" element={<UserHome/>}/>
          <Route path="/forgot" element={<Forgot/>}/>
          <Route path="/reset" element={<Reset/>}/>
          <Route path="/user-main" element={<UserMain/>}>
            <Route path="user-home" element={<UserHome/>}/>
          </Route>
          
          <Route path="/admin-main" element={<AdminMain/>}>
            <Route path="user-home" element={<UserHome/>}/>
            <Route path="/admin-main/admin-home" element={<AdminHome/>}/>
            <Route path="/admin-main/getDetail" element={<ViewMovie/>}/>
            <Route path="/admin-main/add-movie" element={<AddMovie/>}/>
          </Route>
          
        </Routes>
      
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
