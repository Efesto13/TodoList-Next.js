import Todolist from "@/database/model/todoList";
import { NextResponse, NextRequest } from "next/server";




export async function DELETE(req: NextRequest, {params}: {params: {id: string}} ){
    try {
        

        const {id} = await params

        const dato = await Todolist.findOneAndDelete({id : id});

        if(!dato) return NextResponse.json({error: "Falla en eliminar los datos" , data: dato},{status: 400});

        return NextResponse.json(
            {mensagge: "Eliminado", data:dato},
            {status: 200}
        );
    } catch (error) {
        console.error("Error en el Delete", error)
        return NextResponse.json({error: "Error al eliminar"}, {status: 500});
    }

}

