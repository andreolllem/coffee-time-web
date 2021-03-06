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
        <Link href={"/home"}>
          <a>
            <h2>Coffee-Time</h2>
          </a>
        </Link>

        {user && (
          <div className={styles.avatar}>
            <AvatarHeader src={user.avatar} />
          </div>
        )}
      </header>

      <section className={styles.section}>
        <Link href={"/compose/tweet/"}>
          <a>
            <button className={styles.btn_create}>
              <Create width={40} height={48} stroke="#fff" />
            </button>
          </a>
        </Link>

        {timeline.map(
          ({
            createdAt,
            id,
            userName,
            avatar,
            content,
            userId,
            img,
            likesCount,
            sharedCount,
          }) => (
            <Coffee
              avatar={avatar}
              createdAt={createdAt}
              img={img}
              id={id}
              key={id}
              content={content}
              userName={userName}
              userId={userId}
              likesCount={likesCount}
              sharedCount={sharedCount}
            />
          )
        )}
      </section>
      <nav className={styles.nav}>
        <Link href="/home">
          <a>
            <Home width={30} height={30} />
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
