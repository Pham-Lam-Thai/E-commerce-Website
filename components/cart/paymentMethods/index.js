import styles from "./styles.module.scss";

export default function PaymentMethod() {
  return (
    <div className={`${styles.card} ${styles.cart_method}`}>
        <h2 className={styles.header}>Payment Methods</h2>
        <div className={styles.images}>
            <img src="../../../images/payment/visa.webp" alt=""/>
            <img src="../../../images/payment/mastercard.webp" alt=""/>
            <img src="../../../images/payment/paypal.webp" alt=""/>
        </div>
        <h2 className={styles.header}>Buyer Protections</h2>
        <div>
            <img src="../../../images/protection" alt=""/>
            Get full refund id the items is not described or it's not delievered
        </div>
    </div>
  )
}
