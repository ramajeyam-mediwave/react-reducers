import React, { useState } from "react";
import EditForm from "./editForm";

const TodoList = ({
  todos,
  handleDelete,
  handleEdit,
  handleDone,
  handleUpdate,
  handleReorder, // Accept the handleReorder function as a prop
}) => {
  const [draggedTodo, setDraggedTodo] = useState(null);

  const handleDragStart = (e, todo) => {
    setDraggedTodo(todo);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetTodo) => {
    e.preventDefault();
    if (draggedTodo) {
      const updatedTodos = [...todos];

      const draggedIndex = updatedTodos.findIndex(
        (t) => t.id === draggedTodo.id
      );
      const targetIndex = updatedTodos.findIndex((t) => t.id === targetTodo.id);

      if (draggedIndex !== -1 && targetIndex !== -1) {
        updatedTodos.splice(draggedIndex, 1);
        updatedTodos.splice(targetIndex, 0, draggedTodo);
      }

      // Update the state with the new order of todos using the handleReorder function
      handleReorder(updatedTodos);
      setDraggedTodo(null);
    }
  };
  function handleCheck(e, id) {
    // console.log(e.target.checked);
    // console.log(id);
    let type = "done";
    if (!e.target.checked) {
      type = "undone";
    }
    handleDone(id, type);
  }

  return (
    <div>
      <h1>My todos</h1>
      <div>
        {todos.map((t) => (
          <div
            key={t.id}
            className={t.isDone ? "strikethrough" : ""}
            draggable
            onDragStart={(e) => handleDragStart(e, t)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, t)}
          >
            {t.isEdit ? (
              <EditForm
                text={t.text}
                onSave={(newText) => handleUpdate(t.id, newText)}
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={t.isDone}
                  onChange={(e) => handleCheck(e, t.id)}
                />
                {t.text}
                <button onClick={() => handleDelete(t.id)}>Delete</button>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
