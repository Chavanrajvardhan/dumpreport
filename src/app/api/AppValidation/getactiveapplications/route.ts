import axios from "axios";
import { NextRequest,NextResponse } from "next/server";
 
export async function POST(request: NextRequest) {
 
  try {
    const reqBody = await request.json();
    const { userId, token } = await reqBody;
 
    // console.log("all page access user ID "+userId);
   
    const data = {
      UserId: userId,
      token: token,
    };
    const response: any = await axios.post("https://testuatgate.rediport.in/api/UserLogin/getactiveapplications", data);
 
    if (response.status != 200) {
      return NextResponse.json({error:"Unable to fetch data",status:400})
    }
 
    // console.log(response.data);
   
    const Data:any = await response.data;
 
    // console.log("response from allpageaccess:");
   
    return NextResponse.json({message:"Data get Successfully",status:200,data:Data},{ status: 200 });
  }
  catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
}