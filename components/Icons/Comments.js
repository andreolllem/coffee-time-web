import * as React from "react";
import { useState } from "react";

function Comments(props) {
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
      className="prefix__bi prefix__bi-chat-dots-fill"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 10-2 0 1 1 0 002 0zm4 0a1 1 0 10-2 0 1 1 0 002 0zm3 1a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  );
}

export default Comments;
