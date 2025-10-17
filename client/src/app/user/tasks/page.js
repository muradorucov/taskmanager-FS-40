import TaskTable from "@/components/TaskTable";

export default function TasksPage() {
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <TaskTable tasks={tasks} />
    </div>
  );
}
