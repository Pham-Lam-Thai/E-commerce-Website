import Layout from "@/components/admin/layout";
import db from "../../../utils/db";
import Category from "@/models/Category";
import { useState } from "react";
import Create from "@/components/admin/subCategories/Create";
import List from "@/components/admin/subCategories/List";
import SubCategory from "@/models/SubCategory";
export default function subCategories({ categories,subCategories }) {
    const [data, setData ] = useState(subCategories);
    console.log(data);
  return (
    <Layout>
        <div>
            <Create setSubCategories={setData} categories={categories}/>
            <List categories={categories} subCategories={data} setSubCategories={setData}/>
        </div>
    </Layout>
  );
}

export async function getServerSideProps(context){
    db.connectDb();
    const categories = await Category.find({}).sort({ updateAt: -1 }).lean();
    const subCategories = await SubCategory.find({}).sort({ updateAt: -1 })
    .populate({ path: "parent", model: Category })
    .sort({ updateAt: -1 })
    .lean();

    return{
        props:{
            categories: JSON.parse(JSON.stringify(categories)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
        },
    };
}