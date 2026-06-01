import { Schema, model, Model } from "mongoose";
import { todoListProps } from "@/interface_type/todolisto";

const todoListSchema = new Schema<todoListProps>({

    id:{
        type: String,
    },
    title:{
        type: String,
        required: [true, "The tittle is required"]
    },
    state:{
        type: String,
        required: [true, "The state is required"]
    },
    startDate:{
        type: Date,
        
    },
    endDate:{
        type: Date,
       
    }
});

let Todolist: Model<any>;

try {
    Todolist = model("colection")
} catch (error) {
    
    Todolist = model("colection", todoListSchema)
}

export default Todolist

// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const objectId = Schema.ObjectId;

// const TodoListSchema = new Schema({
    
//     tittle: String,
//     state: String,
//     dateStart: Date,
//     dateEnd: Date


// });


// export default TodoListSchema


