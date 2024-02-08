import React from "react";
import { CloseSt } from "./style";

function Close({ onClick }: { onClick: () => void }) {
  return (
    <CloseSt.X onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--emoji-picker-close-color, #fff)"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </CloseSt.X>
  );
}

export default Close;
