import { useState } from "react";
import styles from "./styles.module.scss";
import TableSelect from "./TableSelect";
export default function TableHeader({reviews, allSizes,colors}) {
    const [rating, setRating] = useState();
    const [size, setSize ] = useState();
    const [style, setStyle ] = useState();
    const [order, setOrder ] = useState();


  return (
    <div className={styles.table_header}>
        <TableSelect 
            property={rating} 
            text="Rating"
            data={ratings.filter((x) => x.value !== rating)}
            handleChange={setRating}
        />
        <TableSelect 
             property={size} 
             text="Size" 
             data={allSizes.filter((x) => x.size !== size)}
             handleChange={setSize}
        />
        <TableSelect 
            property={style} 
            text="Style" 
            data={colors.filter((x) => x !== style)}
            handleChange={setStyle}
        />
        <TableSelect 
            property={order} 
            text="Order" 
            data={orderOptions.filter((x) => x !== order)}
            handleChange={setOrder}
        />
    </div>
  );
}
const ratings = [
    {
        text: "All",
        value: "",
    },
    {
        text:"5 start",
        value: 5,
    },
    {
        text: " 4 start",
        value: 4,
    },
    {
        text:"3 start",
        value: 3,
    },
    {
        text:"2 start",
        value: 2,
    },
    {
        text:"1 start",
        value: 1,
    },
];
const orderOptions= [
    {
        text : "recommended",
        value: "recommended",
    },
    {
        text : "Most recent to oldest",
        value: "Most recent to oldest",
    },
    {
        text : "Oldest to most recent",
        value: "Oldest to most recent",
    },
];

