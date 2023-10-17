import React, { useState } from "react";

const EditForm = ({ text, onSave }) => {
  const [editedText, setEditedText] = useState(text);

  const handleSave = () => {
    onSave(editedText);
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <input
          minLength="5"
          maxLength="10"
          required
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default EditForm;
