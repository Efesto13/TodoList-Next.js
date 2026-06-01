import { useEffect, useState } from "react";

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

function rebbotTime(x: number):string{
  const resultado = new Date(x).toISOString().slice(11,19); 
  return resultado
};



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

  const totalTime = endDate && startDate && endDate - startDate;
  const finalTime = totalTime && rebbotTime(totalTime);
  
 return (
    <div
      className={`p-4 rounded-xl border transition-all duration-300 flex flex-col gap-3 backdrop-blur-sm
        ${state === "pending" ? "bg-slate-800/40 border-slate-700/60 shadow-md" : ""}
        ${state === "inProgress" ? "bg-amber-950/20 border-amber-500/40 shadow-amber-500/5 shadow-md" : ""}
        ${state === "done" ? "bg-emerald-950/20 border-emerald-500/30 opacity-75" : ""} 
      `}
    >
      {/* Fila superior: Descripción y Badge de Estado */}
      <div className="flex items-start justify-between gap-4">
        <div className={`text-base font-medium tracking-wide flex-1 break-words
          ${state === "done" ? "line-through text-slate-500" : "text-slate-200"}
        `}>
          {description}
        </div>
        
        {/* Badge de estado dinámico */}
        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full border
          ${state === "pending" ? "bg-slate-700/50 text-slate-300 border-slate-600/50" : ""}
          ${state === "inProgress" ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse" : ""}
          ${state === "done" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : ""}
        `}>
          {state === "inProgress" ? "En progreso" : state === "done" ? "Hecho" : "Pendiente"}
        </span>
      </div>

      {/* Fila central: Información de Tiempos */}
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

      {/* Fila inferior: Botones de Acción */}
      <div className="mt-1 flex justify-end">
        {state === "pending" && (
          <button
            className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 active:scale-[0.98] text-slate-200 font-semibold text-xs py-2 px-4 rounded-lg transition-all duration-200 shadow-sm border border-slate-600/30"
            onClick={() => {
              handleStart(id);
            }}
          >
            Iniciar tarea
          </button>
        )}

        {state === "inProgress" && (
          <button
            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-amber-950 font-bold text-xs py-2 px-4 rounded-lg transition-all duration-200 shadow-sm shadow-amber-600/10"
            onClick={() => {
              handleEnd(id);
            }}
          >
            Finalizar tarea
          </button>
        )}

        {state === "done" && (
          <button
            className="w-full sm:w-auto bg-rose-950/40 hover:bg-rose-600 text-rose-400 hover:text-white active:scale-[0.98] font-bold text-xs py-2 px-4 rounded-lg transition-all duration-200 border border-rose-500/20 hover:border-transparent"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
