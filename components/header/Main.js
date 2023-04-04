import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import {GiShoppingCart} from "react-icons/gi";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Main({ searchHandler }) {
    const router = useRouter();
    const [query, setQuery ] = useState(router.query.search || "");
    const {cart} = useSelector((state) => ({ ...state}));
    const handleSearch = (e) =>{
        e.preventDefault();
            if(router.pathname !== "/browse"){
                if(query.length > 1){
                    router.push(`/browse?search=${query}`);
                }
            }else{
                searchHandler(query);
            }
    };
  return (
    <div className={styles.main}>
        <div className={styles.main_container}>
            <Link legacyBehavior href="/">
                <a className={styles.logo}>
                    <img src="../../../logo.png" alt=""/>
                </a> 
            </Link>               
            <form onSubmit={(e) => handleSearch(e)} className={styles.search}>
                <input 
                    type="text" 
                    placeholder="Search...."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className={styles.search_icon}>
                    <RiSearch2Line/>
                </button>
            </form>  
            <Link legacyBehavior href="/cart">
                <a className={styles.cart}>
                    <GiShoppingCart/>
                    <span>0</span>
                </a>
            </Link>
        </div>
    </div>
  );
}
