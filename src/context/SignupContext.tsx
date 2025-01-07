import { createContext, ReactNode, useContext, useState } from "react";
import { Gender } from "../enum";
import { ISignup } from "../interface";

interface SignupContextType {
  signupData: ISignup;
  updateSignupData: (field: keyof ISignup, value: ISignup[keyof ISignup]) => void;
}

const SignupContext = createContext<SignupContextType | null>(null);

export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};

interface SignupProviderProps {
  children: ReactNode;
}

export const SignupProvider: React.FC<SignupProviderProps> = ({ children }) => {
  const [signupData, setSignupData] = useState<ISignup>({
    email: "",
    password: "",
    name: "",
    birthday: undefined,
    gender: Gender.FEMALE,
    coupleId: undefined,
    weddingDate: undefined,
    coupleStartDate: undefined,
  });

  const updateSignupData = (field: keyof ISignup, value: ISignup[keyof ISignup]) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
  };

  return <SignupContext.Provider value={{ signupData, updateSignupData }}>{children}</SignupContext.Provider>;
};
