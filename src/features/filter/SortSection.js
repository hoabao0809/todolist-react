import React from "react";
import { useSelector } from "react-redux";
import { ORDERBY_ITEMS, SORTBY_ITEMS } from "../../constants";
import { selectSortsFilter } from "./filterSlice";
import SortItem from "./SortItem";

function SortSection() {
  const { type: typeFilter } = useSelector(selectSortsFilter);

  return (
    <>
      {/* Sortby Filter */}
      <SortItem
        label="Sort by"
        sortOption="type"
        sortsList={SORTBY_ITEMS}
      />

      {/* Order By Filter */}
      <SortItem
        label="Order by"
        sortOption="direction"
        sortsList={ORDERBY_ITEMS[typeFilter]}
      />
    </>
  );
}

export default SortSection;
