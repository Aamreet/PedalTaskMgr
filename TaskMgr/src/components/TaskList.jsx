import React, { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiCircleMore } from "react-icons/ci";

import { IoCloseSharp } from "react-icons/io5";

const TaskList = ({ taskList, setTaskList }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
  });
  const [searchedTask, setSearchedTask] = useState({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
  });

  let sbox = useRef("");
  let [sflag, setSflag] = useState(false);

  const [showPopup, setShowPopup] = useState(false); // State for controlling popup visibility
  const [popupDescription, setPopupDescription] = useState(""); // State for storing full description

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/deleteTask/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setTaskList(taskList.filter((task) => task._id !== taskId));
        console.log("Task deleted successfully");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (task) => {
    // Set the edited task state with the current task details
    setEditedTask({
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
    setEditMode(true); // Enable edit mode
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/updateTask/${editedTask._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTask),
        }
      );
      if (response.ok) {
        // Update the task list in UI after successful update
        setTaskList((prevTaskList) =>
          prevTaskList.map((task) =>
            task._id === editedTask._id ? editedTask : task
          )
        );
        setEditMode(false); // Disable edit mode
        console.log("Task updated successfully");
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const renderShortDescription = (description) => {
    if (description.length > 4) {
      console.log("oh ho");
      return description.substring(0, 4);
    } else {
      console.log("oh no");
      return description; // Return full description if it's shorter than 4 characters
    }
  };

  const togglePopup = (description) => {
    setPopupDescription(description);
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  const handleSearch = async () => {
    if (sbox.current) {
      const searchTerm = sbox.current.value.trim(); // Trim any leading/trailing spaces
      if (searchTerm) {
        try {
          const response = await fetch(
            `http://localhost:3000/getTask/${encodeURIComponent(searchTerm)}`
          );
          if (response.ok) {
            const task = await response.json();
            console.log("Task found:", task);
            // Handle displaying the task or updating state in your component
            setSearchedTask({
              _id: task._id,
              title: task.title,
              description: task.description,
              dueDate: task.dueDate,
            });
          } else {
            console.error("Failed to fetch task:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.log("Search term is empty");
      }
      setSflag(true);
      sbox.current.value = "";
    }
  };

  const handleSearchClose = () => {
    setSflag(false);
  };
  return (
    <>
      <div className=" text-center">
        <input
          ref={sbox}
          className=" outline-none p-1 mr-1"
          type="text"
          placeholder="Search"
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Go
        </button>
        <div
          className={`bg-white flex justify-center items-center gap-2 ${
            sflag === false ? "dnone" : ""
          } `}
        >
          <h3>{searchedTask.title}</h3>
          <p>{searchedTask.description}</p>
          <p>{formatDate(searchedTask.dueDate)}</p>
          <button className="btn btn-danger" onClick={handleSearchClose}>
            <IoCloseSharp></IoCloseSharp>
          </button>
        </div>
      </div>
      <div className="task-list">
        {taskList.map((task) => (
          <div key={task._id} className="task flex justify-around">
            {editMode && editedTask._id === task._id ? (
              <div className="w-[80%] flex items-center justify-around">
                <input
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
                <textarea
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                ></textarea>
                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, dueDate: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="w-[80%] flex items-center justify-around">
                <h3>{task.title}</h3>
                {/* Show first 4 letters only*/}
                <p
                  className="flex items-center justify-center gap-1 cursor-pointer"
                  title="See more.."
                  onClick={() => togglePopup(task.description)}
                >
                  {renderShortDescription(task.description)}
                  <span>
                      <CiCircleMore className="more-icon" />
                    </span>
                </p>
                <p>{formatDate(task.dueDate)}</p>
              </div>
            )}

            <div className="flex justify-center gap-2">
              {editMode && editedTask._id === task._id ? (
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => handleEdit(task)}
                >
                  <MdEdit />
                </button>
              )}
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(task._id)}
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>
        ))}
        {/* Popup to show full description */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-md">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Full Description</h2>
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowPopup(false)}
                >
                  &times;
                </button>
              </div>
              <p className="text-gray-700">{popupDescription}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;
