import styles from "./loader.module.sass";

function Loader(props) {
  return (
    <div className={styles.loaderContainer}>
      <p>Loading ...</p>
    </div>
  );
}

export default Loader;
