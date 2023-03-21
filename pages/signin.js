import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../styles/signin.module.scss";
import {BiLeftArrowAlt} from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "../components/inputs/loginInput";
import { useState } from "react";
import CircledIconBtn from "../components/buttons/circledIconBtn";
import { getProviders, signIn, getCsrfToken, getSession } from "next-auth/react";

const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
}
export default function signin({providers}) {
  console.log(providers);
  const [user, setUser] = useState(initialvalues);
  const {login_email, login_password,name,email,password,conf_password} = user;
  const handleChange = (e) =>{
    const {name, value } = e.target;
    setUser({...user,[name]: value});
  };
  
  const loginValidation=Yup.object({
    login_email: Yup.string().required("Email address is required.").email("Please Enter Your Email Adrress."),
    login_password: Yup.string().required("Please Enter You Password"),
  })
  const registerValidation=Yup.object({
    name:Yup.string().required("What's Your Full Name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email:Yup.string()
      .required("You'll need this when you log in and if you ever need to reset your password.")
      .email("Enter a valid email address"),
    password:Yup.string()
      .required("Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).")
      .min(6,"Please enter password at least 6 and 36 characters")
      .max(36,"Please enter your password at least 6 and 36 characters."),
    conf_password:Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  })
  return (
    <>
      <Header />
      <div className={styles.login}>
        <div className={styles.login_container}>
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt/>
            </div>
            <span>
              We'd be happy to join US ! <Link href="/">Let Go To Store</Link>
            </span>
          </div>
          <div className={styles.login_form}>
            <h1>Sign In</h1>
            <p>Get Access to one of the best services in the world</p>
            <Formik
            enableReinitialize
            initialValues={{
              login_email,
              login_password,
            }}
            validationSchema={loginValidation}
            >
              {(form) =>(
                  <Form>
                    <LoginInput 
                      type="text"
                      name="login_email"
                      icon="email" 
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <LoginInput 
                      type="password"
                      name="login_password"
                      icon="password" 
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <CircledIconBtn type="submit" text="Sign in"/>
                    <div  className={styles.forgot}>
                      <Link href="/forget">Forgot Password ?</Link>
                    </div>
                  </Form>
                )}
            </Formik>
            <div className={styles.login_socials}>
                <span className={styles.or}>Or continue with</span>
                <div className={styles.login_socials_wrap}>
                  {providers.map((provider)=>(
                    <div key={provider.name}>
                      <button className={styles.social_btn}
                      onClick={() => signIn(provider.id, {
                        callbackUrl: `${window.location.origin}/`,
                      })}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt=""/>
                        Sign In With {provider.name}
                      </button>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
        <div className={styles.login_container}>
          
          <div className={styles.login_form}>
            <h1>Sign Up</h1>
            <p>Get Access to one of the best services in the world</p>
            <Formik
            enableReinitialize
            initialValues={{
              name,
              email,
              password,
              conf_password,
            }}
            validationSchema={registerValidation}
            >
              {(form) =>(
                  <Form>
                    <LoginInput 
                      type="text"
                      name="name"
                      icon="user" 
                      placeholder="Full Name"
                      onChange={handleChange}
                    />
                    <LoginInput 
                      type="text"
                      name="email"
                      icon="email" 
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <LoginInput 
                      type="password"
                      name="password"
                      icon="password" 
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <LoginInput 
                      type="password"
                      name="conf_password"
                      icon="password" 
                      placeholder="Confirm Password"
                      onChange={handleChange}
                    />
                    <CircledIconBtn type="submit" text="Sign Up"/>
                  </Form>
                )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country="VN" />
    </>
  );
}

export async function getServerSideProps(context){
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}
