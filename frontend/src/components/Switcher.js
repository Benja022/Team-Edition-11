import classes from "./Switcher.module.css";
import React from "react";

function Switcher(setOrder, setCurrentPage) {
  return (
    <div className={classes.switcher}>
      <div className={classes["showing-result"]}></div>
      <div className={classes["sort-by"]}>
        <select
          onChange={(e) => {
            if (e.target.value === "desc") {
              setOrder("desc");
            } else if (e.target.value === "asc") {
              setOrder("asc");
            } else if (e.target.value === "default") {
              setOrder("default");
            } else {
            }
            setCurrentPage(1);
          }}
          className={classes["form-select"]}
        >
          <option value="default">Sort by (default)</option>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>
    </div>
  );
}
export default Switcher;