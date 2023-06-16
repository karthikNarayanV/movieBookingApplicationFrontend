const loginReturn={
    token:'Done',
    roles:['ROLE_ADMIN','ROLE_USER']
}
const loadData={
    movieName: 'FFX',
theatreName:'PVR',
available: 100,
booked: 20
}

const data=[{"movieName":"FFX","theatres":[{"theatreName":"PVR","noOfTickets":115,"status":"BOOK ASAP","seatNumbers":[4,5,6,7,8,9,10,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120]},{"theatreName":"AGS","noOfTickets":120,"status":"BOOK ASAP","seatNumbers":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120]}]},{"movieName":"GOTG","theatres":[{"theatreName":"PVR","noOfTickets":120,"status":"BOOK ASAP","seatNumbers":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120]},{"theatreName":"AGS","noOfTickets":120,"status":"BOOK ASAP","seatNumbers":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120]}]}]
export default async function mockFetch(url){
    console.log(url)
    switch(url){
        case 'http://localhost:8081/login':{
            return{
                ok:true,
                status:200,
                json:async ()=> loginReturn,
            }
        }
        case 'http://localhost:8081/FFX/ticket/PVR':{
            return{
                ok:true,
                status:200,
                json:async ()=> loadData,
            }
        }
        case 'http://localhost:8081/FFX/update/PVR':{
            return{
                ok:true,
                status:200,
                text:jest.fn().mockResolvedValueOnce("Success")        
            }
        }
        case 'http://localhost:8081/addMovie':{
            return{
                ok:true,
                status:200,
                text:jest.fn().mockResolvedValueOnce("Success")      
                
            }
        }
        
        case 'http://localhost:8081/all':{
            return{
                ok:true,
                status:200,
                json:async ()=> data       
            }
        }

        case 'http://localhost:8081/FFX/delete/all':{
            return{
                ok:true,
                status:200,
                text:jest.fn().mockResolvedValueOnce("Deleted")      
            }
        }

        case 'http://localhost:8081/FFX/delete/PVR':{
            return{
                ok:true,
                status:200,
                text:jest.fn().mockResolvedValueOnce("Deleted")      
            }
        }
        case 'http://localhost:8081/FFX/add':{
            return{
                ok:true,
                status:200,
                text:jest.fn().mockResolvedValueOnce("Bookeds")      
            }
        }
        

        default:{
            return{
                status:400,
                text:jest.fn().mockResolvedValueOnce("Error")      
            }
        }
        
    }
}