import { useEffect, useState } from "react";
import Camera from "../../components/Icons/Camera";
import { uploadImage } from "../../firebase/client";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import Head from "next/head";

const ImageUpload = () => {
  const [message, setMessage] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [task, setTask] = useState(null);

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

  const handleChange = (e) => {
    const file = e.target.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATE.LOADING;
  return (
    <div>
      <div onSubmit={handleSubmit}>
        <label>
          <a>
            <Camera />
            <input
              style={{ display: "none" }}
              type="file"
              name="Enviar"
              onChange={handleChange}
            />
          </a>
        </label>
        <img src={imgURL} />
      </div>
    </div>
  );
};

export default ImageUpload;
