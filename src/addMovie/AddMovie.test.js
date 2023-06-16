import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";

import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";
import { TextEncoder, TextDecoder } from 'util';
import mockFetch from '../mocks/mockFetch';
import AddMovie from "./AddMovie";

Object.assign(global, { TextDecoder, TextEncoder });

configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
}))

describe("AddMovie",()=>{

    
    it("renders page",()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockResolvedValue(mockFetch);
      const div=document.createElement("div");
      render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AddMovie/></BrowserRouter></SnackbarProvider>)
      const addMovieComp=screen.getByTestId("add-movie-comp");
      expect(addMovieComp).toBeInTheDocument();
    });

    it("Handle Change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AddMovie/></BrowserRouter></SnackbarProvider>);
        const input=utils.getByPlaceholderText('Enter Movie Name')
        fireEvent.change(input,{target:{
            value:'FFX'
        }});
        
        
      });

      it("Add extra theatre fields",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AddMovie/></BrowserRouter></SnackbarProvider>);
        const add=utils.getByLabelText('add-theatre')
        fireEvent.click(add);
        
        
      });

      it("Handle Theatre Detail Change",()=>{
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AddMovie/></BrowserRouter></SnackbarProvider>);
        const input1=utils.getByPlaceholderText('Enter Theatre Name')
        fireEvent.change(input1,{target:{
            value:'PVR'
        }});
        
        const input2=utils.getByPlaceholderText('Enter No Of Tickets')
        fireEvent.change(input2,{target:{
            value:120
        }});

        
        
      });

   
      it("Submit ",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AddMovie/></BrowserRouter></SnackbarProvider>)
        const input=utils.getByLabelText('add-movie-form')
        fireEvent.submit(input);
      });

      it("Submit and error",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
          status:400,
          text:jest.fn().mockResolvedValueOnce("Error")      
      }
  );
        const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AddMovie/></BrowserRouter></SnackbarProvider>)
        const input=utils.getByLabelText('add-movie-form')
        fireEvent.submit(input);
      });
  
      it("Session Expired",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockResolvedValue({
          status:401,
          text:jest.fn().mockResolvedValueOnce("Error")      
      }
  );
        const utils= render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AddMovie/></BrowserRouter></SnackbarProvider>)
        const input=utils.getByLabelText('add-movie-form')
        fireEvent.submit(input);
      });

      
    
  });
  