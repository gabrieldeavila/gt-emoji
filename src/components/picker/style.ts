import styled, { css } from "styled-components";

const EmojiContent = styled.div<{ isClosed: boolean }>`
  position: fixed;
  background: var(--emoji-picker-background, #1a11105c);
  backdrop-filter: blur(5px);
  padding: 0.5rem;
  margin: 1rem;
  border-radius: var(--emoji-picker-default-border-radius, 5px);
  max-height: 20rem;
  max-width: 400px;

  * {
    user-select: none;
  }

  transform: ${({ isClosed }) => (isClosed ? "scale(0.5)" : "scale(1)")};

  opacity: ${({ isClosed }) => (isClosed ? 0 : 1)};

  transition: all 0.2s ease-in-out;
`;

const EmojiSt = {
  Content: EmojiContent,
};

export default EmojiSt;

const CategoriesWrapper = styled.div``;

const scrollbarCss = css`
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

const CategoriesContent = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.25rem;
  max-width: 400px;
  overflow: auto;

  ${scrollbarCss}
`;

const CategoriesItem = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  margin: 0.25rem 0.2rem;
  font-size: 1.5rem;
  user-select: none;

  border-radius: var(--emoji-picker-default-border-radius, 5px);

  background: ${({ isActive }) =>
    isActive
      ? "var(--emoji-picker-category-background, #242124)"
      : "transparent"};

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

const OptItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const EmojiName = styled.button`
  font-size: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const OptItemName = styled.div`
  font-size: 0.8rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
`;

export const OptionSt = {
  Item: {
    Wrapper: OptItemWrapper,
    Content: OptItemContent,
    Name: OptItemName,
  },
  Emoji: {
    Name: EmojiName,
  },
};

const OptionsStWrapper = styled.div`
  position: relative;
  max-height: 15rem;
  padding: 0.5rem 0;
`;

const OptionsStContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: inherit;
  padding-right: 0.5rem;

  ${scrollbarCss};

  & ${OptItemWrapper}:first-child ${OptItemName} {
    padding-top: 1rem;
  }
`;

export const OptionsSt = {
  Wrapper: OptionsStWrapper,
  Content: OptionsStContent,
};
