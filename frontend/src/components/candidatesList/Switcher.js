import classes from "./Switcher.module.css";
import React from "react";

function Switcher({ handlerSelect, setSelectedOrder, selectedOrder }) {
  return (
    <select
    value={selectedOrder}
    onChange={(e) => {
      handlerSelect(e);
        }}
    className={classes["form-select"]}
  >
    <option defaultValue="default">
      Sort by (default)
    </option>
    <option value="desc">Newest</option>
    <option value="asc">Oldest</option>
  </select>
);
}
export default Switcher;
