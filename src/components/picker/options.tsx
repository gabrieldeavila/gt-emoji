import React from "react";
import CATEGORIES from "../categories";
import { OptionSt } from "./style";

function Options() {
  return CATEGORIES.map((category, index) => {
    return <Items key={index} name={category.name} />;
  });
}

export default Options;

const Items = ({ name }: { name: string }) => {
  return <OptionSt.Item.Wrapper>{name}</OptionSt.Item.Wrapper>;
};
