import Link from "next/link";
import styles from "./styles.module.scss";


export default function NewsLetter() {
  return (
    <div className={styles.footer_newsLetter}>
        <h3>SIGN UP FOR OUR NEWSLETTER</h3>
        <div className={styles.footer_flex}>
            <input type="text" placeholder="Enter Your Email" />
            <button className={styles.btn_primary}>SUBSCRIBE</button>
        </div>
        <p>
          By clicking the SUBSCRIBE button, if you are agreeing to {" "}
          <Link href="">Our privacy & Cookie Policy</Link>
        </p>
    </div>
  );
}
