import { useReducer } from "react";

import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoAddForm";
import UpdateForm from "./components/UpdateForm";
/*
{
  id: 123,
  text: 'Foo',
  isDone: false
}
*/
function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  function todoReducer(todos, action) {
    switch (action.type) {
      case "TODO_ADD": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.value,
            isDone: false,
          },
        ];
      }
      case "TODO_DELETE": {
        const filtered = todos.filter((t) => t.id != action.value);
        return [...filtered];
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
    function handleEdit(id) {
      dispatch({
        type: "TODO_DELETE",
        value: id,
      });
    }
  }
  function handleEdit(id) {
    dispatch({
      type: "TODO_Edit",
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

  return (
    <>
      <h1>My todo</h1>

      <TodoAddForm handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleDone={handleDone}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default App;
