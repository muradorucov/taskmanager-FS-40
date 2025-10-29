"use client"


import { login } from "@/service/auth";
import { getAllTask } from "@/service/task";
import { columns } from "./column";
import TaskTable from "@/components/TaskTable";
import { useEffect, useState } from "react";
import Link from "next/link";

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
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="text-xl font-bold">Tasks</h2>
        <Link href="/admin/tasks/create">
          <button

            class="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5
         font-medium text-white shadow-sm ring-1 ring-inset ring-black/10
         hover:shadow-lg hover:brightness-[1.05]
         active:translate-y-px
         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
         disabled:opacity-60 disabled:pointer-events-none transition"
          >
            <svg class="h-5 w-5 shrink-0 transition group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12h14" />
            </svg>
            Create
          </button>
        </Link>

      </div>
      <TaskTable tasks={data} columns={columns} />
    </div>
  );
}
