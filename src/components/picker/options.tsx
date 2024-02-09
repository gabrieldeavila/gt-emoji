/* eslint-disable @typescript-eslint/indent */
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { IEmoji } from "../../interfaces/EMOJI";
import { OptionSt, OptionsSt } from "./style";
import { stateStorage, useTriggerState } from "react-trigger-state";
import { usePickerContext } from "../context";
import { normalize } from "../utils/normalize";

const DEFAULT_PADDING = 80;

function Options({ isMobile }: { isMobile: boolean }) {
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

  useEffect(() => {
    if (!isMobile) return;

    // add the right height to the content
    if (parentRef.current == null) return;

    const parent = parentRef.current.parentElement?.parentElement;
    const parentChildren = parent?.children;

    if (parentChildren == null) return;

    // get the height of each child (that do not contains content)
    const childrenHeight = Array.from(parentChildren).reduce((acc, child) => {
      if (child.contains(parentRef.current)) {
        return acc;
      }

      return acc + child.clientHeight;
    }, 0);

    const availableHeight =
      window.innerHeight - childrenHeight - DEFAULT_PADDING;

    parentRef.current.style.maxHeight = `${availableHeight}px`;
    const parentEl = parentRef.current;

    return () => {
      parentEl.style.maxHeight = "";
    };
  }, [isMobile]);

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
    const frequentlyUsed = stateStorage.get(
      "gt-core-frequently-used"
    ) as string[];

    const emojiIndex = frequentlyUsed.findIndex((e) => e === emoji.emoji);
    // the max length of the frequently used is 10
    if (emojiIndex === -1 && frequentlyUsed.length >= 10) {
      frequentlyUsed.pop();
    }

    if (emojiIndex !== -1) {
      frequentlyUsed.splice(emojiIndex, 1);
    }

    // add at the beginning of the array
    frequentlyUsed.unshift(emoji.emoji);

    stateStorage.set(
      "gt-core-frequently-used",
      structuredClone(frequentlyUsed)
    );

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
