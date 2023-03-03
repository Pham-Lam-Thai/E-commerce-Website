import { MdFlashOn } from "react-icons/md";
import Countdown from "../../countdown";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";
import {flashDealsArray} from "../../../data/home";
import FlashCard from "./Card";
export default function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
        <div className={styles.flashDeals_header}>
            <h1>FLASH SALES <MdFlashOn/> </h1>
            <Countdown/>
        </div>
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="flashDeals_swiper"
        >
            <div className={styles.flashDeals_list}>{flashDealsArray.map((product,i)=>(
                <SwiperSlide>
                    <FlashCard product={product} key={i}/>
                </SwiperSlide>
            ))}</div>
      </Swiper>
    </div>
  )
}
