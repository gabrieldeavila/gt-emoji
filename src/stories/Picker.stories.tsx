import React from "react";
import Picker from "../components/picker/Picker";
import "./global.css";

export default {
  title: "Data Display/Tooltips",
};

const Template = () => {
  return (
    <Picker
      onPickerChange={(emoji) => {
        console.log(emoji, "suchwow");
      }}
    />
  );
};

export const Tooltips = Template.bind({});
