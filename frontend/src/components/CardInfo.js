import classes from "./CardInfo.module.css";

function CardInfo(props) {


  return (
    <>
    <div className={classes["info-container"]}>
        <h3 className={classes["info-name"]} >
          {props.candidate.firstName} {props.candidate.lastName}
        </h3>
        <p className={classes["info-role"]}>{props.candidate.bootcamp}</p>
          <div className={classes["view-profile"]}>View Profile</div>
    </div>
    </>
  );
}

export default CardInfo;
