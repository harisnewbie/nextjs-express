import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();


export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { token } = requestBody;
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        console.log(user)
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully!", success: true })
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}