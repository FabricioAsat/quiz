import axios, { AxiosError } from "axios";

export async function registerUser(user: TUser) {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}`, user);
    return {
      message: data.message,
      data: data.data || null,
      status: true,
    };
  } catch (err) {
    const axiosError = err as AxiosError;
    if (
      axiosError.response &&
      "data" in axiosError.response &&
      typeof axiosError.response.data === "object" &&
      axiosError.response.data !== null &&
      "error" in axiosError.response.data
    ) {
      return {
        message: String(axiosError.response.data.error),
        data: null,
        status: false,
      };
    }
    return { message: "Unknown error", data: null, status: false };
  }
}
