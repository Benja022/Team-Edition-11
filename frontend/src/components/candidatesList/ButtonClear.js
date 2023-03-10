import classes from "./ButtonClear.module.css";

function ButtonClear(
  order, handlerClear) {

    
    return (
      <button
      type="button"
      value={order}
      order={order}
      className={
        classes["btn-clear"]
        
        // order === "desc" || order === "asc"
        // ? classes["btn-clear"]
        // : classes["btn-clear-disabled"]
      }
      onClick={()=>{handlerClear()}}
      
    >
      Clear All
    </button>
  );
}

export default ButtonClear;
