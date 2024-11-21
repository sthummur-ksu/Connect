import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/urls/urls";

export const createRating = async (
  reviewedUserId: number,
  rating: number,
  review: string = ""
) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.post(
      `${BASE_URL}/ratings/create/`,
      {
        reviewed_user_id: reviewedUserId,
        rating,
        review,
      },
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
        error.response?.data?.error || "Failed to create rating";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const fetchRatings = async (userId: number) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${BASE_URL}/ratings/user/${userId}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error || "Failed to fetch ratings";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
