import React, { useState } from "react";
import styles from "../../styles/Coffee.module.css";
import Avatar from "../../components/Avatar/index";
import useTimaAgo from "../../hooks/useTimeAgo";
import useDateTimeFormat from "../../hooks/useDateTimeFormat";
import Link from "next/link";
import { useRouter } from "next/router";
import Like from "../Icons/Like";
import Comments from "../Icons/Comments";
import Heart from "../Icons/Heart";

const Coffee = ({
  avatar,
  userName,
  content,
  id,
  createdAt,
  img,
  likesCount,
  sharedCount,
}) => {
  const timeago = useTimaAgo(createdAt);
  const createdAtFormated = useDateTimeFormat(createdAt);
  const [count, setCount] = useState(0);
  const [task, setTask] = useState(null);

  const router = useRouter();

  const handleArticleClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const task = uploadImage(file);
    setTask(task);
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
      <form className={styles.buttons}>
        <div className={styles.buttons_like}>
          <Like type="button" onClick={() => setCount(count + 1)} />

          <span>{`${count + likesCount}`}</span>
        </div>
        <div className={styles.buttons_comments}>
          <Comments />
        </div>
        <div className={styles.buttons_comments}>
          <Heart />
        </div>
      </form>
    </div>
  );
};

export default Coffee;
