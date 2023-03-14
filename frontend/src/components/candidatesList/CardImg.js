import classes from "./CardImg.module.css";

function CardImg(props) {

  return (
    <>
      {props.candidate.isLookingForJob ? (
        <div className={classes["featured-openToWork"]}>Open to work</div>
      ) : (
        <div className={classes["featured-working"]}>Working</div>
      )}
      <div className={classes["img-container"]}>
        <div className={classes["img-wrapper"]}>
          <img src={props.candidate.photo} alt={props.candidate.photo} />
        </div>
      </div>
    </>
  );
}
export default CardImg;
