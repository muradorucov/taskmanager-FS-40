"use client"

import { dateFormat } from "@/helpers/dateFormat";
import { deleteTask, singleTask } from "@/service/task";
import { Trash } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function TaskDetail({ params }) {
  const { id } = use(params);
  const [task, setTask] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await singleTask(id);
        setTask(data.data);
      } catch (error) {
        setTask({})

      }
    })();
  }, [id])

  const deleteFunc = async () => {
    try {
      const data = await deleteTask(id)
      alert("Success")
    } catch (error) {
      alert(error.message)
    }
  }

  if (task === null) {
    return <p>loading....</p>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow relative">
      {
        Object.keys(task).length ? <>
          <span>{task?.isActive ? "Aktiv" : "Deaktiv"}</span>
          <h2 className="text-xl font-b old mb-2">{task?.title}</h2>
          <p className="text-gray-600 mb-4">{task?.description}</p>

          <button className="absolute top-[20px] right-[40px]"
            onClick={() => deleteFunc()}
          ><Trash /></button>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <span>Status: <b>{task?.status}</b></span>
            <span>Department: <b>{task?.departmentId?.name || "Unknow"}</b></span>
            <span>AssignedTo: <b>{task?.assignedTo.fullName}</b></span>
            <span>Created By: <b>{task?.createdBy.fullName}</b></span>
            <span>DueDate: <b>{dateFormat(task?.dueDate)}</b></span>
            <span>CreatedAt: <b>{dateFormat(task?.createdAt)}</b></span>
          </div>
        </> : <h1>Task is not defined</h1>
      }
    </div>
  );
}
