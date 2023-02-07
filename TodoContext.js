import { createContext, useState } from "react";
import uuid from "react-native-uuid";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [allTodos, setAllTodos] = useState([]);

  const saveTodo = (id, todoTitle, todoItems) => {
    const existingTodo = allTodos.find((t) => t.id === id);
    if (existingTodo) {
      const editedTodo = { ...existingTodo };
      editedTodo.title = todoTitle;
      editedTodo.todoItems = [...todoItems];

      const restTodos = allTodos.filter((t) => t.id !== id);
      setAllTodos([...restTodos, editedTodo]);
      return;
    }

    setAllTodos((p) => [
      ...p,
      { id: uuid.v4(), title: todoTitle, todoItems: todoItems },
    ]);
  };

  const value = { allTodos, setAllTodos, saveTodo };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
