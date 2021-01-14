import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/homePage.module.css";
import Coffee from "../../components/Cofffee";
import useUser from "../../hooks/useUser";
import { listenLatestCoffees } from "../../firebase/client";
import Create from "../../components/Icons/Create";
import Home from "../../components/Icons/Home";
import Search from "../../components/Icons/Search";
import AvatarHeader from "../../components/Avatar/AvatarHeader";

const HomePage = () => {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = listenLatestCoffees(setTimeline);
    }
    return () => unsubscribe && unsubscribe();
  }, [user]);

  return (
    <div>
      <Head>
        <title>Home - Coffee-Time</title>
      </Head>
      <header className={styles.header}>
        {user && (
          <div className={styles.avatar}>
            <AvatarHeader src={user.avatar} />
          </div>
        )}
        <Link href={"/"}>
          <a>
            <h2>Inicio</h2>
          </a>
        </Link>
      </header>

      <section className={styles.section}>
        {timeline.map(
          ({ createdAt, id, userName, avatar, content, userId, img }) => (
            <Coffee
              avatar={avatar}
              createdAt={createdAt}
              img={img}
              id={id}
              key={id}
              content={content}
              userName={userName}
              userId={userId}
            />
          )
        )}
      </section>

      <nav className={styles.nav}>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#d2691e" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#d2691e" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#d2691e" />
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
