import dayjs from "dayjs";
import { CheckListStatus, CostType } from "../enum";

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, errorMessage: "유효한 이메일을 입력하세요." };
  }

  return { isValid: true, errorMessage: "" };
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,20}$/;
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      errorMessage: "비밀번호는 8자 이상 20자 이하이고, 알파벳, 숫자, 특수문자를 포함해야 합니다.",
    };
  }

  return { isValid: true, errorMessage: "" };
};

export const convertDateToString = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();
  return `${year}년 ${month}월 ${date}일`;
};

export const convertDateTimeToString = (inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();
  const hour = inputDate.getHours();
  const minute = inputDate.getMinutes();
  return `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분`;
};

export const convertCheckListStatus = (status: CheckListStatus) => {
  switch (status) {
    case CheckListStatus.PENDING:
      return "보류";
    case CheckListStatus.CONFIRMED:
      return "✔️ 확정";
    case CheckListStatus.REJECTED:
      return "❌ 탈락";
  }
};

export const convertCostType = (costType: CostType) => {
  switch (costType) {
    case CostType.BASE:
      return "기본금";
    case CostType.ADDITIONAL:
      return "✚ 추가금";
  }
};

export const formatCurrency = (amount: number) => {
  return `${new Intl.NumberFormat("ko-KR").format(amount)}원`;
};

export const calculateDday = (date: Date, today: dayjs.Dayjs) => {
  const targetDate = dayjs(date);
  const daysFromStart = today.diff(targetDate, "day");
  return daysFromStart;
};
