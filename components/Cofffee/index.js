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
        <div className={styles.div}>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>Postou {timeago}</time>
              </a>
            </Link>
          </header>
          <h4>{content}</h4>
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
