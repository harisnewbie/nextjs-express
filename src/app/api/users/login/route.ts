import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error : "User does not exist"}, {status : 400});
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error : "Invalid password"}, {status : 400});
        }

        //create token data
        const tokenData = {
            id : user._id,
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const response = NextResponse.json({token, message : "Login successful!", success: true});
        response.cookies.set("token", token, { httpOnly : true });
        return response;

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}