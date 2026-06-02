
export const getTasks = async () => {
    try {
        const response = await fetch("/api/todolist");

        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error papi")
    }
};

export const deleteTasks = async (id: string) => {
    try {
        const response = await fetch(`/api/todolist/${id}`, {
            method: "DELETE"
        });
        const dato = await response.json();

        return dato
    } catch (error) {
        console.error("Error papi")
    }
};

export const addTasks = async (title: string) => {
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

        return data
    } catch (error) {
        console.log("Error papi")
    }

};

export const updatetasks = async (id: string, title: string) => {
    try {
        const res = await fetch(`/api/todolist/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });

        const data = await res.json();

        if (!res) return console.log("Error al actualizar")

        return data

    } catch (error) {
        console.log("Error papi")
    };
};

export const updateState = async (id: string, newState: "pending" | "inProgress" | "done", date: {startDate?: number; endDate?: number}= {}) => {
    try {
        const res = await fetch(`/api/todolist/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state: newState, ...date })
        });

        const data = await res.json();

        if (!res.ok) return console.log("Error al actualizar")

        return data

    } catch (error) {
        console.log("Error papi")
    };
}