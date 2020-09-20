import React from "react";
import styles from "./preloader.module.css";

const Preloader = (props) => (
    <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default Preloader;