import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";

import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";
import { TextEncoder, TextDecoder } from 'util';
import mockFetch from '../mocks/mockFetch';
import AdminHome from './AdminHome';
import { act } from 'react-dom/test-utils';

Object.assign(global, { TextDecoder, TextEncoder });

configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
}))

describe("Admin Home",()=>{

    
    it("renders page",async()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      await act(() => {
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>,div)
      });
      const adminHomeComp=screen.getByTestId("admin-home-comp");
      expect(adminHomeComp).toBeInTheDocument();
    });

    it("renders page but data not loaded",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValueOnce({
            status:400,
            text:jest.fn().mockResolvedValueOnce("Error")
        });
        const div=document.createElement("div");
        act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>)
          
          
          });
        const adminHomeComp=screen.getByTestId("admin-home-comp");
        expect(adminHomeComp).toBeInTheDocument();
      });

      it("Session Expired",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValueOnce({
            status:401,
            text:jest.fn().mockResolvedValueOnce("Error")
        });
        const div=document.createElement("div");
        act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>)
          
          
          });
        const adminHomeComp=screen.getByTestId("admin-home-comp");
        expect(adminHomeComp).toBeInTheDocument();
      });

      it("search a movie",async ()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const div=document.createElement("div");
       await act(() => {
           render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>,div)
            
          
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
           render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>,div)
            
          
          });
          const input=screen.getByPlaceholderText('Search a Movie')
        fireEvent.change(input,{target:{
            value:''
        }});

        
      });
      
      it("delete a movie",async ()=>{
            jest.restoreAllMocks();
            jest.spyOn(window,'fetch').mockImplementation(mockFetch);
            const div=document.createElement("div");
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>,div)
                
            
            });
            const input=screen.getByLabelText("delete-movie-btn-comp-FFX")
            fireEvent.click(input);

            
        });


        it("delete a theatre",async ()=>{
            jest.restoreAllMocks();
            jest.spyOn(window,'fetch').mockImplementation(mockFetch);
            const div=document.createElement("div");
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>,div)
                
            
            });
            const input=screen.getByLabelText("delete-movie-btn-comp-FFX-PVR")
            fireEvent.click(input);

            
        });

        it("not deleted ",async ()=>{
            jest.restoreAllMocks();
            jest.spyOn(window,'fetch').mockImplementation(mockFetch);
            const div=document.createElement("div");
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminHome/></BrowserRouter></SnackbarProvider>,div)
                
            
            });
            const input=screen.getByLabelText("delete-movie-btn-comp-FFX-AGS")
            fireEvent.click(input);

            
        });
  
  

      
    
  });
  