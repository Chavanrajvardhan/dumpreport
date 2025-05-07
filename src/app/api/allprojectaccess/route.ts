import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { UserId, token } = await request.json();
  const data = {
    UserId: UserId,
    token: token,
  };

  try {
    const response: any = await axios.post("https://testuatgate.rediport.in/api/UserLogin/getactiveapplications", data);

    if (!response.data) {
      throw new Error("Network response was not ok");
    }

    // console.log("Response data:", response.data); 
    const newdata = await response.data;
    return new Response(JSON.stringify(newdata), { status: 200 });
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
}
