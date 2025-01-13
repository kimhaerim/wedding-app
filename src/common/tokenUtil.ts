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
    console.log(tokens);
    if (tokens && tokens.accessToken) {
      return true;
    }
    return false;
  } catch {
    showErrorToast();
    return false;
  }
};
