import React, { memo, useCallback, useMemo } from "react";
import CATEGORIES from "../categories";
import { CategoriesSt } from "./style";
import { useTriggerState } from "react-trigger-state";

const Categories = memo(() => {
  return (
    <CategoriesSt.Wrapper>
      <CategoriesSt.Content>
        {CATEGORIES.map((category, index) => (
          <Category key={index} emoji={category.emoji} name={category.name} />
        ))}
      </CategoriesSt.Content>
    </CategoriesSt.Wrapper>
  );
});

Categories.displayName = "Categories";

export default Categories;

const Category = memo(({ emoji, name }: { emoji: string; name: string }) => {
  const [currCategory] = useTriggerState({
    name: "curr_category",
  });

  const isCurrCategory = useMemo(
    () => currCategory === name,
    [currCategory, name]
  );

  const goToCategory = useCallback(() => {
    if (isCurrCategory) return;

    const category = document.querySelector(
      `[data-gt-emoji-category="${name}"]`
    ) as HTMLDivElement;

    category.scrollIntoView({
      block: "start",
      inline: "nearest",
    });
  }, [isCurrCategory, name]);

  return (
    <CategoriesSt.Item
      onClick={goToCategory}
      isActive={isCurrCategory}
      title={name}
    >
      <CategoriesSt.Emoji>{emoji}</CategoriesSt.Emoji>
    </CategoriesSt.Item>
  );
});

Category.displayName = "Category";
