import React, { useState } from "react";
import EditForm from "./editForm";

const TodoList = ({
  todos,
  handleDelete,
  handleEdit,
  handleDone,
  handleUpdate,
  handleReorder,
}) => {
  const [draggedTodo, setDraggedTodo] = useState(null);

  const handleDragStart = (todo) => {
    setDraggedTodo(todo);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetTodo) => {
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

      handleReorder(updatedTodos);
      console.log(updatedTodos);
      setDraggedTodo(null);
    }
  };
  function handleCheck(e, id) {
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
            onDragStart={(e) => handleDragStart(t)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(t)}
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
