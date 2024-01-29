import React, { memo } from "react";
import CATEGORIES from "../categories";
import { CategoriesSt } from "./style";

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
  return (
    <CategoriesSt.Item title={name}>
      <span>{emoji}</span>
    </CategoriesSt.Item>
  );
});

Category.displayName = "Category";
