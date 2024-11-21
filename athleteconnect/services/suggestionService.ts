import axios from "axios";
import { BASE_URL } from "@/urls/urls";

export const fetchSuggestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/suggestions/suggestions/`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch suggestions");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const createSuggestion = async (title: string, description: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/suggestions/suggestions/`, {
      title,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create suggestion:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to create suggestion");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
