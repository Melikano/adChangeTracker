//@flow

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AdFields, Strings } from "../../constants/Strings";
import type { adField } from "../../utils/Types";
import "./SortHeader.css";

type Props = {| +sortField: ?adField, currentQuery: URLSearchParams |};
const SortHeader = ({ sortField, currentQuery }: Props) => {
  const [selectedField, setSelectedField] = useState(sortField);
  const [query, setQuery] = useState(currentQuery);

  useMemo(() => {
    selectedField
      ? query.has("sort")
        ? query.set("sort", selectedField)
        : query.append("sort", selectedField)
      : query.delete("sort");
    setQuery(query);
  }, [selectedField, query]);

  const handleSelectChange = ({
    currentTarget: { value },
  }: SyntheticEvent<HTMLInputElement>) => setSelectedField(value);

  return (
    <div className="sort-header">
      <label>{Strings.sortBy}</label>
      <select onChange={handleSelectChange} defaultValue={selectedField}>
        <option value="">{"-------"}</option>
        {Object.keys(AdFields).map((key) => (
          <option key={key} value={key}>
            {Strings[key]}
          </option>
        ))}
      </select>
      <Link to={`?${query.toString()}`}>sort</Link>
    </div>
  );
};

export default SortHeader;
