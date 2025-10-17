import { redirect } from "next/navigation";

export default function Dashboard() {
  redirect("/user/tasks")
}

