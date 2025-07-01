// router refernece shemas and act on them 
import { Input, Mutation, Query, Router } from "nestjs-trpc";
import { TodosService } from "./todos.service";
import { z } from "zod";
import { CreateTodo, createTodoSchema, todoSchema } from "./todo.shema";

// the decorator automatically adds the router to the trpc schema and client and server are made aware of it, trpc req of this router go to the correct class
@Router({alias:'todo'})
export class TodoRouter{
    constructor(private readonly todoService: TodosService){}

    //fetch single todo
    @Query({
        input: z.object({id: z.string()}),
        output: todoSchema
    })
    getToDoById(@Input('id') id:string){
        return this.todoService.getToDoById(id);
    }

    @Query({
        output: z.array(todoSchema)
    })
    getAllTodos(){
        return this.todoService.getAllTodos();        
    }

    @Mutation({
        input: createTodoSchema,
        output: todoSchema
    })
    createTodo(@Input() todoData: CreateTodo){
        return this.todoService.createTodo(todoData);
    }

    @Mutation({
        input: z.object({
            id: z.string(),
            data: createTodoSchema.partial()
        }),
        output: todoSchema,
    })
    updateTodo(
        @Input('id') id:string,
        @Input('data') data: Partial<CreateTodo>
    ){
        return this.todoService.updateTodo(id, data);
    }

    @Mutation({
        input: z.object({id: z.string()})
    })
    deleteTodo(@Input('id') id: string){
        return this.todoService.deleteTodo(id)
    }




}