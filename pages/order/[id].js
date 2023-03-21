import Order from "../../models/Order";
import Header from "../../components/header";
import styles from "../../styles/order.module.scss";
import { IoIosArrowForward } from "react-icons/io";

export default function order({orderData}) {
    return (
        <>
          <Header country="country" />
          <div className={styles.order}>
            <div className={styles.container}>
              <div className={styles.order_infos}>
                <div className={styles.order_header}>
                  <div className={styles.order_header_head}>
                    Home <IoIosArrowForward /> Orders <IoIosArrowForward /> ID{" "}
                    {orderData._id}
                  </div>
                  <div className={styles.order_header_status}>
                    Payment Status :{" "}
                    {orderData.isPaid ? (
                      <img src="../../../images/verified.png" alt="paid" />
                    ) : (
                      <img src="../../../images/unverified.png" alt="paid" />
                    )}
                  </div>
                  <div className={styles.order_header_status}>
                    Order Status :
                    <span
                      className={
                        orderData.status == "Not Processed"
                          ? styles.not_processed
                          : orderData.status == "Processing"
                          ? styles.processing
                          : orderData.status == "Dispatched"
                          ? styles.dispatched
                          : orderData.status == "Cancelled"
                          ? styles.cancelled
                          : orderData.status == "Completed"
                          ? styles.completed
                          : ""
                      }
                    >
                      {orderData.status}
                    </span>
                  </div>
                </div>
                <div className={styles.order_products}>
                  {orderData.products.map((product) => (
                    <div className={styles.product} key={product._id}>
                      <div className={styles.product_img}>
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className={styles.product_infos}>
                        <h1 className={styles.product_infos_name}>
                          {product.name.length > 30
                            ? `${product.name.substring(0, 30)}...`
                            : product.name}
                        </h1>
                        <div className={styles.product_infos_style}>
                          <img src={product.color.image} alt="" /> / {product.size}
                        </div>
                        <div className={styles.product_infos_priceQty}>
                          {product.price}$ x {product.qty}
                        </div>
                        <div className={styles.product_infos_total}>
                          {product.price * product.qty}$
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={styles.order_products_total}>
                    {orderData.couponApplied ? (
                      <>
                        <div className={styles.order_products_total_sub}>
                          <span>Subtotal</span>
                          <span>{orderData.totalBeforeDiscount}$</span>
                        </div>
                        <div className={styles.order_products_total_sub}>
                          <span>
                            Coupon Applied <em>({orderData.couponApplied})</em>{" "}
                          </span>
                          <span>
                            -
                            {(
                              orderData.totalBeforeDiscount - orderData.total
                            ).toFixed(2)}
                            $
                          </span>
                        </div>
                        <div className={styles.order_products_total_sub}>
                          <span>Tax price</span>
                          <span>+{orderData.taxPrice}$</span>
                        </div>
                        <div
                          className={`${styles.order_products_total_sub} ${styles.bordertop}`}
                        >
                          <span>TOTAL TO PAY</span>
                          <b>{orderData.total}$</b>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.order_products_total_sub}>
                          <span>Tax price</span>
                          <span>+{orderData.taxPrice}$</span>
                        </div>
                        <div
                          className={`${styles.order_products_total_sub} ${styles.bordertop}`}
                        >
                          <span>TOTAL TO PAY</span>
                          <b>{orderData.total}$</b>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.order_actions}>
                <div className={styles.order_address}>
                  <h1>Customer's Order</h1>
                  <div className={styles.order_address_user}>
                    <div className={styles.order_address_user_infos}>
                      <img src={orderData.user.image} alt="" />
                      <div>
                        <span>{orderData.user.name}</span>
                        <span>{orderData.user.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.order_address_shipping}>
                    <h2>Shipping Address</h2>
                    <span>
                      {orderData.shippingAddress.firstName}{" "}
                      {orderData.shippingAddress.lastName}
                    </span>
                    <span>{orderData.shippingAddress.address1}</span>
                    <span>{orderData.shippingAddress.address2}</span>
                    <span>
                      {orderData.shippingAddress.state},
                      {orderData.shippingAddress.city}
                    </span>
                    <span>{orderData.shippingAddress.zipCode}</span>
                    <span>{orderData.shippingAddress.country}</span>
                  </div>
                  <div className={styles.order__address_shipping}>
                    <h2>Billing Address</h2>
                    <span>
                      {orderData.shippingAddress.firstName}{" "}
                      {orderData.shippingAddress.lastName}
                    </span>
                    <span>{orderData.shippingAddress.address1}</span>
                    <span>{orderData.shippingAddress.address2}</span>
                    <span>
                      {orderData.shippingAddress.state},
                      {orderData.shippingAddress.city}
                    </span>
                    <span>{orderData.shippingAddress.zipCode}</span>
                    <span>{orderData.shippingAddress.country}</span>
                  </div>
                </div>
                {/* {!orderData.isPaid && (
                  <div className={styles.order__payment}>
                    {orderData.paymentMethod == "paypal" && (
                      <div>
                        {isPending ? (
                          <span>loading...</span>
                        ) : (
                          <PayPalButtons
                            createOrder={createOrderHanlder}
                            onApprove={onApproveHandler}
                            onError={onErroHandler}
                          ></PayPalButtons>
                        )}
                      </div>
                    )}
                    {orderData.paymentMethod == "credit_card" && (
                      <StripePayment
                        total={orderData.total}
                        order_id={orderData._id}
                        stripe_public_key={stripe_public_key}
                      />
                    )}
                    {orderData.paymentMethod == "cash" && (
                      <div className={styles.cash}>cash</div>
                    )}
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </>
      );
}

export async function getServerSideProps(context){
    const { query } = context;
    const id  = query.id;
    const order = await Order.findById(id).populate("user").lean();
    console.log(order);

    return{
        props:{
            orderData: JSON.parse(JSON.stringify(order)),
        },
    };
}
