import { useState } from "react";

const UpdateForm = ({ handleEdit }) => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleEdit(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          required
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
      </label>
      <button>Add</button>
    </form>
  );
};

export default UpdateForm;
