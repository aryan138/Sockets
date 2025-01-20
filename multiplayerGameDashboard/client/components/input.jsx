import React from "react";
function Input({ name,placeholder, handleInput }) {
  return (
    <>
      <input
        name={name}
        onChange={handleInput}
        className="input-field"
        placeholder={placeholder}
      />
    </>
  );
}

export default Input;
