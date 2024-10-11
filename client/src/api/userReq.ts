import axios, { AxiosError } from "axios";

export async function registerUser(user: TUser): Promise<TApiResponse> {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL_REGISTER}`, user);
    return {
      message: data.message,
      data: data.data,
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

export async function loginUser(user: TUser): Promise<TApiResponse> {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL_LOGIN}`, user);
    console.log(data);
    return {
      message: data.message,
      data: data.data,
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

export async function getActiveUsers(): Promise<TApiResponse> {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL_ACTIVE_USERS}`);
    return {
      message: data.message,
      data: data.data,
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
