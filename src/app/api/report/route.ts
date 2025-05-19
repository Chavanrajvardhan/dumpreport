import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = await request.cookies.get("reportToken")?.value;
        const reqBody = await request.json();
        const { MonthDate, franchise, distributorId, orgSegment } = await reqBody;
        const payload = {
            MonthDate: MonthDate,
            franchise: franchise,
            distributorId: distributorId,
            orgSegment: orgSegment
        };

        // Fallback to default values if any key is null/undefined
        const safePayload = {
            MonthDate: payload.MonthDate ?? '0',
            franchise: payload.franchise ?? '0',
            distributorId: payload.distributorId ?? '0',
            orgSegment: payload.orgSegment ?? '0'
        };

        // Construct the Referer URL
        const refererUrl = `https://testapp1.rediport.in/dashboardparam/territoryreport?franchise=${encodeURIComponent(safePayload.franchise)}&selectedDate=${encodeURIComponent(safePayload.MonthDate)}&rowData=%20&templateName=GSG%20&distributorId=${encodeURIComponent(safePayload.distributorId)}&orgSegment=${encodeURIComponent(safePayload.orgSegment)}`;
        console.log("refererUrl", refererUrl);
        
        const headersInfo = {
            headers: {
                Authorization: token,
                Origin: "https://testapp1.rediport.in",
                Referer: refererUrl
            }
        };
        
        console.log("header",headersInfo)
        
        
        // const dataPayload = {
            //     MonthDate: "2025-01-01", franchise: "ENDO", distributorId: "0", orgSegment: null
            // };
            console.log("payload",payload)
            
            const res = await axios.post(
            "https://testapp1.rediport.in/api/TransactionReport/getterritorydumpreportdara",
            payload,
            headersInfo
        );

        console.log("res", res.data);

        if (!res) {
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