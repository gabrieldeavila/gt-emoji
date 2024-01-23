// random emoji
import emojis from "./emoji.json";

const RANDOM_EMOJI = () => {
  const index = Math.floor(Math.random() * emojis.length);
  return emojis[index];
};

export default RANDOM_EMOJI;
