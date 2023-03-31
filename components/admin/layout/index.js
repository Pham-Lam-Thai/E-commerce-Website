import DialogModal from "../../dialogModal";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { hideDialog } from "@/store/DialogSlice";
export default function Layout({ children }) {
    const { expandSidebar } = useSelector((state) =>({...state}));
    const showSidebar = expandSidebar.expandSidebar;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(hideDialog());
    },[]);
  return (
    <div className={styles.layout}>
        <DialogModal />
        <Sidebar/>
        <div 
            style={{ marginLeft: `${ showSidebar ? "280px" : "80px"}` }}
            className={styles.layout_main}>{children}</div>
    </div>
  )
}
