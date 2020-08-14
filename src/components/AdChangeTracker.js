//@flow
import React from "react";
import { Map } from "immutable";
import { dateGreaterThan, parseDate, dateEqual } from "../utils/dateUtils";
import { BST } from "../utils/BST";
import type { bst, date, adField } from "../utils/Types";
import { toAdFieldType } from "../utils/Types";
import SearchHeader from "./Filter/SearchHeader";
import data from "../data/data.json";
import { AdFields } from "../constants/Strings";
import SortHeader from "./Sort/SortHeader";
import { compareString } from "../utils/utils";
import ChangesTable from "./ChangeTable/ChangesTabel";
import { useQuery } from "../utils/utils";

const AdChangeTracker = () => {
  
  const buildTree = (data: Array<Object>) =>
    data.reduce(
      (tree, change) => {
        tree.insert(parseDate(change.date), change);
        return tree;
      },
      new BST<date>({ gt: dateGreaterThan, eq: dateEqual })
    );

  const query = useQuery();

  const currentFilters: Map<?adField, string> = [...query]
    .filter((query) => !query.includes("sort"))
    .reduce(
      (filtersMap, queryParamPair) =>
        filtersMap.set(toAdFieldType(queryParamPair[0]), queryParamPair[1]),
      Map()
    );

  const currentSortField: ?adField = toAdFieldType(query.get("sort") || "");

  const filterByDate = (tree: bst<date>, searchedDate: date) =>
    tree.search(searchedDate);

  const filter = (data: Array<Object>, filters: Map<?adField, string>) => {
    const dataSource = filters.has(AdFields.date)
      ? filterByDate(
          buildTree(data),
          parseDate(filters.get(AdFields.date) || "")
        )
      : data;

    return filters.remove(AdFields.date).isEmpty()
      ? dataSource
      : dataSource.filter((data) =>
          filters.reduce((acc, value, key) => {
            return (
              Object.keys(data).includes(key) &&
              data[key].includes(value) &&
              acc
            );
          }, true)
        );
  };

  const sort = (data: Array<Object>, sortKey: ?adField) =>
    sortKey === AdFields.date
      ? buildTree(data).traverse()
      : data.sort((a, b) => compareString(a[sortKey], b[sortKey]));

  return (
    <div>
      <SearchHeader currentFilters={currentFilters} currentQuery={query} />
      <SortHeader sortField={currentSortField} currentQuery={query} />
      <ChangesTable
        changes={sort(filter(data, currentFilters), currentSortField)}
      />
    </div>
  );
};

export default AdChangeTracker;
