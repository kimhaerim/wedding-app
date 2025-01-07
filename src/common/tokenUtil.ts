import AsyncStorage from "@react-native-async-storage/async-storage";
import { showErrorToast } from "./util";

export const setTokens = (accessToken: string, refreshToken: string) => {
  try {
    AsyncStorage.setItem("tokens", JSON.stringify({ accessToken, refreshToken }));
  } catch {
    showErrorToast();
  }
};

export const getTokens = async () => {
  try {
    const tokens = await AsyncStorage.getItem("tokens");
    if (tokens !== null) {
      return JSON.parse(tokens);
    } else {
      return null;
    }
  } catch {
    showErrorToast();
    return null;
  }
};

export const isLoggedIn = async () => {
  try {
    const tokens = await getTokens();
    if (tokens && tokens.accessToken) {
      // accessToken이 존재하면 로그인 상태
      return true;
    }
    return false; // accessToken이 없으면 비로그인 상태
  } catch {
    showErrorToast();
    return false; // 에러 발생 시 안전하게 false 반환
  }
};
