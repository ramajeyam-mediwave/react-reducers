import { useReducer, useEffect } from "react";
import "./app.css";
import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoAddForm";

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [], (initial) => {
    const localData = localStorage.getItem("todos");
    return localData ? JSON.parse(localData) : initial;
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function todoReducer(todos, action) {
    switch (action.type) {
      case "TODO_ADD": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.value,
            isDone: false,
            isEdit: false,
          },
        ];
      }

      case "TODO_DELETE": {
        const filtered = todos.filter((t) => t.id != action.value);
        return [...filtered];
      }
      case "TODO_EDIT": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isEdit"] = true;
        }

        return newTodos;
      }

      case "TODO_DONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = true;
        }
        return newTodos;
      }
      case "TODO_UNDONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = false;
        }
        return newTodos;
      }
      case "TODO_UPDATE": {
        // const update= [...todos]
        // const newTodos = todos.map((todo) => {
        //   if (todo.id === action.value.id) {
        //     return { ...todo, text: action.value.newText, isEdit: false };
        //   }
        // });
        // console.log(newTodos);
        // return newTodos;
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value.id);
        if (idx !== -1) {
          newTodos[idx]["text"] = action.value.newText;
          newTodos[idx]["isEdit"] = false;
        }
        return newTodos;
      }
      case "TODO_REORDER": {
        return action.value; // Set the state to the new order of todos
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAdd(value) {
    dispatch({
      type: "TODO_ADD",
      value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TODO_DELETE",
      value: id,
    });
  }
  function handleEdit(id) {
    dispatch({
      type: "TODO_EDIT",
      value: id,
    });
  }
  function handleDone(id, type) {
    if (type == "done") {
      dispatch({
        type: "TODO_DONE",
        value: id,
      });
    } else {
      dispatch({
        type: "TODO_UNDONE",
        value: id,
      });
    }
  }

  function handleUpdate(id, newText) {
    // Update the todos state to reflect the changes
    dispatch({
      type: "TODO_UPDATE",
      value: { id, newText },
    });
  }
  function handleReorder(updatedTodos) {
    // Dispatch the TODO_REORDER action to update the state
    dispatch({
      type: "TODO_REORDER",
      value: updatedTodos,
    });
  }

  return (
    <>
      <h1>My todo</h1>

      <TodoAddForm handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleDone={handleDone}
        handleEdit={handleEdit}
        handleUpdate={handleUpdate}
        handleReorder={handleReorder}
      />
    </>
  );
}

export default App;
