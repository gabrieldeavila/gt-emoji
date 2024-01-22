import React, { useEffect } from "react";
import CATEGORIES from "../categories";
import EMOJI_PER_CATEGORY from "../emoji_per_category";

function Picker() {
  useEffect(() => {
    console.log(EMOJI_PER_CATEGORY, CATEGORIES);
  }, []);

  return <div>Picker</div>;
}

export default Picker;
