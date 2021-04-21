import { useState, useEffect } from "react"
import qs from "qs"

import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { cleanObject, useDebounced, useMount } from "../../utils/index"

const apiUrl = process.env.REACT_APP_API_URL;
export const Projectlist = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounced(param, 1000);
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
            if (res.ok) {
                setList(await res.json());
            }
        });
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async res => {
            if (res.ok) {
                setUsers(await res.json());
            }
        });
    })
    
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List list={list} users={users}/>
    </div>
}