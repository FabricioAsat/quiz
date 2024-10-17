import axios, { AxiosError } from "axios";

export async function postChallengeTo(fromUserID: string, toUserID: string): Promise<TApiResponse> {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL_CHALLENGE}`, {
      fromUserID: fromUserID,
      toUserID: toUserID,
    });
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

export async function postChallengeToResponse(
  fromUserID: string,
  toUserID: string,
  accepted: boolean
): Promise<TApiResponse> {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL_CHALLENGE_RESPONSE}`, {
      fromUserID: fromUserID,
      toUserID: toUserID,
      accepted: accepted,
    });
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

export async function postStartQuiz(gameId: string, players: string[]): Promise<TApiResponse> {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL_START_QUIZ}`, {
      gameId,
      players,
    });
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

export async function postNextQuestion(gameId: string, playerId: string, questionIndex: number): Promise<TApiResponse> {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL_NEXT_QUESTION}`, {
      gameId,
      playerId,
      questionIndex,
    });
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
