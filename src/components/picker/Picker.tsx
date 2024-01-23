import React from "react";
import { createPortal } from "react-dom";
import EmojiSt from "./style";
import Categories from "./categories";

function Picker() {
  return createPortal(
    <EmojiSt.Wrapper>
      <EmojiSt.Content>
        <Categories />
      </EmojiSt.Content>
    </EmojiSt.Wrapper>,
    document.body
  );
}

export default Picker;
