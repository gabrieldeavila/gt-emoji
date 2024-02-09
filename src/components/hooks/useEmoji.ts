import { useEffect, useMemo } from "react";
import { stateStorage, useTriggerState } from "react-trigger-state";
import { IEmoji } from "../../interfaces/EMOJI";

// string to array
function useEmoji() {
  const [gtEmojiCore = { content: [], frequently_used: "" }] = useTriggerState({
    name: "gt-emoji-core",
  }) as [{ content?: IEmoji[]; frequently_used: string }];

  const [freqUsed] = useTriggerState({
    name: "gt-core-frequently-used",
    /* eslint-disable @typescript-eslint/strict-boolean-expressions */
    initial:
      localStorage.getItem("gt-core-frequently-used")?.split?.(",") ?? [],
  });

  const freqLabel = useMemo(() => gtEmojiCore.frequently_used, [gtEmojiCore]);

  const FREQUENTLY_USED = useMemo(() => {
    if (gtEmojiCore == null) return [];
    return structuredClone(gtEmojiCore.content)?.reduce<IEmoji[]>(
      (acc: IEmoji[], emoji: IEmoji) => {
        if (freqUsed.includes(emoji.emoji)) {
          // push to the same index as the original
          const emoIndex = freqUsed.findIndex(
            (item: IEmoji["emoji"]) => item === emoji.emoji
          );

          acc[emoIndex] = { ...emoji, category: freqLabel };
        }

        return acc;
      },
      []
    );
  }, [freqLabel, freqUsed, gtEmojiCore]);

  const EMOJIS = useMemo(
    () => [...(FREQUENTLY_USED ?? []), ...(gtEmojiCore.content ?? [])],
    [FREQUENTLY_USED, gtEmojiCore.content]
  );

  const CATEGORIES = useMemo(
    () =>
      EMOJIS.reduce(
        (
          acc: Array<{
            name: string;
            emoji: string;
          }>,
          cur: { category: string; emoji: string }
        ) => {
          if (acc.find((item) => item.name === cur.category) == null) {
            acc.push({ name: cur.category, emoji: cur.emoji });
          }
          return acc;
        },
        FREQUENTLY_USED?.length ? [{ name: freqLabel, emoji: "🕒" }] : []
      ),
    [EMOJIS, FREQUENTLY_USED?.length, freqLabel]
  );

  const EMOJI_PER_CATEGORY = useMemo(
    () =>
      EMOJIS.reduce((acc: { [key: string]: string[] }, cur: IEmoji) => {
        if (acc[cur.category] == null) {
          acc[cur.category] = [];
        }

        // @ts-expect-error - acc[cur.category] is not null
        acc[cur.category].push(cur);
        return acc;
      }, {}),
    [EMOJIS]
  );

  useEffect(() => {
    stateStorage.set("gt-emojis", EMOJIS);
    stateStorage.set("gt-categories", CATEGORIES);
    stateStorage.set("gt-emoji-per-category", EMOJI_PER_CATEGORY);
    stateStorage.set("gt-frequently-used", FREQUENTLY_USED);
  }, [CATEGORIES, EMOJIS, EMOJI_PER_CATEGORY, FREQUENTLY_USED]);
}

export default useEmoji;
