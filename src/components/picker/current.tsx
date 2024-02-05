/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useMemo } from "react";
import { CurrentEmojiSt } from "./style";
import { useTriggerState } from "react-trigger-state";
import { IEmoji } from "../../interfaces/EMOJI";
import { normalize } from "../utils/normalize";

function CurrentEmoji() {
  const [currEmoji] = useTriggerState({
    name: "emoji_hover",
  }) as [IEmoji | null];

  const name = useMemo(
    () => normalize(currEmoji?.description ?? ""),
    [currEmoji]
  );

  if (currEmoji == null) return null;

  return (
    <CurrentEmojiSt.Wrapper>
      <CurrentEmojiSt.Emoji>{currEmoji.emoji}</CurrentEmojiSt.Emoji>
      <CurrentEmojiSt.Name>{name}</CurrentEmojiSt.Name>
    </CurrentEmojiSt.Wrapper>
  );
}

export default CurrentEmoji;
