import { useState } from "react";
import { MdAdd } from "react-icons/md";

const Form = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      dueDate,
    };

    try {
      console.log("ok");
      const response = await fetch("http://127.0.0.1:3000/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      console.log("ok2");
      if (response.ok) {
        console.log("Task added");
        // Fetch tasks after adding the new task
        fetchTasks();
        // Reset the form fields
        setTitle("");
        setDescription("");
        setDueDate("");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-1">
      <form
        className="flex justify-center items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h3 className="mb-1 font-semibold">Title</h3>
          <input
            className="outline-none w-[80%]"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="text-center">
          <h3 className="mt-7 mb-1 font-semibold">Description</h3>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="text-center">
          <h3 className="mb-1 font-semibold">Due Date</h3>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-4">
            <MdAdd />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
