import Login from "./Login";
import { configure} from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";
import mockFetch from "../mocks/mockFetch";
import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";


import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });


configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
}))


describe("Login",()=>{
    it("renders page",()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login/></BrowserRouter></SnackbarProvider>)
      
      const loginComp=screen.getByTestId("login-comp");
      expect(loginComp).toBeInTheDocument();
    });
    

    it("Handle Change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('Email')
        fireEvent.change(input,{target:{
            value:'admin'
        }});
        
        
      });

      it("Handle Submit",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('login-form')
        fireEvent.submit(input);
      });

      it("Submit and navigate to admin page",()=>{
          const loginReturn={
              token:'Done',
              roles:['ROLE_ADMIN']
          }
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:200,
            json:async()=>loginReturn
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('login-form')
        fireEvent.submit(input);
      });

      it("Submit and navigate to user page",()=>{
        const loginReturn={
            token:'Done',
            roles:['ROLE_USER']
        }
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue({
          status:200,
          json:async()=>loginReturn
      });
      const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login/></BrowserRouter></SnackbarProvider>);
      const input=utils.getByLabelText('login-form')
      fireEvent.submit(input);
    });

    it("Submit and see error message",()=>{
        
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue({
          status:400,
          text:jest.fn().mockResolvedValueOnce("Error")      
          
      });
      const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login/></BrowserRouter></SnackbarProvider>);
      const input=utils.getByLabelText('login-form')
      fireEvent.submit(input);
    });

    it("Session Expired",()=>{
        
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue({
          status:401,
          json:async()=>"Error"
          
      });
      const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login/></BrowserRouter></SnackbarProvider>);
      const input=utils.getByLabelText('login-form')
      fireEvent.submit(input);
    });

    it("Go to register page",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Login /></BrowserRouter></SnackbarProvider>);
        const input=utils.getByTestId('register-btn-comp')
        fireEvent.click(input);
        
      });
    
  });
  