export default function TaskDetail({ params }) {
  const { id } = params;

  // mock data
  const task = {
    id,
    title: "Frontend Design",
    description: "Create responsive UI using Tailwind CSS",
    status: "In Progress",
    priority: "High",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex gap-6 text-sm">
        <span>Status: <b>{task.status}</b></span>
        <span>Priority: <b>{task.priority}</b></span>
      </div>
    </div>
  );
}
