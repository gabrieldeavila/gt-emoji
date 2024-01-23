import emoji from "./emoji.json";

const CATEGORIES = emoji.reduce(
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
);

export default CATEGORIES;
