import React from "react";

function TextArea({ name, label, value, error, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        value={value}
        name={name}
        id={name}
        className="form-control"
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextArea;
