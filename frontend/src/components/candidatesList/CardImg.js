import classes from "./CardImg.module.css";

function CardImg(props) {
  return (
    <>
      <div className={classes.featured}>Featured</div>
      <div className={classes["img-container"]}>
        <div className={classes["img-wrapper"]}>
          <img
            src={props.candidate.photo}
            alt={props.candidate.photo}
          />
        </div>
      </div>
    </>
  );
}

export default CardImg;
