//@flow
import React from "react";

type Props = {|
  +id: string,
  +name: string,
  +date: string,
  +title: string,
  +field: string,
  +old_value: string,
  +new_value: string,
  +starred?: boolean,
  +toggleRowStarred: Function,
|};
const ChangeRow = ({
  id,
  name,
  date,
  title,
  field,
  old_value,
  new_value,
  starred = false,
  toggleRowStarred,
}: Props) => {
  return (
    <div key={`${title}${id}`} className="change-row">
      <p className={"change-row-item"}>{new_value}</p>
      <p className={"change-row-item"}>{old_value}</p>
      <p className={"change-row-item"}>{field}</p>
      <p className={"change-row-item"}>{title}</p>
      <p className={"change-row-item"}>{date}</p>
      <p className={"change-row-item"}>{name}</p>
      <p
        className={"change-row-item"}
        onClick={() => toggleRowStarred(starred, id)}
      >
        {starred ? "*" : ""}
      </p>
    </div>
  );
};

export default ChangeRow;
