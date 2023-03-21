import styles from "./styles.module.scss";
import Link from "next/link";
import {MdPlayArrow} from "react-icons/md";
export default function Header() {
  return (
    <div className={styles.header}>
        <div className={styles.header_container}>
            <div className={styles.header_left}>
                <Link legacyBehavior href="/">
                    <img src="../../../logo.png" alt=""/>
                </Link>
            </div>
            <div className={styles.header_right}>
                <Link legacyBehavior href="/browse">
                    <a>
                        Continue Shopping
                        <MdPlayArrow />
                    </a>
                </Link>
            </div>
        </div>
    </div>
  )
}
