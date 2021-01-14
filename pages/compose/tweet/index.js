import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/ComposeTweet.module.css";
import Button from "../../../components/Button";
import useUser from "../../../hooks/useUser";
import Avatar from "../../../components/Avatar";

import { addCoffee, uploadImage } from "../../../firebase/client";
import Link from "next/link";

const COMPOSE_STATE = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeTweet() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATE.USER_NOT_KNOWN);

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        console.log("onComplete");
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const handleSubmit = (e) => {
    setStatus(COMPOSE_STATE.LOADING);
    e.preventDefault();
    addCoffee({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATE.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };
  const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING;

  return (
    <div>
      <header className={styles.header}>
        <Link href={"/"}>
          <a>
            <h2>Inicio</h2>
          </a>
        </Link>
      </header>
      <section className={styles.form_container}>
        {user && (
          <section className={styles.avatar_container}>
            <Avatar src={user.avatar} />
          </section>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            style={{
              border: `${
                drag === DRAG_IMAGE_STATES.DRAG_OVER
                  ? "3px dashed #d2691e"
                  : "3px solid transparent"
              }`,
            }}
            onChange={handleChange}
            placeholder="O há de novo?"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></textarea>
          {imgURL && (
            <section className={styles.remove_img}>
              <button onClick={() => setImgURL(null)}>X</button>
              <img src={imgURL} />
            </section>
          )}
          <div className={styles.btn}>
            <Button disabled={isButtonDisabled}>Postar</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
