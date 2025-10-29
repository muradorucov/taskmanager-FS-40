import { dateFormat } from "@/helpers/dateFormat"
import { Eye, EyeOff, Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import { changeProgress, changeStatus } from "./actions";
export const columns = [
  {
    name: "Title",
    colname: "title",
    type: "link"
  },
  {
    name: 'Status',
    colname: 'status',
    cell: (obj) => {
      console.log(obj);


      return <select onChange={(e) => changeProgress(obj, e.target.value)}>
        <option selected={obj.status === "pending"}>pending</option>
        <option selected={obj.status === "in-progress"}>in-progress</option>
        <option selected={obj.status === "in-review"}>in-review</option>
        <option selected={obj.status === "completed"}>completed</option>
      </select>
    }
  },
  {
    name: "Assigned To",
    cell: (obj) => {
      return obj.assignedTo.fullName
    }
  },
  {
    name: "Due Date",
    cell: (obj) => {
      return dateFormat(obj.dueDate)
    }
  },
  {
    name: "Created At",
    cell: (obj) => {
      return dateFormat(obj.createdAt)
    }
  },
  {
    name: "Actions",
    cell: (obj) => {
      return <div>
        <button onClick={() => changeStatus(obj)}>
          {
            obj.isActive ? <Eye /> : <EyeOff />
          }
        </button>
        <button> <Pencil /></button>
      </div>
    }
  }
]