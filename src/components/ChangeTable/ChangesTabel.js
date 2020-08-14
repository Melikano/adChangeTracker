//@flow
import React from "react";
import type { adChange } from "../../utils/Types";
import { useLocalStorage } from "../../utils/utils";
import ChangeRow from "./ChangeRow";
import { Strings } from "../../constants/Strings";
import "./ChangeTable.css";

type Props = {|
  +changes: Array<adChange>,
|};

const ChangesTable = ({ changes }: Props) => {
  const [starredRows, setStarredRows] = useLocalStorage("starred-rows");

  const handleToggleRowStar = (isStarred: boolean, rowId: string) => {
    !isStarred
      ? setStarredRows([...starredRows, rowId])
      : setStarredRows(starredRows.filter((rId) => rId !== rowId));
  };
  return (
    <div>
      <div className="change-row">
        <p className="table-title">{Strings.oldValue}</p>
        <p className="table-title">{Strings.newValue}</p>
        <p className="table-title">{Strings.field}</p>
        <p className="table-title">{Strings.title}</p>
        <p className="table-title">{Strings.date}</p>
        <p className="table-title">{Strings.name}</p>
        <p className="table-title">{Strings.star}</p>
      </div>
      {changes.map((change) => (
        <ChangeRow
          {...change}
          starred={starredRows.includes(change.id)}
          toggleRowStarred={handleToggleRowStar}
        />
      ))}
    </div>
  );
};

export default ChangesTable;
