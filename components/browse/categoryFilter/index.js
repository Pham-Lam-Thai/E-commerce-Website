import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import Card from "./Card";
import styles from "../styles.module.scss";

export default function CategoryFilter({ subCategories, categories, categoryHandler,replaceQuery}) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
        <h3>
        Category <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
        </h3>
        {show &&
        categories.map((category, i) => (
            <Card
            key={i}
            category={category}
            subCategories={subCategories}
            categoryHandler={categoryHandler}
            replaceQuery={replaceQuery}
            />
        ))}
  </div>
  )
}
