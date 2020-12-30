import React from "react";

function StarSpan({ id, checked }) {
  const checkd = id <= checked ? "checked" : "";
  return <span className={`fa fa-star ${checkd}`}></span>;
}

export default StarSpan;
