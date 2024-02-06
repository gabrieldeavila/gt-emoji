import { useEffect, useMemo } from "react";
import { stateStorage, useTriggerState } from "react-trigger-state";
import { IEmoji } from "../../interfaces/EMOJI";

function useEmoji() {
  const [gtEmojiCore] = useTriggerState({
    name: "gt-emoji-core",
  });

  const EMOJIS = useMemo(() => {
    if (gtEmojiCore == null) return [];

    return gtEmojiCore.content;
  }, [gtEmojiCore]) as IEmoji[];

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
        []
      ),
    [EMOJIS]
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
  }, [CATEGORIES, EMOJIS, EMOJI_PER_CATEGORY]);
}

export default useEmoji;
