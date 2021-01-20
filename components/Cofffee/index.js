import React from "react";
import styles from "../../styles/Coffee.module.css";
import Avatar from "../../components/Avatar/index";
import useTimaAgo from "../../hooks/useTimeAgo";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";
import Link from "next/link";
import { useRouter } from "next/router";
import ButtonsIcons from "../ButtonsIcons";

const Coffee = ({ avatar, userName, content, id, createdAt, img }) => {
  const timeago = useTimaAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);

  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  return (
    <div>
      <article onClick={handleArticleClick} className={styles.article}>
        <section>
          <header className={styles.header}>
            <Avatar src={avatar} alt={userName} />
            <strong>{userName}</strong>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>Postou {timeago}</time>
              </a>
            </Link>
          </header>
          <div className={styles.content}>
            <h4>{content}</h4>
          </div>
          {img && <img src={img} className={styles.img} />}
        </section>
      </article>
      <div className={styles.buttons_icons}>
        <ButtonsIcons />
      </div>
    </div>
  );
};

export default Coffee;
