import { CheckListStatus } from "../enum";
import { ICheckListTemp } from "../interface/check-list.interface";
import { ICouple } from "../interface/couple.interface";

export const checkListMockData: ICheckListTemp[] = [
  {
    id: 1,
    description: "사진보라 예약",
    isCompleted: true,
    memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구 어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
    reservedDate: "2024-12-01",
    reservedTime: "12:00",
    status: CheckListStatus.CONFIRMED,
  },
  {
    id: 2,
    description: "사진보라 계약금 결제",
    isCompleted: false,
    memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
    reservedDate: "2024-12-10",
    reservedTime: "12:00",
    status: CheckListStatus.REJECTED,
  },
];

export const coupleMockData: ICouple = {
  id: 1,
  weddingDate: new Date("2025-10-26 15:30"),
  coupleStartDate: new Date("2019-01-18 00:00"),
};

export const userCategoriesMockData: { id: number; category: string }[] = [
  {
    id: 0,
    category: "전체",
  },
  {
    id: 1,
    category: "🏩 웨딩홀",
  },
  {
    id: 2,
    category: "📸 스튜디오",
  },
  {
    id: 3,
    category: "💍 예물",
  },
  {
    id: 4,
    category: "✈️ 신혼 여행",
  },
  {
    id: 5,
    category: "📸 스튜디오",
  },
  {
    id: 6,
    category: "✈️ 신혼 여행",
  },
  {
    id: 7,
    category: "📸 스튜디오",
  },
  {
    id: 8,
    category: "💍 예물",
  },
];
