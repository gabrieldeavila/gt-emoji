import styled, { css } from "styled-components";

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

const CategoriesEmoji = styled.div``;

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

  ${CategoriesEmoji} {
    filter: ${({ isActive }) => (isActive ? "grayscale(0)" : "grayscale(1)")};
  }
`;

export const CategoriesSt = {
  Wrapper: CategoriesWrapper,
  Content: CategoriesContent,
  Item: CategoriesItem,
  Emoji: CategoriesEmoji,
};

const OptItemWrapper = styled.div`
  color: var(--emoji-picker-option-color, #fff);
`;

const OptItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 1rem;
`;

const EmojiName = styled.button`
  font-size: 2rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: var(--emoji-picker-default-border-radius, 5px);
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
    background: var(--emoji-picker-option-background, #242124);
    filter: drop-shadow(2px 5px 1rem var(--emoji-picker-option-shadow, #000));
  }

  &:active {
    transform: scale(0.9);
  }
`;

const OptItemName = styled.div`
  font-size: 1rem;
  font-weight: bold;
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

const CurrentEmojiStWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
  height: 4rem;
`;

const CurrentEmojiStEmoji = styled.div`
  font-size: 2.5rem;
`;

const CurrentEmojiStName = styled.div`
  color: var(--emoji-picker-current-emoji-color, #fff);
  text-transform: capitalize;
`;

export const CurrentEmojiSt = {
  Wrapper: CurrentEmojiStWrapper,
  Emoji: CurrentEmojiStEmoji,
  Name: CurrentEmojiStName,
};

const SearchStSearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: var(--emoji-picker-default-border-radius, 5px);
  background: var(--emoji-picker-search-background, #242124);
  color: var(--emoji-picker-search-color, #fff);
  margin-bottom: 1rem;

  &:focus-within {
    outline: 2px solid var(--emoji-picker-search-focus-outline, #fff);
    background: var(--emoji-picker-search-focus-background, #1a1110);
  }
`;

const SearchStSearchIcon = styled.label`
  font-size: 1.5rem;
  display: flex;
  cursor: pointer;
`;

const SearchStInput = styled.input`
  border: none;
  font-size: 1rem;
  width: 100%;
  background: transparent;
  outline: none;
  color: var(--emoji-picker-search-color, #fff);
`;

export const SearchSt = {
  Wrapper: SearchStSearchWrapper,
  Icon: SearchStSearchIcon,
  Input: SearchStInput,
};

const EmojiContent = styled.div<{ isMobile: boolean; isClosed: boolean }>`
  position: fixed;
  background: var(--emoji-picker-background, #1a11105c);
  backdrop-filter: blur(5px);
  padding: 0.5rem;
  margin: 1rem;
  border-radius: var(--emoji-picker-default-border-radius, 5px);

  ${({ isMobile }) =>
    !isMobile
      ? css`
          max-height: 30rem;
          max-width: 400px;
        `
      : css`
          ${CategoriesContent} {
            max-width: 100%;
          }

          ${CategoriesItem} {
            flex-grow: 1;
          }
        `}

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

const CloseStX = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.5rem;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const CloseSt = {
  X: CloseStX,
};
