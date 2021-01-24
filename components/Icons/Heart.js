import * as React from "react";
import { useState } from "react";

function Heart(props) {
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("");
  return (
    <svg
      style={{ fill: color, fill: textColor }}
      onClick={() => {
        setColor("");
        setTextColor("chocolate");
      }}
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      stroke="#fff"
      fill="#292e31"
      className="prefix__bi prefix__bi-heart-fill"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
      />
    </svg>
  );
}

export default Heart;
