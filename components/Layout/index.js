import React from "react";
import Head from "next/head";
import styles from "../../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Coffee-Time</title>
      </Head>
      <div className={styles.div}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
