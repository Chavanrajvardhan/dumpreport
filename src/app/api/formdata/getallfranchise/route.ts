import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = await request.cookies.get("reportToken")?.value;
        // console.log("reportToken", token);
        console.log("api hit here");

        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEYXRhIjoiMXc0NnhXYmRLWGxHWDJPMXQ5WFkvL0JTaGpNbnZETXFyc3ZIeGdvcmlYbEk0QkNCT01EMEs1UmVKNllVYkVSUWJhaDRVSjNQSk1IMHJoSDdJbnV1bFVIOWd1bDZtL0hCcEZkMWJEbUYvRWM9IiwibmJmIjoxNzQ2Njk4NzA0LCJleHAiOjE3NDY3MTY3MDQsImlhdCI6MTc0NjY5ODcwNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNjkiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzY5In0.zZRlqS6qY9hFO5QnEsWA24o49TX1n5lE6jeAxRqn_80";

        const headersInfo = {
            headers: {
                Authorization: token,
                Origin:"https://testapp1.rediport.in",
                Referer:"https://testapp1.rediport.in/coe/report/territorydumpreportpage",
                "Content-Type": "application/json"
            }
        };

        const res :any = await axios.post(
            "https://testapp1.rediport.in/api/RaiseTicket/getallfranchise",
            {},
            headersInfo
        );

        console.log("res", res.data);

        if (!res.data) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Franchise fetched successfully", status: 200, result: res.data },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Error fetching data:", error);

        let errorMessage = "Unknown error";
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data?.message || error.response.statusText;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json(
            { error: "Failed to fetch data", details: errorMessage },
            { status: 500 }
        );
    }
}