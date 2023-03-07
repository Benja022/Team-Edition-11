import classes from "./CardsContainer.module.css";
// import Spinner from "./UI/Spinners/DualRing";

function CardsContainer(props) {

  // if (props.loading) {
  //   return <Spinner />;
  // }



  return <div className={classes["card-container"]}>{props.children}</div>;
}

export default CardsContainer;
