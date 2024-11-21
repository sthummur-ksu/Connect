import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/urls/urls";

export const sendMessage = async (
  recipientId: number,
  messageContent: string,
  attachment: string | null = null
) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.post(
      `${BASE_URL}/messaging/send/`,
      {
        recipient_id: recipientId,
        message: messageContent,
        attachment,
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
        error.response?.data?.error || "Failed to send message";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const fetchInboxMessages = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.get(`${BASE_URL}/messaging/inbox/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error || "Failed to fetch messages";
      console.log(error);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message || "An unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
