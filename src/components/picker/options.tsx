/* eslint-disable @typescript-eslint/indent */
import React, { memo, useCallback, useMemo, useRef } from "react";
import { IEmoji } from "../../interfaces/EMOJI";
import { OptionSt, OptionsSt } from "./style";
import { stateStorage, useTriggerState } from "react-trigger-state";
import { usePickerContext } from "../context";
import { normalize } from "../utils/normalize";

function Options() {
  const parentRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<Record<string, HTMLDivElement>>({});
  const [CATEGORIES] = useTriggerState({
    name: "gt-categories",
  }) as [
    Array<{
      name: string;
      emoji: string;
    }>
  ];

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

const Items = memo(
  ({
    name,
    categoriesRef,
  }: {
    name: string;
    categoriesRef: React.MutableRefObject<
      Record<string, HTMLDivElement | null>
    >;
  }) => {
    const [EMOJI_PER_CATEGORY] = useTriggerState({
      name: "gt-emoji-per-category",
    }) as [Record<string, IEmoji[]>];

    const [searchEmoji] = useTriggerState({ name: "search_gt_emoji" }) as [
      string | null
    ];

    const categoryEmojis = useMemo(() => {
      const emojis = EMOJI_PER_CATEGORY[name] as unknown as IEmoji[];

      if (searchEmoji != null) {
        return emojis.filter(
          (emoji) =>
            normalize(emoji.description).includes(normalize(searchEmoji)) ||
            emoji.tags?.some?.((tag) =>
              normalize(tag).includes(normalize(searchEmoji))
            )
        );
      }

      return emojis;
    }, [EMOJI_PER_CATEGORY, name, searchEmoji]);

    const onRef = useCallback(
      (node: HTMLDivElement | null) => {
        if (node != null) {
          categoriesRef.current[name] = node;
        }
      },
      [categoriesRef, name]
    );

    if (categoryEmojis == null || categoryEmojis.length === 0) return null;

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
  }
);

Items.displayName = "Items";

const Emoji = memo((emoji: IEmoji) => {
  const { onPickerChange } = usePickerContext();

  const handleClick = useCallback(() => {
    onPickerChange(emoji);
  }, [emoji, onPickerChange]);

  return (
    <OptionSt.Emoji.Name
      onMouseEnter={() => stateStorage.set("emoji_hover", emoji)}
      onClick={handleClick}
    >
      <span>{emoji.emoji}</span>
    </OptionSt.Emoji.Name>
  );
});

Emoji.displayName = "Emoji";
