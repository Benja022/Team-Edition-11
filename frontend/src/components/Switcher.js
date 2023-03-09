import classes from "./Switcher.module.css";
import React from "react";

function Switcher({ handlerSelect, setSelectedOrder, selectedOrder }) {
  return (
    <div className={classes.switcher}>
      <div className={classes["showing-result"]}></div>
      <div className={classes["sort-by"]}>
        <select
          onChange={(e) => handlerSelect(e)}
          className={classes["form-select"]}
        >
          <option selected value="default">Sort by (default)</option>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>
  );
}
export default Switcher;
