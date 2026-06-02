'use client'
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { todoListProps } from "@/interface_type/todolisto"
import { getTasks, deleteTasks, addTasks, updateState } from "@/services/task";
import { useRouter } from "next/navigation";



function Home() {
  const [title, setTitle] = useState("");
  const [todoList, setTodoList] = useState<todoListProps[]>([]);
  const router = useRouter();

  const addTask = async () => {
    try {
      if (!title.trim()) return;

      const resultado = await addTasks(title);

      if (resultado && resultado.data) {
        const nuevaTarea = {
          ...resultado.data,
          id: resultado.data.id || resultado.data._id,
          startDate: undefined,
          endDate: undefined
        };
        setTodoList([...todoList, nuevaTarea]);

        setTitle("");
      } else {
        console.error("El servidor no devolvió los datos de la tarea");
      }

    } catch (error) {
      console.error("Error al agregar la tarea en el componente:", error);
    }
  };



  const startTask = async (id: string) => { 
    const date = Date.now()
    const resultado = await updateState(id, "inProgress", {startDate: date,
      endDate: date
    });
    if(resultado) setTodoList((list)=> list.map((task) => task.id === id ? {...task, state: "inProgress", startDate: date}: task ));
  };

  const endTask = async (id: string) => {
    const date = Date.now();
    const resultado = await updateState(id, "done", {endDate: date});
    if(resultado) setTodoList((list)=> list.map((task)=> task.id === id ? {...task, state: "done", endDate: date}: task));
  };

  const deleteTask = async (id: string) => {
    const resultado = await deleteTasks(id);
    if (resultado) {
      setTodoList((prevList) => prevList.filter((task) => task.id !== id));
    } else {
      console.error("No se pudo eliminar en el servidor");
    }
  };

  const fectchData = async () => {
    const task = await getTasks();
    setTodoList(task.data)
  };

  const goToAdmin = () => {
    router.push("/admin")
  }

  useEffect(() => {
    fectchData()
  }, [title])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-12 px-4">

      <div className="w-full max-w-5xl bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-6 text-center tracking-tight">
          Todo List
        </h1>

        <div className="flex gap-2 mb-8 max-w-md mx-auto">
          <input
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            placeholder="Añadir una nueva tarea..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <button
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors duration-200 active:scale-95 transform"
            onClick={addTask}
          >
            Agregar
          </button>
          <button
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors duration-200 active:scale-95 transform"
            onClick={goToAdmin}
          >
            Admin
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {todoList.map((task) => {
            return (
              <div key={task.id} className="transition-all hover:translate-y-[-4px] duration-200">
                <Card
                  description={task.title}
                  state={task.state}
                  startDate={task.startDate}
                  endDate={task.endDate}
                  id={task.id}
                  handleStart={startTask}
                  handleEnd={endTask}
                  handleDelete={deleteTask}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
export default Home;
