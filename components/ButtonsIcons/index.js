import styles from "../../styles/ButtonsIcons.module.css";
import Heart from "../Icons/Heart";
import Like from "../Icons/Like";
import Comments from "../Icons/Comments";

const ButtonsIcons = () => {
  return (
    <div>
      <div className={styles.like}>
        <span>
          <p style={{ color: "#fff" }}>10</p>
          <Like width={20} height={20} stroke="#fff" />
        </span>
        <span>
          <Comments width={20} height={20} stroke="#fff" />
        </span>
        <span>
          <Heart width={20} height={20} stroke="#fff" />
        </span>
      </div>
    </div>
  );
};

export default ButtonsIcons;
