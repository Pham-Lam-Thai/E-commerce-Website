
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../components/home/main';
import axios from 'axios';
//import cartSlice from '@/store/cartSlice';
import { useSession, signIn, signOut } from "next-auth/react";
import FlashDeals from '../components/home/flashDeals';

const inter = Inter({ subsets: ['latin'] })

export default function Home({country}) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <Header country={country}/>
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          <FlashDeals/>
        </div>
      </div>
      <Footer country={country}/>
    </div>  
  );
}

export async function getServerSideProps(){
  let data = await axios.get('https://api.ipregistry.co/?key=5pkrc8g2c4pib5mi')
  .then((res)=>{
    return res.data.location.country;
  }).catch((err)=>{
    console.log(err);
  });
  return{
    props:{
      //country:{name: data.name, flag: data.flag.emojitwo },
      country:{name: "Viet Nam", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png" },
    }
  }
}
