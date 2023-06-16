import Forgot from "./Forgot";
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

describe("Forgot",()=>{
    it("renders page",()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Forgot/></BrowserRouter></SnackbarProvider>)
      
      const forgotComp=screen.getByTestId("forgot-comp");
      expect(forgotComp).toBeInTheDocument();
    });
    

    it("Handle Change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Forgot/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByPlaceholderText("Enter email address")
        fireEvent.change(input,{target:{
            value:'admin'
        }});
        
        
      });

      it("Handle Submit",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:200,
            text:async()=>"completed"
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Forgot/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('forgot-form')
        fireEvent.submit(input);
      });


      it("Handle Submit and retry",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:400
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Forgot/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('forgot-form')
        fireEvent.submit(input);
      });

      it("Session Expired",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:401
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Forgot/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('forgot-form')
        fireEvent.submit(input);
      });

      it("Go to login page",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Forgot /></BrowserRouter></SnackbarProvider>);
        const input=utils.getByTestId('login-btn-comp')
        fireEvent.click(input);
        
      });

      
    
  });
  