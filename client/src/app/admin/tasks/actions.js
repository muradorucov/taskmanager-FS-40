import { changeProgressTask, changeStatusTask } from "@/service/task";

export async function changeProgress(task, status) {
  try {
    const data = await changeProgressTask(task._id, status)
    alert("Success")
  } catch (error) {
    alert(error.message)
  }
}

export async function changeStatus(task) {
  try {
    const data = await changeStatusTask(task._id)
    alert("Success")
  } catch (error) {
    alert(error.message)
  }
}