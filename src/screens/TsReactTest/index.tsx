import React, { useState, useEffect } from "react";

import { useArray } from "../../utils/index";

const apiUrl = process.env.REACT_APP_API_URL;
export const TsReactTest = () => {
  const person: { name: string; age: number }[] = [
    {
      name: "jack",
      age: 14,
    },
    {
      name: "tom",
      age: 22,
    },
  ];

  const { value, clear, removeIndex, add } = useArray(person);

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>removeIndex</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((p) => (
        <p>{`姓名：${p.name}，年龄${p.age}`}</p>
      ))}
    </div>
  );
};
