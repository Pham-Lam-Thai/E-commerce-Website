import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";

export default function Category({header, products, background}) {
    const isMedium = useMediaQuery({query: "(max-width:1300px)"});
    const ismobile = useMediaQuery({query: "(max-width:550px)"});

  return (
    <div className={styles.category} style={{background: `${background}`}}>
        <div className={styles.category_header}>
            <h1>{header}</h1>
            <BsArrowRightCircle />
        </div>
        <div className={styles.category_products}>
            {products.slice(0, ismobile ? 6 : isMedium ? 4 : 6).map((product)=>(
                <div className={styles.product}>
                    <img src={product.image} alt="" />
                </div>
            ))}
        </div>
    </div>
  );
}
