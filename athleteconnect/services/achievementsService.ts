import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/urls/urls";

export const fetchAchievements = async (userId: number | null = null) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    let url = `${BASE_URL}/achievements/achievements/`;
    if (userId) {
      url = `${BASE_URL}/achievements/achievements/${userId}/`; 
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to fetch achievements";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const addAchievement = async (achievementText: string) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.post(
      `${BASE_URL}/achievements/achievements/`,
      { achievement: achievementText },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to add achievement";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const fetchVideoHighlights = async (userId: number | null = null) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    let url = `${BASE_URL}/achievements/highlights/`;
    if (userId) {
      url = `${BASE_URL}/achievements/highlights/${userId}/`; 
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to fetch video highlights";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const addVideoHighlight = async (videoUrl: string) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.post(
      `${BASE_URL}/achievements/highlights/`,
      { video_url: videoUrl },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to upload video highlight";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
