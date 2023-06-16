import React from "react";
import App from './App';
import { configure, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import {render,fireEvent,screen} from "@testing-library/react"
import { TextEncoder, TextDecoder } from 'util';
import { SnackbarProvider } from "notistack";

Object.assign(global, { TextDecoder, TextEncoder });


configure({ adapter: new Adapter() });
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate:()=>jest.fn(),
}))



describe("App",()=>{
  it("renders correctly",()=>{
    shallow(<App/>)
  });

  it("close snackbar",()=>{
    render(<App/>)
    const mockCloseSnackbar=jest.fn();
    const closeSnackBarProp={closeSnackBar:mockCloseSnackbar}
    render(<App {...closeSnackBarProp}/>)
    const closeButton=screen.getByText('Dismiss');
    fireEvent.click(closeButton)
  });
  

  
});