import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConnect();

export async function GET(req: NextRequest) {
    const userId = await getDataFromToken(req);
    // console.log(userId)
    const user = await User.findById({_id: userId}).select("-password");
    // console.log(user)
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // console.log(NextResponse.json({ message: "User Found", user }, { status: 200 }));
    return NextResponse.json({ message: "User Found", data: user }, { status: 200 });
}