import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/urls/urls";

export const fetchBooks = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/resources/books/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch books");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const fetchArticles = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/resources/articles/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch articles");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const fetchCases = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/resources/cases/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch cases:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch cases");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const fetchDoDonts = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/resources/dodonts/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch do's and don'ts:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch do's and don'ts");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const fetchContractPapers = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/resources/contractpapers/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch contract papers:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch contract papers");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const fetchNegotiationFAQs = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/resources/faqs/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch negotiation FAQs:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch negotiation FAQs");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
