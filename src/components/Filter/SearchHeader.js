//@flow

import React, { useState, useMemo } from "react";
import { Map } from "immutable";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Strings, AdFields } from "../../constants/Strings";
import type { adField } from "../../utils/Types";
import "./SearchHeader.css";

type Props = {|
  currentFilters: Map<?adField, string>,
  currentQuery: URLSearchParams,
|};

const SearchHeader = ({ currentFilters, currentQuery }: Props) => {
  const [filters, setFilters] = useState(() => currentFilters);
  const [query, setQuery] = useState(currentQuery);

  useMemo(() => {
    filters.forEach((value, key) => {
      if (key)
        value
          ? query.has(key)
            ? query.set(key, value)
            : query.append(key || "", value)
          : query.delete(key);
    });
    setQuery(query);
  }, [filters, query]);

  const handleSearchBoxesChange = (filter: adField) => ({
    currentTarget: { value },
  }: SyntheticEvent<HTMLInputElement>) =>
    setFilters(() => filters.set(filter, value));

  return (
    <div className="search-boxes-container">
      <SearchBox
        label={Strings.name}
        value={filters.get(AdFields.name)}
        onChange={handleSearchBoxesChange(AdFields.name)}
      />
      <SearchBox
        label={Strings.date}
        value={filters.get(AdFields.date)}
        onChange={handleSearchBoxesChange(AdFields.date)}
      />
      <SearchBox
        label={Strings.field}
        value={filters.get(AdFields.field)}
        onChange={handleSearchBoxesChange(AdFields.field)}
      />
      <SearchBox
        label={Strings.title}
        value={filters.get(AdFields.title)}
        onChange={handleSearchBoxesChange(AdFields.title)}
      />
      <Link to={`?${query.toString()}`}>{"filter"}</Link>
    </div>
  );
};

export default SearchHeader;
