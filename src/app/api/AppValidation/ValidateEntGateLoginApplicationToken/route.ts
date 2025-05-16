import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {
        const body = await request.json();
        const UserID = request.cookies.get('userId')?.value;
        const { ApplicationToken, AppId, RoleName, DistributorCode, WWID } = await body;

        const payload = {
            ApplicationToken: ApplicationToken,
            UserId: UserID,
            AppId: AppId,
            RoleName: RoleName,
            DistributorCode: DistributorCode,
            WWID: WWID
        };

        const encodedToken = encodeURIComponent(ApplicationToken);

        console.log("Encoded token", encodedToken);
        
        const refererUrl = `https://testapp1.rediport.in/entgatelogin?code=${encodedToken}&userId=3&appId=1&roleName=J%26J+COE&distributorCode=&wwid=20240430`;
        console.log("Referer URL", refererUrl);


        const res = await axios.post("https://testapp1.rediport.in/api/UserMaster/ValidateEntGateLoginApplicationToken", payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Referer: refererUrl,
                }
            }
        )
        // console.log(res.data);
        if (!res.data) {
            throw new Error("Failed to fetch project data");
        }
        // console.log("Response token", res.data.token);


        const reportToken: string = res.data.token;

        const responseData = NextResponse.json(
            { message: "Success", status: 200 }
        );

        responseData.cookies.set('reportToken', reportToken, { httpOnly: true });
        return responseData;

    } catch (error) {
        console.error("Error in ValidateEntGateLoginApplicationToken:", error);
        return NextResponse.json(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

}