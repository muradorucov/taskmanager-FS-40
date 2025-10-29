import Link from "next/link";

export default function TaskTable({ tasks, columns }) {
  return (
    <table className="w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-200 text-sm">
        <tr>
          {columns?.map(col => <th className="p-2 text-left" key={col.name}>{col.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task._id}
            className="border-t hover:bg-gray-100"
          >
            {
              columns?.map(col => {
                return <td className="p-2" key={task[col.colname]}>
                  {
                    col.type === "link" ?
                      <Link href={`/admin/tasks/${task._id}`}>{col.cell ? col.cell(task) : task[col.colname]}</Link>
                      :
                      col.cell ? col.cell(task) : task[col.colname]
                  }
                </td>
              })
            }
          </tr>
        ))}
      </tbody>
    </table >
  );
}
