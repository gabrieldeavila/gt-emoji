import emoji from "./emoji.json";

const CATEGORIES = emoji.reduce((acc: string[], cur: { category: string }) => {
  if (!acc.includes(cur.category)) {
    acc.push(cur.category);
  }
  return acc;
}, []);

export default CATEGORIES;
