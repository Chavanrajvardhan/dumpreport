import axios from "axios";
import { NextRequest,NextResponse } from "next/server";
 
export async function POST(request:NextRequest) {
    try {
       const reqBody = await request.json();
 
       const {email,password}:{email:string,password:string} = await reqBody;
 
       const data ={
        userName:email,
        password:password
       }
       console.log("api hits");
       
       const response:any = await axios.post('https://testuatgate.rediport.in/api/UserLogin/Login',data)
       
 
    //    console.log(response);
       
       
       if (response.status === 200)
        {
              console.log("login api hits properly");
              // console.log(response.status);
           
            //   console.log(response.data);
             
             
        const token = response.data.token;
        const userId = response.data.userId;
 
         
        const responseData = NextResponse.json(
            { message: "Login Successful",status:200 }
          );
 
          responseData.cookies.set("token",token,{httpOnly:true});
          responseData.cookies.set("userId",userId,{httpOnly:true});
        //   localStorage.setItem("token",token);
        // console.log("userId",userId);
       
          // console.log("token save");
         
          return responseData;
       }
    else{
 
         return NextResponse.json({error:"Internal server error",status:401})
    }
    } catch (error:any) {
        return NextResponse.json({error:error.message,status:400})
    }
}
 
