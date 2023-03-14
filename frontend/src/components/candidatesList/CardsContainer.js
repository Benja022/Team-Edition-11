import classes from "./CardsContainer.module.css";

function CardsContainer(props) {

  return <div className={classes["card-container"]}>{props.children}</div>;
}

export default CardsContainer;
