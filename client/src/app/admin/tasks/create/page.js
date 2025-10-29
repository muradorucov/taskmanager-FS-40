"use client";
import { getActiveDepartments } from "@/service/department";
import { createTask } from "@/service/task";
import { useEffect, useState } from "react";

export default function TaskCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    departmentId: "",
    assignedTo: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState({})

  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  // Department-ları yüklə
  useEffect(() => {
    (async () => {
      const data = await getActiveDepartments();
      setDepartments(data.data);
    })();
  }, []);

  // Department dəyişdikdə user-ləri yüklə
  useEffect(() => {
    if (!formData.departmentId) return;

    setUsers(departments.find(dep => dep._id === formData.departmentId).users)
  }, [formData.departmentId]);

  // Input dəyişikliklərini idarə et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

  

      const data = await createTask(formData)
      console.log("Server response:", data);
      setErrors({})
      alert("Task yaradıldı!");
    } catch (error) {

      if (error.status === 400) {
        setErrors(error.response.data)
      }

    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"

          />
          {
            errors.title && <span className="text-red-950"> {errors.title}</span>
          }
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {
            errors.description && <span className="text-red-950"> {errors.description}</span>
          }
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"

          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.name}
              </option>
            ))}
          </select>

          {
            errors.departmentId && <span className="text-red-950"> {errors.departmentId}</span>
          }
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={!users.length}
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.fullName}
              </option>
            ))}
          </select>
          {
            errors.assignedTo && <span className="text-red-950"> {errors.assignedTo}</span>
          }
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {
            errors.dueDate && <span className="text-red-950"> {errors.dueDate}</span>
          }
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-2.5 rounded-lg
                     hover:brightness-110 transition shadow-md hover:shadow-lg"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
