import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import  bcrypt  from "bcryptjs"
import dbConnect from "@/lib/mongodb";

export const POST = async (req) => {
    const { email, password } = await req.json();

    if(!email || !password){
        return NextResponse.json({ message: "Please enter an email and a password" }
        ,{ status: 400 })
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        await dbConnect();

        const user = await User.create({
            email,
            passwordHash: hash,
            apiKey: uuidv4()
        })

        return NextResponse.json({ apiKey: user.apiKey }, {status: 201})


    } catch (err) {
        console.log(err)
        if(err.code === 11000){
            return NextResponse.json({ message: "Email already exists" }, { status: 400 })
        }
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}

