import Register from "./Register";
import { configure } from 'enzyme';
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



describe("Register",()=>{
    it("renders page",()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>)
      
      const registerComp=screen.getByTestId("register-comp");
      expect(registerComp).toBeInTheDocument();
    });
    

    it("Handle Change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByPlaceholderText('Enter email')
        fireEvent.change(input,{target:{
            value:'admin'
        }});
        
        
      });

      it("Handle Password Change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
        const inputPassword=utils.getByPlaceholderText('Enter password')
        
        const inputCPassword=utils.getByPlaceholderText('Enter Confirm password')
        fireEvent.change(inputPassword,{target:{
            value:'admin'
        }});
        fireEvent.change(inputCPassword,{target:{
            value:'admi'
        }});
        

        
        
      });
      it("Handle Password Confirmation",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
        const inputPassword=utils.getByPlaceholderText('Enter password')
        
        const inputCPassword=utils.getByPlaceholderText('Enter Confirm password')
        fireEvent.change(inputPassword,{target:{
            value:'admin'
        }});
        fireEvent.change(inputCPassword,{target:{
            value:'admin'
        }});
        

        
        
      });

      it("Handle Submit",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('register-form')
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
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('register-form')
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
      const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
      const input=utils.getByLabelText('register-form')
      fireEvent.submit(input);
    });

    it("Submission restricted",()=>{
        const loginReturn={
            token:'Done',
            roles:['ROLE_USER']
        }
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue({
          status:200,
          json:async()=>loginReturn
      });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
        const inputPassword=utils.getByPlaceholderText('Enter password')
        
        const inputCPassword=utils.getByPlaceholderText('Enter Confirm password')
        fireEvent.change(inputPassword,{target:{
            value:'admin'
        }});
        fireEvent.change(inputCPassword,{target:{
            value:'admi'
        }});
        const input=utils.getByLabelText('register-form')
      fireEvent.submit(input);
    });



    it("Submit and navigate to user page",()=>{
        
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue({
          status:400,
          json:"Error"
          
      });
      const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
      const input=utils.getByLabelText('register-form')
      fireEvent.submit(input);
    });

    it("Session Expired",()=>{
        
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue({
          status:401,
          json:"Error"
          
      });
      const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register/></BrowserRouter></SnackbarProvider>);
      const input=utils.getByLabelText('register-form')
      fireEvent.submit(input);
    });

    it("Go to login page",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Register /></BrowserRouter></SnackbarProvider>);
        const input=utils.getByTestId('login-btn-comp')
        fireEvent.click(input);
        
      });
    
  });
  