import classes from "./Switcher.module.css";
import React from "react";

export const Switcher = () => {
  return (
    <div className={classes.switcher}>
      <div className={classes["showing-result"]}></div>
      <div className={classes["sort-by"]}>
        <select className={classes["form-select"]}>
          <option value="">Sort by (default)</option>
          <option /*onClick={() => orderDesc()}*/ on value="asc">
            Newest
          </option>
          <option value="des">Oldest</option>
        </select>
      </div>
    </div>
  );
};
