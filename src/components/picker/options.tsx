import React, { memo, useCallback, useMemo, useRef } from "react";
import { IEmoji } from "../../interfaces/EMOJI";
import CATEGORIES from "../categories";
import EMOJI_PER_CATEGORY from "../emoji_per_category";
import { OptionSt, OptionsSt } from "./style";
import { stateStorage, useTriggerState } from "react-trigger-state";
import { usePickerContext } from "../context";

function Options() {
  const parentRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<Record<string, HTMLDivElement>>({});
  useTriggerState({
    name: "curr_category",
    initial: CATEGORIES?.[0]?.name,
  });

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const bounds = (event.target as Element).getBoundingClientRect();
      // gets the first element that is partially in the viewport
      const element = document.elementFromPoint(bounds.x, bounds.y + 1);

      const closestCategory = element?.closest("[data-gt-emoji-category]");
      const category = closestCategory?.getAttribute("data-gt-emoji-category");

      stateStorage.set("curr_category", category);
    },
    []
  );

  return (
    <OptionsSt.Wrapper>
      <OptionsSt.Content onScroll={handleScroll} ref={parentRef}>
        {CATEGORIES.map((category, index) => (
          <Items
            categoriesRef={categoriesRef}
            key={index}
            name={category.name}
          />
        ))}
      </OptionsSt.Content>
    </OptionsSt.Wrapper>
  );
}

export default Options;

const Items = ({
  name,
  categoriesRef,
}: {
  name: string;
  categoriesRef: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
}) => {
  const categoryEmojis = useMemo(
    () => EMOJI_PER_CATEGORY[name] as unknown as IEmoji[],
    [name]
  );

  const onRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node != null) {
        categoriesRef.current[name] = node;
      }
    },
    [categoriesRef, name]
  );

  return (
    <OptionSt.Item.Wrapper ref={onRef} data-gt-emoji-category={name}>
      <OptionSt.Item.Name>{name}</OptionSt.Item.Name>

      <OptionSt.Item.Content>
        {categoryEmojis.map((emoji, index) => (
          <Emoji key={index} {...emoji} />
        ))}
      </OptionSt.Item.Content>
    </OptionSt.Item.Wrapper>
  );
};

const Emoji = memo((emoji: IEmoji) => {
  const { onPickerChange } = usePickerContext();

  const handleClick = useCallback(() => {
    onPickerChange(emoji);
  }, [emoji, onPickerChange]);

  return (
    <OptionSt.Emoji.Name onClick={handleClick}>
      <span>{emoji.emoji}</span>
    </OptionSt.Emoji.Name>
  );
});

Emoji.displayName = "Emoji";
