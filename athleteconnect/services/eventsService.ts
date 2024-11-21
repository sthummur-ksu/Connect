import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/urls/urls";

/**
 * Joins an event by event ID.
 * @param eventId - The ID of the event to join.
 * @returns A success message or event data if the operation is successful.
 * @throws An error if the request fails.
 */
export const joinEvent = async (eventId: string) => {
  try {
    // Retrieve the access token
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    // Make the POST request to join the event
    const response = await axios.post(
      `${BASE_URL}/events/${eventId}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to join event:", error);

    if (error instanceof Error) {
      throw new Error(error.message || "Failed to join event");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

/**
 * Leaves an event by event ID.
 * @param eventId - The ID of the event to leave.
 * @returns A success message or event data if the operation is successful.
 * @throws An error if the request fails.
 */
export const leaveEvent = async (eventId: string) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.delete(`${BASE_URL}/events/${eventId}/leave`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to leave event:", error);

    if (error instanceof Error) {
      throw new Error(error.message || "Failed to leave event");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

/**
 * Fetches the list of events associated with the authenticated user.
 * @returns A list of events.
 * @throws An error if the request fails.
 */
export const fetchMyEvents = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("User is not authenticated");
    }
    const response = await axios.get(`${BASE_URL}/events/my-events`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch events:", error);

    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch events");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
/**
 * Creates a new event.
 * @param eventData Object containing event details.
 * @returns The created event's data.
 * @throws An error if the creation fails.
 */
export const createEvent = async (eventData: {
  title: string;
  description: string;
  eventdate: string;
  location: string;
  google_meet_url: string;
}) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.post(`${BASE_URL}/events/create/`, eventData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to create event:", error);

    if (axios.isAxiosError(error)) {
      console.error("Error details:", error.response?.data);  
      throw new Error(error.response?.data?.message || "Event creation failed");
    } else {
      throw new Error(error.message || "An unknown error occurred");
    }
  }
};

/**
 * Fetches all available events.
 * @returns A list of all events.
 * @throws An error if the request fails.
 */
export const fetchAllEvents = async () => {
  try {
    // Retrieve the access token
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    // Make the GET request to fetch all events
    const response = await axios.get(`${BASE_URL}/events/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch all events:", error);

    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch all events");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

