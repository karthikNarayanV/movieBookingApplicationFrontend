import { handleFetchResponse } from "./apiUtils";

describe("Handle Fetch Response",()=>{
    it("Throws error",()=>{
     const response={status:401};
     expect(()=>handleFetchResponse(response)).toThrowError('Unauthorized');
    });

    it("Returns response without error",()=>{
        const response={status:200};
        const result=handleFetchResponse(response)
        expect(result).toBe(response);
       });
    
  
    
  });