import classes from './DualRing.module.css';

function DualRing() {
    return (
        <div className={classes.container}>
            <div className={classes["lds-dual-ring"]}></div>
        </div>
    );
}
export default DualRing;