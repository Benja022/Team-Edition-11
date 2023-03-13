import classes from "./CardInfo.module.css";
import { Link } from "react-router-dom";

function CardInfo(props) {
  //console.log(props.candidate);

  return (
    <>
      <div className={classes["info-container"]}>
        <div className={classes["info-name-role"]}>
          <h3 className={classes["info-name"]}>{props.candidate.fullName}</h3>
          <p className={classes["info-role"]}>{props.candidate.bootcamp}</p>
        </div>
          <Link className={classes["view-profile"]} to={`/candidate/${props.candidate._id}`}>View Profile</Link>
      </div>
    </>
  );
}

export default CardInfo;
