import Head from "next/head";
import styles from "../styles/Home.module.css";
import Logo from "../components/Icons/Logo";
import GitHub from "../components/Icons/GitHub";
import Button from "../components/Button/index";
import { useRouter } from "next/router";

import { loginWithFacebook } from "../firebase/client";
import { useEffect } from "react";
import useUser, { USER_STATES } from "../hooks/useUser";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace("/home");
  }, [user]);

  const handleClick = () => {
    loginWithFacebook()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee-Time</title>
        <link rel="icon" href="/coffee-time.svg" />
      </Head>

      <section className={styles.section}>
        <Logo width={150} height={150} />
        <h1>Coffee Time</h1>
        <h2>Have a good time</h2>
        <div className={styles.btn}>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user && USER_STATES.NOT_KNOWN && <span>Loading... </span>}
        </div>
      </section>
    </div>
  );
}
