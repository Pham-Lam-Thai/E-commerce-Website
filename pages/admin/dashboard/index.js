import Layout from "../../../components/admin/layout";
//import styles from "../../../styles/dashboard.module.scss";
import {toast} from "react-toastify";
export default function dashboard() {
  return (
    <div>
      <Layout>
        <button onClick={() => toast.success("Everything is working fine !",{
            position: "top-right",
        })}>
          Click to Show Toastify
        </button>
      </Layout>
    </div>
  );
}
