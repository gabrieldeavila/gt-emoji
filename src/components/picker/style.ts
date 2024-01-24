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
  align-items: center;
  padding-bottom: 0.25rem;
  max-width: 400px;
  overflow: auto;

  /* change the scrollbar to be the minimum posible */
  &::-webkit-scrollbar {
    width: 12px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--emoji-picker-scroll-thumb, #696969);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--emoji-picker-scroll-background, #242124);
  }
`;

const CategoriesItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.2rem;
  padding: 0.5rem;
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

const OptItemWrapper = styled.div`
  color: var(--emoji-picker-option-color, #fff);
`;

export const OptionSt = {
  Item: {
    Wrapper: OptItemWrapper,
  },
};
