import React, { useCallback, useRef } from "react";
import Picker, { IPickerRefProps } from "../components/picker/Picker";
import "./global.css";

export default {
  title: "Data Display/Tooltips",
};

const Template = () => {
  const pickerRef = useRef<IPickerRefProps>(null);
  const baseRef = useRef<HTMLButtonElement>(null);

  const togglePicker = useCallback(() => {
    if (pickerRef.current == null) return;

    pickerRef.current.toggle();
  }, []);

  return (
    <>
      <button
        ref={baseRef}
        onClick={togglePicker}
        style={{
          border: "none",
        }}
      >
        Click to toggle picker
      </button>

      <Picker
        baseRef={baseRef}
        ref={pickerRef}
        onPickerChange={(emoji) => {
          console.log(emoji, "suchwow");
        }}
      />
    </>
  );
};

export const Tooltips = Template.bind({});
