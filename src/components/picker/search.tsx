import React, { memo } from "react";
import { SearchSt } from "./style";
import SearchSVG from "../utils/search";

const Search = memo(() => {
  return (
    <SearchSt.Wrapper>
      <SearchSt.Icon htmlFor="search_input">
        <SearchSVG />
      </SearchSt.Icon>
      <SearchSt.Input id="search_input" placeholder="Emoji..." />
    </SearchSt.Wrapper>
  );
});

Search.displayName = "Search";

export default Search;
