import { useState, useEffect } from "react";
import qs from "qs";

import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useDebounced, useMount } from "../../utils/index";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounced(param, 1000);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) });
  }, [debouncedParam]);

  useMount(() => {
    client("users");
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};
