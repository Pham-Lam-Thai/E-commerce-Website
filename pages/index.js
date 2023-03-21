
import Image from 'next/image'
import styles from '../styles/Home.module.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/home/main';
import axios from 'axios';
//import cartSlice from '@/store/cartSlice';
import { useSession, signIn, signOut } from "next-auth/react";
import FlashDeals from '../components/home/flashDeals';
import Category from '../components/home/category';
import { women_dresses,women_accessories,women_swiper,women_shoes, gamingSwiper, homeImprovSwiper } from '../data/home';
import { useMediaQuery } from 'react-responsive';
import db from "../utils/db";
import Product from "../models/Product";
import ProductSwiper from '../components/productsSwiper.js';
import ProductCard from '../components/productCard';

export default function Home({country, products}) {
  console.log("products", products);
  const { data: session } = useSession();
  const isMedium = useMediaQuery({query: "(max-width:1300px)"});
  const ismobile = useMediaQuery({query: "(max-width:550px)"});
  console.log(session);
  return (
    <div>
      <Header country={country}/>
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals/>
          <div className={styles.home_category}>
            <Category header="Dresses" products={women_dresses} background="#efd164"/>
            {! isMedium && (
              <Category header="Shoes" products={women_shoes} background="#6cc070"/>
            )}
            {ismobile && (
              <Category header="Shoes" products={women_dresses} background="#6cc070"/>
            )}
            <Category header="Watches" products={women_accessories} background="#f17987"/>
          </div>
          <ProductSwiper products={women_swiper}/>
          <div className={styles.products}>
              {products.map((product) => (
                  <ProductCard product={product} key={product._id}/>
                ))}
          </div>
        </div>
      </div>
      <Footer country={country}/>
    </div>  
  );
}

export async function getServerSideProps(){
  db.connectDb();
  let products = await Product.find().sort({createdAt: -1 }).lean();
  console.log(products);
  let data = await axios.get('https://api.ipregistry.co/?key=5pkrc8g2c4pib5mi')
  .then((res)=>{
    return res.data.location.country;
  }).catch((err)=>{
    console.log(err);
  });
  return{
    props:{
      products: JSON.parse(JSON.stringify(products)),
      //country:{name: data.name, flag: data.flag.emojitwo },
      country:{name: "Viet Nam", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png" },
    }
  }
}
