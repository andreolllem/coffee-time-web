import React from "react";
import Head from "next/head";
import styles from "../../styles/Layout.module.css";
import Logo from "../../components/Icons/Logo";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Coffee-Time</title>
      </Head>
      <Link href={"/home"}>
        <a>
          <div
            className={styles.logo}
            style={{
              width: 0,
              height: 0,
              marginTop: 30,
              marginLeft: 30,
              position: "fixed",
            }}
          >
            <Logo width={100} height={100} />
          </div>
        </a>
      </Link>

      <div className={styles.div}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
