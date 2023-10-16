import { useState } from "react";

function UpdateForm() {
  return (
    <>
      <input type="text" name="" id="" value={t.text} />

      <button onClick={() => handleDelete(t.id)}>Update</button>
    </>
  );
}

export default UpdateForm;
