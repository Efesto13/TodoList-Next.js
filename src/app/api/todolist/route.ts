import Todolist from "@/database/model/todoList";
import { conectionDB } from "@/lib/database";
import { NextResponse, NextRequest} from "next/server";

await conectionDB();

export async function POST(req: Request){
    try {
       

        const {id, title,state,endDate,startDate} = await req.json();

        if(!title) return NextResponse.json({error: "Titulo obligatorio"},{status: 400})

      const newTask = await Todolist.create({
            id,
            title,
            state,
            endDate,
            startDate
        });
        return NextResponse.json(
            {mensagge: "Tarea Creada", data: newTask},
            {status: 200}
        );
    } catch (error) {
        return console.error("Error en el metodo post")
    };
};

export async function GET() {
    try {
        const data = await Todolist.find()

        if(!data) NextResponse.json({error: "Falla la obtencion de datos" , data: data},{status: 400}) 
        
        return NextResponse.json(
            {mensagge: "Obtencion Exitosa", data:data},
            {status: 200}
        )
    } catch (error) {
        return console.error("Error en el get")
    };
};



