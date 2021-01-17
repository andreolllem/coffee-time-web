import React from "react";
import styles from "../../styles/CoffeePage.module.css";
import Coffee from "../../components/Cofffee";
import { firestore } from "../../firebase/admin";
import Link from "next/link";
import { useRouter } from "next/router";
import ArrowLeft from "../../components/Icons/ArrowLeft";

export default function CoffeePage(props) {
  const router = useRouter();

  if (router.isFallback) return <h1>Cargando...</h1>;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.arrow}>
          <Link href={"/home"}>
            <a>
              <ArrowLeft width={32} height={32} stroke="#d2691e" />
            </a>
          </Link>
        </div>
        <Link href={"/"}>
          <a>
            <h2>Inicio</h2>
          </a>
        </Link>
      </header>
      <section className={styles.section}>
        <Coffee {...props} />
      </section>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "HGRIzSC2z7QOsJAwJDbc" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  return firestore
    .collection("coffees")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      const { createdAt } = data;

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      };
      return { props };
    })
    .catch(() => {
      return { props: {} };
    });
}
