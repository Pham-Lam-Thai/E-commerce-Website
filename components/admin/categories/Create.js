import { Form, Formik } from "formik";
import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";

export default function Create({ setCoupons }) {
    const [ name, setName ] = useState("");
    const [ discount, setDiscount ] = useState(0);

    const validate = Yup.object({
        name: Yup.string()
          .required("Coupon name is required.")
          .min(2, "Coupon name must be bewteen 2 and 30 characters.")
          .max(30, "Coupon name must be bewteen 2 and 30 characters."),
        /*.matches(
            /^[a-zA-Z\s]*$/,
            "Numbers and special charcters are not allowed."
          ) */
          discount: Yup.number()
          .required("Discount is required.")
          .min(1, "Discount must be at least 1%...")
          .max(99, "Discount must be 99% or less"),
      });
    const submitHandler = async () =>{
        try {
            const { data } = await axios.post("/api/admin/coupon", { name });
            setCoupons(data.coupons);
            setName("");
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    console.log(submitHandler);
  return (
    <>
        <Formik
            enableReinitialize
            initialValues={ {name,discount} }
            validationSchema={validate}
            onSubmit={() =>{
                submitHandler();
            }}
        >
            {(formik) => (
                <Form>
                    <div className={styles.header}>Create a Coupon </div>
                    <AdminInput
                        type="text"
                        label="Name"
                        name="name"
                        placeholder="Coupon Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <AdminInput
                        type="number"
                        label="Discount"
                        name="discount"
                        placeholder="Discount"
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    <div className={styles.btnWrap}>
                        <button type="submit" className={`${styles.btn}`}>
                            <span>Add Coupon</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </>
  );
}
