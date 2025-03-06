import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/tasks"; // Your Spring Boot backend

export const getTasks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

export const completeTask = async (taskId) => {
  const response = await axios.put(`${API_BASE_URL}/${taskId}`, { completed: true });
  return response.data;
};