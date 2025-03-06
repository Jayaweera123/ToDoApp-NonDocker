import { useState } from "react";
import { addTask } from "../services/api";
import Swal from "sweetalert2";

// Custom hook for form logic
const useTaskForm = (onTaskAdded) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

// displays a popup message with SweetAlert2.
  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#001b5e",
      iconColor: "#000000",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      showAlert("Error!", "Both title and description are required.", "error");
      return;
    }

    try {
      await addTask({ title, description });
      setTitle("");
      setDescription("");
      showAlert("Task Added!", "Your task has been successfully added.", "success");
      onTaskAdded(); // Refresh task list
    } catch (error) {
      showAlert("Oops!", "Something went wrong while adding the task.", "error");
    }
  };

  return { title, setTitle, description, setDescription, handleSubmit };
};

// ToDoForm Component
const ToDoForm = ({ onTaskAdded }) => {
  const { title, setTitle, description, setDescription, handleSubmit } = useTaskForm(onTaskAdded);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4 text-black">Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <FormField label="Task">
          <input
            type="text"
            placeholder="Add your task"
            className="w-full p-2 border rounded-md mb-4 text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>

        <FormField label="Description">
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded-md mb-4 h-24 text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

// Reusable FormField Component
const FormField = ({ label, children }) => (
  <div>
    <label className="block text-black font-semibold mb-1">{label}</label>
    {children}
  </div>
);

export default ToDoForm;
