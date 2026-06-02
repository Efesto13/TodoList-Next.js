import { useEffect, useState } from "react";
import { updatetasks } from "@/services/task";

interface CardProps {
  description: string;
  state: "pending" | "inProgress" | "done";
  startDate: number | undefined;
  endDate: number | undefined;
  id: string;
  handleStart: (id: string) => void;
  handleEnd: (id: string) => void;
  handleDelete: (id: string) => void;
}

function rebbotTime(x: number): string {
  if (!x || isNaN(x) || x <= 0) {
    return "00:00:00";
  }
  
  try {
    const resultado = new Date(x).toISOString().slice(11, 19); 
    return resultado;
  } catch (error) {
    console.error("Error al formatear el tiempo:", error);
    return "00:00:00";
  }
}



export const Card = ({
  description,
  state,
  startDate,
  endDate,
  id,
  handleStart,
  handleEnd,
  handleDelete,
}: CardProps) => {
  const [TimeInProgress, setTimeInProgress] = useState("");
   const [editing, setEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(description);

  useEffect(() => {
    setLocalTitle(description)
  }, [description])

  useEffect(() => {
    if (!startDate) {
      return;
    }
    const interval = setInterval(() => {

      const diffTime = Date.now() - startDate;
      const diffFormated = rebbotTime(diffTime)
      setTimeInProgress(diffFormated);

    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const updateTask = async () => {
    if (!localTitle.trim() || localTitle === description) {
      setLocalTitle(description);
      setEditing(false);
      return
    };
    const res = await updatetasks(id, localTitle, );
    if (res) {
      setEditing(false)
    } else {
      console.error("No se pudo actualizar en la base de datos");
      setLocalTitle(description);
      setEditing(false);
    };
  };

const hasValidTimes = typeof startDate === "number" && typeof endDate === "number" && startDate > 0 && endDate > 0;

const totalTime = hasValidTimes ? endDate - startDate : 0;

const finalTime = totalTime > 0 ? rebbotTime(totalTime) : "00:00:00";

  return (
     <div
      className={`p-4 rounded-xl border transition-all duration-300 flex flex-col gap-3 backdrop-blur-sm
        ${state === "pending" ? "bg-slate-800/40 border-slate-700/60 shadow-md" : ""}
        ${state === "inProgress" ? "bg-amber-950/20 border-amber-500/40 shadow-amber-500/5 shadow-md" : ""}
        ${state === "done" ? "bg-emerald-950/20 border-emerald-500/30 opacity-75" : ""} 
      `}
    >
   
      <div className="flex items-start justify-between gap-4">
        
        <div className="flex-1 min-w-0">
          {editing && state !== "done" ? (
            <input
              type="text"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={updateTask} // Guarda automáticamente al hacer clic fuera
              onKeyDown={(e) => e.key === "Enter" && updateTask()} // Guarda al presionar Enter
              autoFocus
              className="w-full bg-slate-900 border border-violet-500 rounded-lg px-2 py-1 text-sm text-slate-200 focus:outline-none font-medium"
            />
          ) : (
            <div
              onDoubleClick={() => state !== "done" && setEditing(true)} // Activa al dar doble clic
              className={`text-base font-medium tracking-wide break-words transition-colors
                ${state === "done" ? "line-through text-slate-500 cursor-not-allowed" : "text-slate-200 hover:text-violet-400 cursor-pointer"}
              `}
              title={state !== "done" ? "Doble clic para editar" : "Las tareas completadas no se pueden modificar"}
            >
              {localTitle}
            </div>
          )}
        </div>
        
       
        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border shrink-0
          ${state === "pending" ? "bg-slate-700/50 text-slate-300 border-slate-600/50" : ""}
          ${state === "inProgress" ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse" : ""}
          ${state === "done" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : ""}
        `}>
          {state === "inProgress" ? "En progreso" : state === "done" ? "Hecho" : "Pendiente"}
        </span>
      </div>

     
      <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60">
        {state === "pending" && (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            <span>Tarea sin iniciar</span>
          </>
        )}
        {TimeInProgress && state === "inProgress" && (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-amber-300/90 font-mono">Tiempo: {TimeInProgress}</span>
          </>
        )}
        {state === "done" && (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400/90">Tarea Finalizada • Total: <span className="font-mono font-bold">{finalTime}</span></span>
          </>
        )}
      </div>


      <div className="mt-1 flex justify-end">
        {state === "pending" && (
          <button
            className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 active:scale-[0.98] text-slate-200 font-semibold text-xs py-2 px-4 rounded-lg transition-all duration-200 shadow-sm border border-slate-600/30"
            onClick={() => handleStart(id)}
          >
            Iniciar tarea
          </button>
        )}

        {state === "inProgress" && (
          <button
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-amber-950 font-bold text-xs py-2 px-4 rounded-lg transition-all duration-200 shadow-sm shadow-amber-600/10"
            onClick={() => handleEnd(id)}
          >
            Finalizar tarea
          </button>
        )}

        {state === "done" && (
          <button
            className="w-full sm:w-auto bg-rose-950/40 hover:bg-rose-600 text-rose-400 hover:text-white active:scale-[0.98] font-bold text-xs py-2 px-4 rounded-lg transition-all duration-200 border border-rose-500/20 hover:border-transparent"
            onClick={() => handleDelete(id)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
