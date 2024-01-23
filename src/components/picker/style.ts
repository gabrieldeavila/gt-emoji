import styled from "styled-components";

const EmojiWrapper = styled.div`
  position: fixed;
  background: var(--emoji-picker-background, #1a1110);
  padding: 0.5rem;
  margin: 1rem;
  border-radius: var(--emoji-picker-default-border-radius, 5px);
`;

const EmojiContent = styled.div``;

const EmojiSt = {
  Wrapper: EmojiWrapper,
  Content: EmojiContent,
};

export default EmojiSt;

const CategoriesWrapper = styled.div``;

const CategoriesContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--emoji-picker-category-border, #696969);
`;

const CategoriesItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.7rem;
  padding: 0.7rem;
  user-select: none;

  border-radius: var(--emoji-picker-default-border-radius, 5px);

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background: var(--emoji-picker-category-background, #242124);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const CategoriesSt = {
  Wrapper: CategoriesWrapper,
  Content: CategoriesContent,
  Item: CategoriesItem,
};
