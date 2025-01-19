import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create TaskContext
export const TaskContext = createContext();

const TaskContextProvider = (props) => {
  // Environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State variables for token and tasks
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);

  // React Router's navigate hook
  const navigate = useNavigate();

  // Fetch all tasks
  const getTasks = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/task/list", {
        headers: { token }, // Pass token in request headers
      });
      if (response.data.success) {
        setTasks(response.data.tasks); // Update tasks state
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Handle API error
    }
  };

  // Add a new task
  const addTask = async (title, description) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/task/create",
        { title, description }, // Request body
        { headers: { token } } // Pass token in request headers
      );
      if (response.data.success) {
        toast.success("Task added successfully"); // Success notification
        getTasks(); // Refresh tasks list
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Handle API error
    }
  };

  // Update an existing task
  const updateTask = async (taskId, { title, description, status }) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/task/update/${taskId}`,
        { title, description, status }, // Request body
        { headers: { token } } // Pass token in request headers
      );
      if (response.data.success) {
        toast.success("Task updated successfully"); // Success notification
        getTasks(); // Refresh tasks list
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(error.message); // Handle API error
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        backendUrl + `/api/task/delete/${taskId}`,
        { headers: { token } } // Pass token in request headers
      );
      if (response.data.success) {
        toast.success("Task deleted successfully"); // Success notification
        getTasks(); // Refresh tasks list
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Handle API error
    }
  };

  // Initialize token from localStorage and fetch tasks on component mount
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken); // Set token state
      getTasks(); // Fetch tasks
    }
    if (token) {
      getTasks(); // Fetch tasks if token exists
    }
  }, [token]); // Re-run when token changes

  // Fetch tasks on component mount
  useEffect(() => {
    getTasks();
  }, []);

  // Provide context values to child components
  const value = {
    navigate, // Navigation handler
    backendUrl, // Backend URL
    setToken, // Function to set token
    token, // Current token
    tasks, // Current list of tasks
    addTask, // Function to add a task
    updateTask, // Function to update a task
    deleteTask, // Function to delete a task
  };

  // Wrap children components with TaskContext
  return (
    <TaskContext.Provider value={value}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
