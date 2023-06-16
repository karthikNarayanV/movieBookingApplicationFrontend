import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";

import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";
import { TextEncoder, TextDecoder } from 'util';
import mockFetch from '../mocks/mockFetch';

import { act } from 'react-dom/test-utils';
import BookTicket from './BookTicket';

Object.assign(global, { TextDecoder, TextEncoder });

configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
    useLocation: () => ({ state: {
        movieName:"FFX",
        theatreName:"PVR",
        status:"BOOK ASAP",
        seatNumbers:[4,5,6,7,8,9,10,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120]
    }}),
}))

describe("Admin Home",()=>{

    
    it("renders page",async()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      await act(() => {
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>,div)
      });
      const adminHomeComp=screen.getByTestId("book-ticket-comp");
      expect(adminHomeComp).toBeInTheDocument();
    });

    it("Go Back",async()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>)
          });
        const input=screen.getByTestId('goback-btn-comp')
        fireEvent.click(input);
        
      });

      it("Book Ticket without selecting seats",async()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>)
          });
        const input=screen.getByTestId('book-btn-comp')
        fireEvent.click(input);
        
      });

      it("Book Ticket by selecting seats",async()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>)
          });
          const seat1=screen.getByTestId("seat-number-0")
          fireEvent.click(seat1);
          const seat2=screen.getByTestId("seat-number-1")
          fireEvent.click(seat2);
        const input=screen.getByTestId('book-btn-comp')
        fireEvent.click(input);
        
      });

      it("Confirm booking",async()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>)
          });
          const seat1=screen.getByTestId("seat-number-0")
          fireEvent.click(seat1);
          const seat2=screen.getByTestId("seat-number-1")
          fireEvent.click(seat2);
        const input=screen.getByTestId('book-btn-comp')
        fireEvent.click(input);
        
        const confirm=screen.getByTestId('confirm-btn-comp')
        fireEvent.click(confirm);
        
      });

      it("Not booked",async()=>{
        
        jest.restoreAllMocks();
        
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:400,
            text:jest.fn().mockResolvedValueOnce("Error")      
        }
    );
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>)
          });
          const seat1=screen.getByTestId("seat-number-0")
          fireEvent.click(seat1);
          const seat2=screen.getByTestId("seat-number-1")
          fireEvent.click(seat2);
        const input=screen.getByTestId('book-btn-comp')
        fireEvent.click(input);
        
        const confirm=screen.getByTestId('confirm-btn-comp')
        fireEvent.click(confirm);
        
      });

      it("Session Expired",async()=>{
        
        jest.restoreAllMocks();
        
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:401,
            text:jest.fn().mockResolvedValueOnce("Error")      
        }
    );
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>)
          });
          const seat1=screen.getByTestId("seat-number-0")
          fireEvent.click(seat1);
          const seat2=screen.getByTestId("seat-number-1")
          fireEvent.click(seat2);
        const input=screen.getByTestId('book-btn-comp')
        fireEvent.click(input);
        
        const confirm=screen.getByTestId('confirm-btn-comp')
        fireEvent.click(confirm);
        
      });

      it("Confirm booking",async()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        await act(() => {
            render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><BookTicket/></BrowserRouter></SnackbarProvider>)
          });
          const seat1=screen.getByTestId("seat-number-0")
          fireEvent.click(seat1);
          const seat2=screen.getByTestId("seat-number-1")
          fireEvent.click(seat2);
        const input=screen.getByTestId('book-btn-comp')
        fireEvent.click(input);
        
        const confirm=screen.getByTestId('cancel-btn-comp')
        fireEvent.click(confirm);
        
      });
    

      
      
  
  

      
    
  });
  