import axios from "axios";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const API_URL = "http://localhost:5000/api/auth";

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Unexpected error during registration");
  }
};

export const login = async (formData: LoginFormData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Unexpected error during login");
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token not found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};
