import classes from "./CardImg.module.css";

function CardImg(props) {
  return (
    <>
      <div className={classes.featured}>Featured</div>
      <div className={classes["img-container"]}>
        <div className={classes["img-wrapper"]}>
          <img
            src={props.candidate.photo.path}
            alt={props.candidate.photo.text}
          />
        </div>
      </div>
    </>
  );
}

export default CardImg;
