import { useEffect, useMemo, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetTodosQuery } from "./todosSlice";

import { useDispatch, useSelector } from "react-redux";
import TabPanel from "./TabPanel";
import TodoItem from "./TodoItem";
import { FILTER_STATUS } from "../../constants";
import { RenderMessageByStatus } from "./MessageByStatus";
import {
  addStatus,
  selectColorsFilter,
  selectSortsFilter,
} from "../filter/filterSlice";
import Loader from "../../components/Loader/Loader";

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const TABS = [
  {
    label: "Show all to-dos",
    id: "ALL",
  },
  {
    label: "Show active to-dos",
    id: "ACTIVE",
  },
  {
    label: "Show completed to-dos",
    id: "COMPLETED",
  },
  {
    label: "Show deleted to-dos",
    id: "DELETED",
  },
];

export default function Content() {
  const dispatch = useDispatch();
  const [selectedTabId, setSelectedTabId] = useState("ALL");

  const filterStatus = useMemo(() => {
    switch (selectedTabId) {
      case "ALL":
        return FILTER_STATUS.all;
      case "ACTIVE":
        return FILTER_STATUS.active;
      case "COMPLETED":
        return FILTER_STATUS.completed;
      case "DELETED":
        return FILTER_STATUS.deleted;

      default:
        break;
    }
  }, [selectedTabId]);

  const filterColors = useSelector(selectColorsFilter);
  const filterSorts = useSelector(selectSortsFilter);

  // re-calculate returned search params if dependencies changed
  const filterParams = useMemo(() => {
    const { type, direction } = filterSorts;
    const sortByParam = type + direction;

    return {
      colors: filterColors,
      sortBy: sortByParam,
      status: filterStatus,
    };
  }, [filterColors, filterSorts, filterStatus]);

  const { data: todos, isFetching } = useGetTodosQuery(filterParams);

  useEffect(() => {
    dispatch(addStatus(filterStatus));
  }, [filterStatus, dispatch]);

  const handleChange = (event, newValue) => {
    setSelectedTabId(newValue);
  };

  // use memo
  const renderedTodos = useMemo(() => {
    let content;
    if (isFetching) {
      content = <Loader />;
    } else if (todos?.length === 0) {
      content = <RenderMessageByStatus status={filterStatus} />;
    } else {
      content = todos?.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          filterStatus={filterStatus}
        />
      ));
    }

    return content;
  }, [todos, filterStatus, isFetching]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tab Bar */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTabId}
          onChange={handleChange}
          aria-label="todo tabs"
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.label}
              {...tabProps(tab.id)}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Panel */}
      <TabPanel>{renderedTodos}</TabPanel>
    </Box>
  );
}
