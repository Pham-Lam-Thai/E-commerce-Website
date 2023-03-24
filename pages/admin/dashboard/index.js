import Layout from "../../../components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import {toast} from "react-toastify";
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Dropdown from "@/components/admin/dashboard/dropdown";
import Notifications from "@/components/admin/dashboard/notifications";
import { TbUser } from "react-icons/tb";
import {SlHandbag, slHandbag} from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { GiTakeMyMoney } from "react-icons/gi";
export default function dashboard({ users, orders, products }) {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>VN Admin-Dashboard</title>
      </Head>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header_search}>
            <label htmlFor="">
              <input type="text" placeholder="Search here..."/>
            </label>
          </div>
          <div className={styles.header_right}>
            <Dropdown userImage={session?.user?.image}/>
            <Notifications/>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <TbUser/>
            </div>
            <div className={styles.card_infos}>
              <h4>+{users.length}</h4>
              <span>Users</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <SlHandbag/>
            </div>
            <div className={styles.card_infos}>
              <h4>+{orders.length}</h4>
              <span>Orders</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <SiProducthunt/>
            </div>
            <div className={styles.card_infos}>
              <h4>+{products.length}</h4>
              <span>Products</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <GiTakeMyMoney/>
            </div>
            <div className={styles.card_infos}>
              <h4>+{(orders.reduce((a, val) => a + val.total,0))}$</h4>
              <h5>
                +{
                  (orders
                    .filter((o) => !o.isPaid)
                    .reduce((a, val) =>a + val.total,0)
                  )
                }
                $ Unpaid yet.
              </h5>
              <span>Total Earnings</span>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ req }){
  const users = await User.find().lean();
  const orders = await Order.find()
    .populate({ path: "user", model: User})
    .lean();
  const products = await Product.find().lean();
  return{
    props:{
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
