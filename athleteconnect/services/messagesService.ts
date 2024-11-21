import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/urls/urls";

export const sendMessage = async (recipientId: number, messageContent: string, attachment: string | null = null) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
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
    console.error("Failed to send message:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to send message");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const listMessages = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/messaging/inbox/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch messages");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
