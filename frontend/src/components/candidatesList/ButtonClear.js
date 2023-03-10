import classes from "./ButtonClear.module.css";

function ButtonClear(order, handleButtonClear) { 
  return (
    <button
    order={order}
    className={
      order === "desc" || order === "asc"
      ? classes["btn-clear"]
      : classes["btn-clear-disabled"]
    }
    onClick={(e) => {
      handleButtonClear();
      console.log(order);
      }}
    >
      Clear All
    </button>
  );
}

export default ButtonClear;
