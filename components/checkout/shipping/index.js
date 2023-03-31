import { Form, Formik } from "formik";
import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import "yup-phone";
import ShippingInput from "@/components/inputs/shippingInput";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { countries } from "../../../data/countries";
import SingularSelect from "@/components/selects/SingularSelect";
import { changeActiveAddress, deleteAddress, saveAddress } from "@/requests/user";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { GiPhone } from "react-icons/gi";
import {IoMdArrowDropupCircle} from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { CgRemove } from "react-icons/cg";
const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipCode: "",
  address1: "",
  address2: "",
  country: "",

}
export default function Shipping({ selectedAddress, setSelectedAddress, user, addresses,setAddresses, profile }) {
  console.log('address--->',addresses)
  const [shipping, setShipping] = useState(initialValues);
  const [visible, setVisible] = useState(user?.address.length ? false : true);

  const { firstName,
    lastName,
    phoneNumber,
    state,
    city,
    zipCode,
    address1,
    address2,
    country } = shipping;
  const validate = Yup.object({
    firstName: Yup.string()
      .required("FirstName must be is required.")
      .min(3, "firstName must be at least 3 character!")
      .max(32, "FirstName must be at least 32 character!"),
    lastName: Yup.string()
      .required("LastName must be is required.")
      .min(3, "LastName must be at least 3 characters.!")
      .max(32, "LastName must be at least 32 characters.!"),
    phoneNumber: Yup.string()
      .required("phoneNumber must be is required.")
      .phone()
      .min(3, "phoneNumber must be at least 3 characters.!")
      .max(30, "phoneNumber must be at least 30 characters.!"),
    state: Yup.string()
      .required("state must be is required.")
      .min(2, "state must be at least 2 characters.!")
      .max(60, "state must be at least 60 characters.!"),
    city: Yup.string()
      .required("city must be is required.")
      .min(2, "city must be at least 2 characters.!")
      .max(60, "city must be at least 60 characters.!"),
    zipCode: Yup.string()
      .required("zipCode must be is required.")
      .min(3, "zipCode/postal must be at least 3 characters.!")
      .max(20, "zipCode/postal must be at least 20 characters.!"),
    address1: Yup.string()
      .required("address must be is required.")
      .min(5, "address line 1 should contain 5-100 characters !")
      .max(100, "address line 1 should contain 5-100 characters!"),
    address2: Yup.string()
      .required("LastName must be is required.")
      .min(5, "address line 2 should contain 5-100 characters.!")
      .max(100, "address line 2 should contain 5-100 characters.!"),

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const saveShippingHandler = async () => {
    const res = await saveAddress(shipping);
    console.log('res', res)
    setAddresses(res.addresses);
  };
  const changeActiveHandler = async (id) => {
    const res = await changeActiveAddress(id);
    setAddresses(res.addresses);
  };
  const deleteHandler = async (id) => {
    console.log('id', id);
    const res = await deleteAddress(id);
    setAddresses(res.addresses);
  };
  return (
    <div className={styles.shipping}>
      {!profile && (
        <div className={styles.header}>
        <h3>Shipping Information</h3>
      </div>
      )}
      <div className={styles.addresses}>
        {addresses.map((address) =>(
         <div style={{ position: "relative" }}>
          <div
           className={styles.address_delete}
           onClick={() => {deleteHandler(address._id)}}
          >
           <CgRemove/>
         </div>
          <div
            className={`${styles.address} ${address.active && styles.active}`}
            key={address._id}
            onClick={() => changeActiveHandler(address._id)}
          >
            <div className={styles.address_side}>
              <img src={profile ? user.user.image : user.image} alt=""/>
            </div>
            <div className={styles.address_col}>
              <span>
                <FaIdCard/>
                {address.firstName.toUpperCase()}{" "}
                {address.lastName.toUpperCase()}
              </span>
              <span>
                <GiPhone/>
                {address.phoneNumber}
              </span>
            </div>
            <div className={styles.address_col}>
              <span>
                <FaMapMarkerAlt/>
                {address.address1}
              </span>
              <span>{address.address2}</span>
              <span>
                {address.city},{address.state},{address.country}
              </span>
              <span>{address.zipCode}</span>
            </div>
            <span 
              className={styles.active_text}
              style={{
                display: `${!address.active && "none"}`,}}
            >
              Active
            </span>
          </div>
         </div>
        ))}
      </div>
      <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
        {visible ? (
          <span>
            <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
          </span>
        ) : (
          <span>
            ADD NEW ADDRESS <AiOutlinePlus />
          </span>
        )}
      </button>
      {visible && <Formik
        enableReinitialize
        initialValues={{
          firstName,
          lastName,
          phoneNumber,
          state,
          city,
          zipCode,
          address1,
          address2,
          country,
        }}
        validationSchema={validate}
        onSubmit={() => {
          saveShippingHandler();
        }}
      >
        {(formik) => (
          <Form>
            <SingularSelect
              name="country"
              value={country}
              placeholder="*Country"
              handleChange={handleChange}
              data={countries}
            />
            <div className={styles.col}>
              <ShippingInput
                name="firstName"
                placeholder="*First Name"
                onChange={handleChange}
              />
              <ShippingInput
                name="lastName"
                placeholder="*Last Name"
                onChange={handleChange}
              />
              <ShippingInput
                name="state"
                placeholder="*City / Province"
                onChange={handleChange}
              />
              <ShippingInput
                name="city"
                placeholder=" *City "
                onChange={handleChange}
              />
            </div>
            <ShippingInput
                name="phoneNumber"
                placeholder=" *phoneNumber "
                onChange={handleChange}
            />
            <ShippingInput
                name="zipCode"
                placeholder="*Post/Zip code "
                onChange={handleChange}
            />
            <ShippingInput
                name="address1"
                placeholder=" *Address1 "
                onChange={handleChange}
            />
            <ShippingInput
                name="address2"
                placeholder=" *Address2 "
                onChange={handleChange}
             />
            <Button type="submit"> Save Address </Button>
          </Form>
        )}
      </Formik>

      }
    </div>
  )
}
