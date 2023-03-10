import classes from "./CardWrapper.module.css";


function CardWrapper(props) {

  return <div className={classes["outer-card"]}>{props.children}</div>;
}

export default CardWrapper;
