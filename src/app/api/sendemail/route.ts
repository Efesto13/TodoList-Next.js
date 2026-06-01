import nodemailer from "nodemailer"
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    
    const{ name, email } = await req.json();



    if (!name || !email) return NextResponse.json({ error: "Faltan datos" }, { status: 400 });



};