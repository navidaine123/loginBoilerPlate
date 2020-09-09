import { Context } from "https://deno.land/x/oak/mod.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt@v1.2/create.ts";

// export const login = async ({request,response}:{request:any,response:any}) =>{
//     console.log(JSON.stringify(await request.body()));
//     // const value = await request.body;
//     // console.log(JSON.stringify(value.username));
//     // const key = "navid";
    
//     // const header: Jose = {
//     // alg: "HS256",
//     // typ: "JWT",
//     // };

//     // for(const user of users)
//     // {
//     //     if(value.username === user.username && value.password === user.password)
//     //     {
//     //         const payload: Payload = 
//     //         {
//     //             iss: user.username,
//     //             exp: setExpiration(new Date().getTime() + 60000),
//     //         }
//     //         const jwt = makeJwt({key, header, payload});
//     //         if(jwt)
//     //         {
//     //             response ={
//     //                 status : 200,
//     //                 body:{
//     //                     id : user.id,
//     //                     username: user.username,
//     //                     jwt : jwt
//     //                 } 
//     //             }
//     //         }else{
//     //             response ={
//     //                 status : 500,
//     //                 message : "internal server error"
//     //             }
//     //         }
//     //     }
   
//     // }
//     // response ={
//     //     status : 400,
//     //     message : "usernmae or password is incorrect"
//     // }
// }

