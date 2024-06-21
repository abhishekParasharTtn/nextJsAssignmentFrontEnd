import Link from "next/link";
import styles from "./button.module.sass";
function Button(props) {
  if (props.href) {
    return (
      <Link href={props.href} className={styles.button}>
        {props.children}
      </Link>
    );
  }
  return <button className={styles.button}>{props.children}</button>;
}

export default Button;
