import React from "react";
import { createPortal } from "react-dom";
import { IPickerContext, PickerProvider } from "../context";
import Categories from "./categories";
import Options from "./options";
import EmojiSt from "./style";

function Picker({
  onPickerChange,
}: IPickerContext) {
  return (
    <PickerProvider onPickerChange={onPickerChange}>
      <>
        {createPortal(
          <EmojiSt.Wrapper>
            <EmojiSt.Content>
              <Categories />
              <Options />
            </EmojiSt.Content>
          </EmojiSt.Wrapper>,
          document.body
        )}
      </>
    </PickerProvider>
  );
}

export default Picker;
