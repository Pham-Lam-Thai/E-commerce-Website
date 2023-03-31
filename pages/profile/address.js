import Shipping from "@/components/checkout/shipping";
import User from "@/models/User";
import {getSession} from "next-auth/react";
import { useState } from "react";
import styles from "../../styles/profile.module.scss";
import Layout from "../../components/profile/layout";

export default function index({user, tab}) {
    const [addresses, setAddresses] = useState(user.address.address);
  return (
    <Layout session={user} tab={tab} >
        <div className={styles.header}>
            <h1>👻All Addresses👻</h1>
        </div>
        <Shipping 
            user={user} 
            addresses={addresses} 
            setAddresses={setAddresses}
            profile
        />
    </Layout>
  )
}
 export async function getServerSideProps(ctx){
    const {query, req} =ctx;
    const session = await getSession({req});
    const tab = query.tab || 0;
    const address = await User.findById(session.user.id).select("address").lean();
    return {
        props:{
           user: {
            user: session.user,
            address: JSON.parse(JSON.stringify(address)),
           },
           tab,
        },
    };
 }