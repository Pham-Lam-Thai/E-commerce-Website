import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./styles.module.scss";
import {IoSettingsOutline} from "react-icons/io5";
import { BsHeart } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineClipboardList } from "react-icons/hi";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards, Navigation } from "swiper";
import { userSwiperArray } from "../../../data/home";
export default function User() {
    const { data: session } = useSession();
  return (
    <div className={styles.user}>
        <img src="../../../images/userHeader.jpg" alt="" className={styles.user_header}/>
        <div className={styles.user_container}>
            {session ? (
                <div className={styles.user_infos}>
                    <img src={session.user?.image} alt=""/>
                    <h4>{session.user.name}</h4>
                </div> 
            ) : (
                <div className={styles.user_infos}>
                    <img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png" alt=""/>
                    <div className={styles.user_infos_btns}>
                        <button>Register</button>
                        <button>Login</button>
                    </div>
                </div> 
            )}
            <ul className={styles.user_links}>
                <li>
                    <Link legacyBehavior href="">
                        <a>
                            <IoSettingsOutline/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="">
                        <a>
                            <HiOutlineClipboardList/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="">
                        <a>
                            <AiOutlineMessage />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link legacyBehavior href="">
                        <a>
                            <BsHeart />
                        </a>
                    </Link>
                </li>             
            </ul>
            <div className={styles.user_swiper}>
            <Swiper
                effect={"cards"}
                grabCursor={true}
                navigation={true}
                modules={[EffectCards, Navigation]}
                className="user_swiper"
                style={{ maxWidth: "180px", height: "240px", marginTop: "1rem" }}
            >
                {userSwiperArray.map((item)=> (
                    <SwiperSlide>
                        <Link href="">
                            <img src={item.image} alt=""/>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>
        </div>
        <img src="../../../images/userHeader.jpg" alt="" className={styles.user_footer}/>

    </div>
  )
}
