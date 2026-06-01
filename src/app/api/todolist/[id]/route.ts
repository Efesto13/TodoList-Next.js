import Todolist from "@/database/model/todoList";
import { conectionDB } from "@/lib/database";
import { NextResponse, NextRequest } from "next/server";

await conectionDB();

export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        const {id} = await params

        const dato = await Todolist.findOneAndDelete({ id: id });

        if (!dato) return NextResponse.json({ error: "Falla en eliminar los datos", data: dato }, { status: 400 });

        return NextResponse.json(
            { mensagge: "Eliminado", data: dato },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en el Delete", error)
        return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
    };

};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params
        const { title } = await req.json();
        const data = await Todolist.findOneAndUpdate( 
            { id: id },
            { title: title },
            { new: true }
        );

        if (!data) return NextResponse.json({ error: "Falla en actualizar los datos", data: data }, { status: 400 });

        return NextResponse.json(
            { mensagge: "Eliminado", data: data },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error en el PATCH", error)
        return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }
}

