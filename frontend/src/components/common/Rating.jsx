import React from "react";
import StarSpan from "./StarSpan";
function Rating({ checked }) {
  return (
    <div>
      <StarSpan id={1} checked={checked} />
      <StarSpan id={2} checked={checked} />
      <StarSpan id={3} checked={checked} />
      <StarSpan id={4} checked={checked} />
      <StarSpan id={5} checked={checked} />
    </div>
  );
}

export default Rating;
