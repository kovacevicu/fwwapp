import React from "react";

function RateButton({ id, value, onMouseEnter, checked, rated }) {
  let checkd = "";
  if (!rated) {
    checkd = id <= checked ? "checked" : "";
  } else {
    checkd = id <= rated ? "checked" : "";
    onMouseEnter = null;
  }

  return (
    <button
      id={id}
      value={value}
      type="submit"
      className={`fa fa-star ${checkd}`}
      onMouseEnter={onMouseEnter}
    ></button>
  );
}

export default RateButton;
