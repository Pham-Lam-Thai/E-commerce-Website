import Layout from "@/components/admin/layout";
import db from "../../../utils/db";
import Category from "@/models/Category";
import { useState } from "react";
import Create from "@/components/admin/categories/Create";
import List from "@/components/admin/categories/List";
import Coupon from "../../../models/Coupon";
export default function coupons({ coupons }) {
    const [data, setData ] = useState(coupons);
    console.log(data );
  return (
    <Layout>
        <div>
            <Create setCoupons={setData}/>
            <List coupons={data} setCoupons={setData}/>
        </div>
    </Layout>
  );
}

export async function getServerSideProps(context){
    db.connectDb();
    const coupons = await Coupon.find({}).sort({ updateAt: -1 }).lean();
    return{
        props:{
            coupons: JSON.parse(JSON.stringify(coupons)),
        },
    };
}