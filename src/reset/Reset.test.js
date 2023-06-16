import Reset from "./Reset";
import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";
import mockFetch from "../mocks/mockFetch";
import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";
import { TextEncoder, TextDecoder } from 'util';
import { act } from "react-dom/test-utils";

Object.assign(global, { TextDecoder, TextEncoder });


configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
}))

describe("Reset",()=>{

    beforeEach(()=>{
        sessionStorage.setItem("resetPasswordToken","Bearer asdfsdfsfsdfsd")
    })
    it("renders page",()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Reset/></BrowserRouter></SnackbarProvider>)
      
      const resetComp=screen.getByTestId("reset-comp");
      expect(resetComp).toBeInTheDocument();
    });
    

    it("Handle Change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Reset/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByPlaceholderText("Enter password")
        act(()=>{
            fireEvent.change(input,{target:{
                value:'admin'
            }});
        })
        act(()=>{
            fireEvent.keyUp(input,{target:{
                value:'admin'
            }});
        })
        const inputC=utils.getByPlaceholderText("Enter Confirm password")
        act(()=>{
            fireEvent.change(inputC,{target:{
                value:'admin'
            }});
        })
        fireEvent.submit(input);
        
        
      });

      it("Handle Submit",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:200,
            text:async()=>"completed"
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Reset/></BrowserRouter></SnackbarProvider>);
        const inputF=utils.getByLabelText('reset-form')
        const input=utils.getByPlaceholderText("Enter password")
        act(()=>{
            fireEvent.change(input,{target:{
                value:'admin'
            }});
        })
        act(()=>{
            fireEvent.keyUp(input,{target:{
                value:'admin'
            }});
        })
        const inputC=utils.getByPlaceholderText("Enter Confirm password")
        act(()=>{
            fireEvent.change(inputC,{target:{
                value:'admin'
            }});
        })
        fireEvent.submit(inputF);
      });

      it("Handle Submit and error",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:400
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Reset/></BrowserRouter></SnackbarProvider>);
        const inputF=utils.getByLabelText('reset-form')
        const input=utils.getByPlaceholderText("Enter password")
        act(()=>{
            fireEvent.change(input,{target:{
                value:'admin'
            }});
        })
        act(()=>{
            fireEvent.keyUp(input,{target:{
                value:'admin'
            }});
        })
        const inputC=utils.getByPlaceholderText("Enter Confirm password")
        act(()=>{
            fireEvent.change(inputC,{target:{
                value:'admin'
            }});
        })
        fireEvent.submit(inputF);
      });


      it("Handle Submit and retry",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:400
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Reset/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('reset-form')
        fireEvent.submit(input);
      });

      it("Session Expired",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:401,
            text:jest.fn().mockResolvedValueOnce("Error")      
        });
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Reset/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByLabelText('reset-form')
        fireEvent.submit(input);
      });

      it("Go to login page",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><Reset /></BrowserRouter></SnackbarProvider>);
        const input=utils.getByTestId('login-btn-comp')
        fireEvent.click(input);
        
      });

      
    
  });
  