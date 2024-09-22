import React, { useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[],
  addTodo: (text: string) => void,
  removeTodo: (id: string) => void
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {}
});

const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  // const todos = [
  //   new Todo('Learn React'),
  //   new Todo('Learn Typescript'),
  // ];

  const addToDoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setTodos((prevState) => [...prevState, newTodo]);
  };

  const removeToDoHandler = (id: string) => {
    setTodos((prevState) => {
      const filteredList = prevState.filter((todo) => todo.id !== id);
      return filteredList;
    })
  }

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addToDoHandler,
    removeTodo: removeToDoHandler
  }

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  )
}

export default TodosContextProvider;