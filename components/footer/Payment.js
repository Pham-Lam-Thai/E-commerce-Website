import styles from "./styles.module.scss";


export default function Payment() {
  return (
    <div className={styles.footer_payment}>
        <h3>WE ACCEPT</h3>
        <div className={styles.footer_flexwrap}>
            <img src="../../../images/payment/visa.webp" alt=""/>
            <img src="../../../images/payment/mastercard.webp" alt=""/>
            <img src="../../../images/payment/paypal.webp" alt=""/>
        </div>
    </div>
  );
}
