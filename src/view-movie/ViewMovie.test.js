import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";

import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";
import { TextEncoder, TextDecoder } from 'util';
import mockFetch from '../mocks/mockFetch';
import ViewMovie from './ViewMovie';





Object.assign(global, { TextDecoder, TextEncoder });


configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
    useLocation: () => ({ state: {
        movieName:"FFX",
        theatreName:"PVR",
        status:"BOOK ASAP"
    }}),
    

}))

const logSpy = jest.spyOn(global.console, 'log');


describe("ViewMovie",()=>{

    
    it("renders page",()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue(mockFetch);
      const div=document.createElement("div");
      render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
      const viewMovieComp=screen.getByTestId("view-movie-comp");
      expect(viewMovieComp).toBeInTheDocument();
    });

    it("data loaded along with page render",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const div=document.createElement("div");
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const viewMovieComp=screen.getByTestId("view-movie-comp");
        expect(viewMovieComp).toBeInTheDocument();
      });

      it("data not loaded along with page render",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:400,
            text:jest.fn().mockResolvedValueOnce("Error")      
            
        });


        const div=document.createElement("div");
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const viewMovieComp=screen.getByTestId("view-movie-comp");
        expect(viewMovieComp).toBeInTheDocument();
      });
      it("Session Expired",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
            status:401,
            text:jest.fn().mockResolvedValueOnce("Error")      
            
        });

        
        const div=document.createElement("div");
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const viewMovieComp=screen.getByTestId("view-movie-comp");
        expect(viewMovieComp).toBeInTheDocument();
      });

    it("set change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const div=document.createElement("div");
        render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const radio1 = screen.getByRole('radio',{name:"BOOK ASAP"})
        const radio2 = screen.getByRole('radio',{name:"SOLD OUT"})
        fireEvent.click(radio2)
        fireEvent.click(radio1)
        
      });

      it("Submit ",()=>{
        
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue(mockFetch);
      const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
      const input=utils.getByLabelText('ticket-detail')
      fireEvent.submit(input);
    });

    it("Confirm",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const input=utils.getByLabelText('ticket-detail')
        fireEvent.submit(input);
        const confirm=utils.getByLabelText('confirm-ticket')
        fireEvent.click(confirm);
      });
      it("Session Expired during submit",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        jest.spyOn(window,'fetch').mockResolvedValue({
          status:401,
          text:jest.fn().mockResolvedValueOnce("Error")      
          
      });
        const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const input=utils.getByLabelText('ticket-detail')
        fireEvent.submit(input);
        const confirm=utils.getByLabelText('confirm-ticket')
        fireEvent.click(confirm);
      });

      it("Not updated",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        jest.spyOn(window,'fetch').mockResolvedValue({
          status:400,
          text:jest.fn().mockResolvedValue("Error")      
          
      });
        const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const input=utils.getByLabelText('ticket-detail')
        fireEvent.submit(input);
        const confirm=utils.getByLabelText('confirm-ticket')
        fireEvent.click(confirm);
      });

      it("Cancel confirmation",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue(mockFetch);
        const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><ViewMovie/></BrowserRouter></SnackbarProvider>)
        const input=utils.getByLabelText('ticket-detail')
        fireEvent.submit(input);
        const cancel=utils.getByLabelText('cancel-ticket')
        fireEvent.click(cancel);
      });
    

    

     
    

      
    
  });
  