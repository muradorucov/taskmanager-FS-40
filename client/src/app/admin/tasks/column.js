import { dateFormat } from "@/helpers/dateFormat"

export const columns = [
  {
    name: "title",
    type: "link"
  },
  {
    name: 'status',
  },
  {
    name: "assignedTo",
    cell: (obj) => {
      return obj.assignedTo.fullName
    }
  },
  {
    name: "dueDate",
    cell: (obj) => {
      return dateFormat(obj.dueDate)
    }
  },
  {
    name: "createdAt",
    cell: (obj) => {
      return dateFormat(obj.createdAt)
    }
  }
]