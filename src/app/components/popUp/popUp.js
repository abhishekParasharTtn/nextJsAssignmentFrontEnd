import styles from "./popUp.module.sass";

function PopUp({ onCancelClick, onYesClick }) {
  return (
    <div className={styles.popUpOuter}>
      <div className={styles.popUpContainer}>
        <p>Are you sure to delete?</p>
        <div className={styles.popUpBtnContainer}>
          <div
            className={`${styles.popUpBtn} ${styles.cancelButton}`}
            onClick={() => onCancelClick()}
          >
            Cancel
          </div>
          <div
            className={`${styles.popUpBtn} ${styles.yesButton}`}
            onClick={() => onYesClick()}
          >
            Yes
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
