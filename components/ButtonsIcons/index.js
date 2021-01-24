import styles from "../../styles/ButtonsIcons.module.css";
import Heart from "../Icons/Heart";
import Like from "../Icons/Like";
import Comments from "../Icons/Comments";
import { useState } from "react";

const ButtonsIcons = () => {
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("");

  return (
    <div>
      <div className={styles.buttons}>
        <span>
          <Like
            style={{ fill: color, fill: textColor }}
            onClick={() => {
              setColor("");
              setTextColor("chocolate");
            }}
            width={20}
            height={20}
          />
        </span>
        <span>
          <Comments
            style={{ fill: color, fill: textColor }}
            onClick={() => {
              setColor("");
              setTextColor("chocolate");
            }}
            width={20}
            height={20}
          />
        </span>
        <span>
          <Heart
            style={{ fill: color, fill: textColor }}
            onClick={() => {
              setColor("");
              setTextColor("chocolate");
            }}
            width={20}
            height={20}
          />
        </span>
      </div>
    </div>
  );
};

export default ButtonsIcons;
