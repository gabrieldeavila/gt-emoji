// emoji per category
import emojis from "./emoji.json";

const EMOJI_PER_CATEGORY = emojis.reduce(
  (
    acc: { [key: string]: string[] },
    cur: { category: string; emoji: string }
  ) => {
    if (acc[cur.category] == null) {
      acc[cur.category] = [];
    }

    // @ts-expect-error - acc[cur.category] is not null
    acc[cur.category].push(cur);
    return acc;
  },
  {}
);

export default EMOJI_PER_CATEGORY;
