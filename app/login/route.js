import dbConnect from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export const POST = async (req) => {
    const { email, password } = await req.json();

    if(!email || !password) {
        return NextResponse.json({ message: "Please enter an email or a password" }
        ,{ status: 400 })
    }

    try {
        await dbConnect();

        const user = await User.findOne({ email })

        if(!user) {
            return NextResponse.json({ message: "Invalid credentials" }, 
            {status: 401})
        }

        const confirmUser = await bcrypt.compare(password, user.passwordHash)
        if(!confirmUser){
            return NextResponse.json({ message: "Invalid credentials" },
            { status: 401 }) 
        }

        return NextResponse.json({ apiKey: user.apiKey }, { status: 200 })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something went wrong" }, 
        {status: 500})
    }
}