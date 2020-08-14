//@flow

import React from "react";

type Props = {|
  +label: string,
  +value?: string,
  +onChange: Function,
|};
const SearchBox = ({ label, value = "", onChange }: Props) => {
  return (
    <div className="search-box">
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBox;
