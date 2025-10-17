"use client"


import { login } from "@/service/auth";
import { getAllTask } from "@/service/task";
import { columns } from "./column";
import TaskTable from "@/components/TaskTable";
import { useEffect, useState } from "react";

export default function Tasks() {
  const [data, setData] = useState([])
  useEffect(() => {

    (async () => {
      await login()
      const data = await getAllTask();

      console.log(data.
        data
      );

      setData(data.data)
    })()
  }, [])
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <TaskTable tasks={data} columns={columns} />
    </div>
  );
}
