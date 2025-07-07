"use client";
import { trpc } from "../Trpc/client";

export default function Home(){
  const {data} = trpc.todo.getAllTodos.useQuery(); // getting data from the server
  console.log("Data: ", data)
  return(
    <div>
      {data?.map(todo => (
        <div key={todo.id}>{todo.name }</div>
      ))}
    </div>
  );
}