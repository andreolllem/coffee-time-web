import React from "react";

import styles from "../../styles/AvatarHeader.module.css";

const Avatar = ({ alt, src, text, withText }) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} />
      {withText && <strong>{text || alt}</strong>}
    </div>
  );
};

export default Avatar;
