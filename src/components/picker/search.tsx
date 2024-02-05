/* eslint-disable @typescript-eslint/indent */
import React, { memo, useCallback, useEffect } from "react";
import { SearchSt } from "./style";
import SearchSVG from "../utils/search";
import { stateStorage, useTriggerState } from "react-trigger-state";

const Search = memo(() => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [searchEmoji] = useTriggerState({ name: "search_gt_emoji" }) as [
    string
  ];

  useEffect(() => {
    if (ref.current != null) {
      ref.current.focus();
    }
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    stateStorage.set("search_gt_emoji", e.target.value);
  }, []);

  return (
    <SearchSt.Wrapper>
      <SearchSt.Icon htmlFor="search_input">
        <SearchSVG />
      </SearchSt.Icon>
      <SearchSt.Input
        value={searchEmoji}
        ref={ref}
        onChange={handleSearch}
        id="search_input"
        placeholder="Emoji..."
      />
    </SearchSt.Wrapper>
  );
});

Search.displayName = "Search";

export default Search;
