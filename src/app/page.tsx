'use client'
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { todoListProps } from "@/interface_type/todolisto"
import { getTasks, deleteTasks } from "@/services/task";
import { useRouter } from "next/navigation";



function Home() {
  const [title, setTitle] = useState("");
  const [todoList, setTodoList] = useState<todoListProps[]>([]);
   const router = useRouter();

  // const addTask = () => {
  //   if (title.trim() == "") {
  //     return;
  //   }
  //   const task: todoListProps = {
  //     id: crypto.randomUUID(),
  //     title: title,
  //     state: "pending",
  //   };

  //   setTodoList([...todoList, task]);
  //   setTitle("");
  // };

  const addTask = async () => {
    try {
      const id = crypto.randomUUID();
      const state = "pending"

      const res = await fetch('/api/todolist', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, id, state })
      });
      const data = await res.json();

      if (!data) console.log("Errror al mandar los datos")

      setTodoList([...todoList, data.data]);
      setTitle("");

    } catch (error) {
      console.log("Error papi")
    }
  };



  const startTask = (id: string) => {
    const taskFound = todoList.find((task) => task.id == id);
    if (taskFound) {
      taskFound.state = "inProgress";
      taskFound.startDate = Date.now();
    }
    setTodoList([...todoList]);
  };

  const endTask = (id: string) => {
    const taskFound = todoList.find((task) => task.id == id);
    if (taskFound) {
      taskFound.state = "done";
      taskFound.endDate = Date.now();
    }
    setTodoList([...todoList]);
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

  const goToAdmin= () => {
    router.push("/admin")
  }

  useEffect(() => {
    fectchData()
  }, [title])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50">

        {/* Título */}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-6 text-center tracking-tight">
          Todo List
        </h1>

        {/* Formulario de entrada */}
        <div className="flex gap-2 mb-6">
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
        <div className="space-y-3">
          {todoList.map((task) => {
            return (
              <div key={task.id} className="transition-all hover:translate-x-1 duration-200">
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

