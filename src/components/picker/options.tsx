import React, { memo, useMemo } from "react";
import { IEmoji } from "../../interfaces/EMOJI";
import CATEGORIES from "../categories";
import EMOJI_PER_CATEGORY from "../emoji_per_category";
import { OptionSt, OptionsSt } from "./style";

function Options() {
  return (
    <OptionsSt.Wrapper>
      <OptionsSt.Content>
        {CATEGORIES.map((category, index) => (
          <Items key={index} name={category.name} />
        ))}
      </OptionsSt.Content>
    </OptionsSt.Wrapper>
  );
}

export default Options;

const Items = ({ name }: { name: string }) => {
  const categoryEmojis = useMemo(
    () => EMOJI_PER_CATEGORY[name] as unknown as IEmoji[],
    [name]
  );

  return (
    <OptionSt.Item.Wrapper>
      <OptionSt.Item.Name>{name}</OptionSt.Item.Name>

      <OptionSt.Item.Content>
        {categoryEmojis.map((emoji, index) => (
          <Emoji key={index} {...emoji} />
        ))}
      </OptionSt.Item.Content>
    </OptionSt.Item.Wrapper>
  );
};

const Emoji = memo(({ emoji }: IEmoji) => {
  return (
    <OptionSt.Emoji.Name>
      <span>{emoji}</span>
    </OptionSt.Emoji.Name>
  );
});

Emoji.displayName = "Emoji";
