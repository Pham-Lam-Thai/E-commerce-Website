import { useRouter } from "next/router";
import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

export default function BrandsFilter({ brands, brandHandler}) {
  const [show, setShow] = useState(true);
  const router = useRouter();

  return (
    <div className={styles.filter}>
        <h3>
            Brands <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
        </h3>
        {show && (
            <div className={styles.filter_sizes}>
                {brands.map((brand, i) => (
                    <button 
                        className={styles.filter_brand} 
                        onClick={() =>brandHandler(brand)}
                    >
                        <img src={`../../../images/brands/${brand}.png`} alt=""/>
                    </button>
                ))}
            </div>
        )}
  </div>
  )
}
