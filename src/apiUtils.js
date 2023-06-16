
export const handleFetchResponse=(response)=>{
    if(response.status===401){
        throw new Error('Unauthorized')
    }
    return response;
}