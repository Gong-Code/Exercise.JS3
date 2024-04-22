import dbConnect from "@/lib/mongodb";
import Todo from "@/models/todoSchema";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { title, userId } = await req.json()

    if(!title || !userId){
        return NextResponse.json({ message: "Missing fields" }, 
        {status: 400})
    }

    try {
        await dbConnect();

        const user = await User.findById( userId )

        if(!user) {
            return NextResponse.json({ message: "User ID not found" }, 
            { status: 404 })
        }

        const todo = await Todo.create({
            title,
            userId
        })

        return NextResponse.json(todo, { status: 201 })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Something went wrong" }, 
        { status: 500 })
    }
}