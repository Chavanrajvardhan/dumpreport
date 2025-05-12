import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    
    try {
        
        const body = await request.json();
        const { ApplicationID } = await body;
        const UserID = request.cookies.get('userId')?.value;
        const token = request.cookies.get('token')?.value;
        
    console.log("token", token);
    console.log("userId", UserID);
    console.log("ApplicationID", ApplicationID);

    const payload :any = {
        UserId: UserID,
        token: token,
        ApplicationId: ApplicationID,
    }
    
    const res:any = await axios.post("https://testuatgate.rediport.in/api/UserLogin/getApplicationURL",payload);
    
    console.log("Response token", res.data);
    if(!res.data) {
        throw new Error("Failed to fetch project data");
    }
    return NextResponse.json({ message:"Token generated successfully",status: 200, result: res.data }, { status: 200 });

} catch (error:any) {
    console.error("Error in getApplicationURL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    
}
    

}