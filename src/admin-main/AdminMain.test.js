import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { BrowserRouter } from "react-router-dom";

import {screen,render,fireEvent} from "@testing-library/react"
import { SnackbarProvider } from "notistack";
import { TextEncoder, TextDecoder } from 'util';
import AdminMain from './AdminMain';
import mockFetch from '../mocks/mockFetch';



Object.assign(global, { TextDecoder, TextEncoder });


configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
}))


describe("AdminMain",()=>{

    
    it("renders page",()=>{
      jest.restoreAllMocks();
      jest.spyOn(window,'fetch').mockImplementation(mockFetch);
      const div=document.createElement("div");
      render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminMain/></BrowserRouter></SnackbarProvider>)
      
      const adminMainComp=screen.getByTestId("admin-main-comp");
      expect(adminMainComp).toBeInTheDocument();
    });
    

    

      it("Go to login page",()=>{
        
        jest.restoreAllMocks();
        jest.spyOn(window,'fetch').mockImplementation(mockFetch);
        const utils=render(<SnackbarProvider maxSnack={3} action={()=>{alert()}}><BrowserRouter><AdminMain /></BrowserRouter></SnackbarProvider>);
        const input=utils.getByTestId('logout-comp')
        fireEvent.click(input);
        
      });

      
    
  });
  