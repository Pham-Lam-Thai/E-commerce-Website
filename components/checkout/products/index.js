import styles from "./styles.module.scss";
//import {FaStaylinked} from "react-icons/fa";
export default function Products({ cart }) {
  return (
    <div className={styles.products}>
        <div className={styles.products_header}>
            <h1>Cart</h1>
            <span>
                {cart.products.length == 1
                    ? "1 item"
                    : `${cart.products.length} items`
                }
            </span>
        </div>
        <div className={styles.products_wrap}>
            {cart.products.map((product) => (
                <div className={styles.product}>
                    <div className={styles.product_img}>
                        <img src={product.image} alt=""/>
                        <div className={styles.product_infos}>
                            <img src={product.color.image} alt=""/>
                            <span>{product.size}</span>
                            <span>x{product.qty}</span>
                        </div>
                    </div>
                    <div className={styles.product_name}>
                        {product.name.length > 18
                            ? `${product.name.substring(0,18)}...`
                            : product.name
                        }
                    </div>
                    <div className={styles.product_price}>
                        {(product.price * product.qty).toFixed(2)}$
                    </div>
                </div>
            ))}       
        </div>
        <div className={styles.product_total}>
                SubTotal : <b>{cart.cartTotal}$</b>
        </div>
    </div>
  )
}
