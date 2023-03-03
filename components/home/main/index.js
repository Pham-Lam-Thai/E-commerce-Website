import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import {useSession} from "next-auth/react";
import Menu from "./Menu";
import Link from "next/link";
import Header from "./Header";
import Offers from "./offers";
import User from "./User";
export default function Main() {
  const { data: session } = useSession();
  return (
    <div className={styles.main}>
     <Header />
     <Menu />
     <MainSwiper /> 
     <Offers />
     <User/>
    </div>
  );
}

