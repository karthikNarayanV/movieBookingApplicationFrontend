import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";

import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";
import { TextEncoder, TextDecoder } from 'util';


import { act } from 'react-dom/test-utils';
import UserHome from './UserHome';
import mockFetch from '../../mocks/mockFetch';

Object.assign(global, { TextDecoder, TextEncoder });

configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
}))

describe("User Home",()=>{

    
    it("renders page",async()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      await act(() => {
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><UserHome/></BrowserRouter></SnackbarProvider>,div)
      });
      const userHomeComp=screen.getByTestId("user-home-comp");
      expect(userHomeComp).toBeInTheDocument();
    });

    it("renders page but data not loaded",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValueOnce({
            status:400,
            text:jest.fn().mockResolvedValueOnce("Error")
        });
        const div=document.createElement("div");
        act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><UserHome/></BrowserRouter></SnackbarProvider>)
          
          
          });
          const userHomeComp=screen.getByTestId("user-home-comp");
          expect(userHomeComp).toBeInTheDocument();
      });

      it("Session Expired",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValueOnce({
            status:401,
            text:jest.fn().mockResolvedValueOnce("Error")
        });
        const div=document.createElement("div");
        act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><UserHome/></BrowserRouter></SnackbarProvider>)
          
          
          });
          const userHomeComp=screen.getByTestId("user-home-comp");
          expect(userHomeComp).toBeInTheDocument();
      });

      it("search a movie",async ()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const div=document.createElement("div");
       await act(() => {
           render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><UserHome/></BrowserRouter></SnackbarProvider>,div)
            
          
          });
          const input=screen.getByPlaceholderText('Search a Movie')
        fireEvent.change(input,{target:{
            value:'FFX'
        }});

        
      });

      it("displaying all movies",async ()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const div=document.createElement("div");
       await act(() => {
           render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><UserHome/></BrowserRouter></SnackbarProvider>,div)
            
          
          });
          const input=screen.getByPlaceholderText('Search a Movie')
        fireEvent.change(input,{target:{
            value:''
        }});

        
      });

      it("book ticket ",async ()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const div=document.createElement("div");
    await act(() => {
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><UserHome/></BrowserRouter></SnackbarProvider>,div)
            
        
        });
        const input=screen.getByLabelText("book-ticket-btn-comp-FFX-PVR")
        fireEvent.click(input);

        
    });
      
      
  
  

      
    
  });
  