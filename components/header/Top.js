import styles from "./styles.module.scss";
import {MdSecurity} from "react-icons/md";
import {BsSuitHeart} from "react-icons/bs";
import {FcServices} from "react-icons/fc";
import {RiAccountPinCircleLine, RiArrowDropDownFill} from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import UserMenu from "./UserMenu";
import {useSession} from "next-auth/react";
export default function Top({country}) {
    // Display Image's account on the top menu
    const { data: session } = useSession();
    const [visible, setvisible] = useState(false);
      return <div className={styles.top}>
        <div className={styles.top_container}>
            <div></div>
                <ul className={styles.top_list}>
                    <li className={styles.li}>
                        <img src={country?.flag} alt=""  />
                         <span>{country?.name} / VND</span>
                    </li>
                    <li className={styles.li}>
                        <MdSecurity/>
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.li}>
                        <FcServices/>
                        <span> Customer Services</span>
                    </li>
                    <li className={styles.li}>
                        <span>Help</span>
                    </li>
                    <li className={styles.li}>
                        <BsSuitHeart/>
                        <Link href="/profile/whishlist">
                            <span>WishList</span>
                        </Link>
                    </li>
                    <li className={styles.li}
                     onMouseOver={() => setvisible(true)}
                     onMouseLeave={() => setvisible(false)}
                    >
                        {session ? (
                            <li>
                                <div className={styles.flex}>
                                    <img src={session.user.image} 
                                    alt=""/>
                                    <span>{session.user.name} </span>
                                    <RiArrowDropDownFill/>
                                </div>
                            </li>
                        ):(
                            <li className={styles.li}>
                            <div className={styles.flex}>
                                <RiAccountPinCircleLine/>
                                <span>Account</span>
                                <RiArrowDropDownFill/>
                            </div>
                        </li>
                        )}
                       {
                        visible && <UserMenu session={session} />
                       }
                    </li>
                </ul>
        </div>
    </div>;
  
}
