import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/urls/urls";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  role: string = "athlete"
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register/`, {
      username,
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Registration failed");
    } else {
      throw new Error("An unknown error occurre");
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login/`, {
      email,
      password,
    });
    const { access, refresh, role } = response.data;

    await AsyncStorage.setItem("accessToken", access);
    await AsyncStorage.setItem("refreshToken", refresh);
    await AsyncStorage.setItem("userRole", role);

    return role;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message || "Login failed");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const fetchProfile = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get(`${BASE_URL}/auth/profile/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch profile");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const logoutUser = async () => {
  try {
    // const accessToken = await AsyncStorage.getItem("accessToken");
    // if (accessToken) {
    //   await axios.post(
    //     `${BASE_URL}/auth/logout/`,
    //     {},
    //     { headers: { Authorization: `Bearer ${accessToken}` } }
    //   );
    // }
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userRole");
  } catch (error) {
    console.error("Failed to log out:", error);
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.put(
      `${BASE_URL}/auth/profile/`,
      profileData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update profile");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
