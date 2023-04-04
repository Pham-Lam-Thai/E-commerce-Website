import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from "../styles.module.scss";

export default function ColorsFilter({ colors, colorHandler, replaceQuery }) {
  const [show, setShow] = useState(true);
  return (
    <div className={styles.filter}>
      <h3>
        Colors <span>{show ? <FaMinus /> : <BsPlusLg />}</span>
      </h3>
      {show && (
        <div className={styles.filter_colors}>
          {colors.map((color, i) => {       
              <button 
                style={{ background: `${color}` }} 
                onClick={() => colorHandler(color)}
              ></button>
          })}
        </div>
      )}
    </div>
  );
}
