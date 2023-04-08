import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({ coupons, setCoupons }) {
  console.log(coupons)
  return (
    <ul className={styles.list}>
      {coupons.map((coupon) => (
        <ListItem coupon={coupon} key={coupon._id} setCoupons={setCoupons} />
      ))}
    </ul>
  );
}
