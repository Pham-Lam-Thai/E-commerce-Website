import axios from "axios";
import { useSession, signIn } from "next-auth/react";
import { updateCart } from "../store/cartSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeader from "../components/cart/cartHeader";
import Checkout from "../components/cart/checkout";
import Empty from "../components/cart/empty";
import Header from "../components/cart/header";
import PaymentMethod from "../components/cart/paymentMethods";
import Product from "../components/cart/product";
import ProductSwiper from '../components/productsSwiper.js';
import { women_swiper } from "../data/home";
import { saveCart } from "../requests/user";
import styles from "../styles/cart.module.scss";
export default function cart() {
  const Router = useRouter();
  const {data: session} = useSession();
  const [selected,setSelected] = useState([]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => {
    console.log({...state});
    return {...state }
  })
  const [shippingFee, setShippingFee] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() =>{
    const update = async() =>{
      const {data} = await axios.post("/api/updateCart",{
        products: cart.cartItems,
      });
      dispatch(updateCart(data));
    };
    console.log(cart);
    if(cart.cartItems.length > 0){
      update();
    }
  },[]);

  useEffect(() => {
    console.log('selected', selected);
    setShippingFee(selected.reduce((a,c) => a + Number(c.shipping), 0).toFixed(2));
    setSubtotal(selected.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
    setTotal(selected.reduce((a,c) => a + c.price * c.qty +Number(shippingFee), 0).toFixed(2));
  }, [selected]);
  const saveCartToDbHandler = async () => {
    if (session) {
      const res = saveCart(selected);
      Router.push("/checkout");
    } else {
      signIn();
    }
  };
  console.log("selected--->",selected);

  return (
    <>
        <Header />
        <div className={styles.cart}>
          {cart.cartItems?.length > 0 ? (
                <div className={styles.cart_container}>
                  <CartHeader 
                    cartItems={cart.cartItems}
                    selected={selected}
                    setSelected={setSelected}  
                  />
                  <div className={styles.cart_products}>
                    {cart.cartItems.map((product) =>(
                      <Product 
                        product={product} 
                        key={product._uid} 
                        selected={selected} 
                        setSelected={setSelected}/>
                    ))}
                  </div>
                  <Checkout
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    total={total}
                    selected={selected}
                    saveCartToDbHandler={saveCartToDbHandler}
                  />
                  <PaymentMethod />
                </div> 
          ):(
            <Empty/>
          )} 

          <ProductSwiper products={women_swiper}/>
        </div>
    </>
  );
}
