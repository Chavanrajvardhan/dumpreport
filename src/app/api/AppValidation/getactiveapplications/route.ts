import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
      return NextResponse.json({ error: "Missing credentials", status: 401 });
    }

    const payload = {
      UserId: userId,
      token: token,
    };

    const response = await axios.post("https://testuatgate.rediport.in/api/UserLogin/getactiveapplications", payload);

    if (response.status !== 200) {
      return NextResponse.json({ error: "Unable to fetch data", status: 400 });
    }

    const data = response.data;

    return NextResponse.json({ message: "Data fetched successfully", status: 200, data }, { status: 200 });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Server error", status: 500 }, { status: 500 });
  }
}
