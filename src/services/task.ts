export const getTasks = async () => {
    try {
        const response = await fetch("/api/todolist");

        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error papi")
    }   
};

export const deleteTasks = async (id: string) =>{
    try {
        const response = await fetch(`/api/todolist/${id}`,{
            method: "DELETE",
        });
        const dato = await response.json();

        return dato
    } catch (error) {
        console.error("Error papi")
    }
};