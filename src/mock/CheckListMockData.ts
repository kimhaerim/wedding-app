import { CheckListStatus, CostType, Gender } from "../enum";
import { ICategory } from "../interface/category.interface";
import { ICheckList, ICheckListTemp, ICost } from "../interface/check-list.interface";
import { ICostsByCategoryId } from "../interface/cost.interface";

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
    category: {
      id: 1,
      title: "웨딩홀",
      budgetAmount: 1000000,
      checkList: [],
    },
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

export const costsMockData: ICost[] = [
  {
    id: 1,
    title: "예약금",
    amount: 100000,
    memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구 어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
    costType: CostType.BASE,
  },
  {
    id: 2,
    title: "예약금1",
    amount: 100000,
    paymentDate: new Date("2024-12-10"),
    costType: CostType.ADDITIONAL,
  },
  {
    id: 3,
    title: "예약금",
    amount: 100000,
    paymentDate: new Date("2024-12-11"),
    costType: CostType.BASE,
  },
];

export const categoryMockData: ICategory[] = [
  {
    id: 1,
    title: "🏩 웨딩홀",
    budgetAmount: 350000000,
    checkList: [
      {
        id: 1,
        description: "보테가마지오",
        isCompleted: true,
        memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구 어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
        reservedDate: new Date("2024-12-01"),
        status: CheckListStatus.CONFIRMED,
        costs: [
          {
            id: 1,
            title: "예약금",
            amount: 100000,
            memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구 어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
            costType: CostType.BASE,
          },
          {
            id: 2,
            title: "예약금1",
            amount: 100000,
            paymentDate: new Date("2024-12-10"),
            costType: CostType.ADDITIONAL,
          },
          {
            id: 3,
            title: "예약금",
            amount: 100000,
            paymentDate: new Date("2024-12-11"),
            costType: CostType.BASE,
          },
        ],
      },
      {
        id: 2,
        description: "사진보라 계약금 결제",
        isCompleted: false,
        memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
        reservedDate: new Date("2024-12-10 12:00"),
        status: CheckListStatus.REJECTED,
        costs: costsMockData,
      },
    ],
  },
  { id: 2, title: "📸 본식DVD", budgetAmount: 0, checkList: [] },
];

export const costsByCategoryIdsMockData: ICostsByCategoryId[] = [
  {
    categoryId: 1,
    costs: {
      totalCost: 1000000,
      paidCost: 500000,
      unpaidCost: 500000,
    },
  },
  {
    categoryId: 2,
    costs: {
      totalCost: 3000000,
      paidCost: 500000,
      unpaidCost: 2500000,
    },
  },
];

export const checkListMockData1: ICheckList[] = [
  {
    id: 1,
    description: "사진보라 예약",
    isCompleted: true,
    memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구 어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
    reservedDate: new Date("2024-12-01"),
    status: CheckListStatus.CONFIRMED,
    costs: costsMockData,
    category: categoryMockData[0],
  },
  {
    id: 2,
    description: "사진보라 계약금 결제",
    isCompleted: false,
    memo: "어쩌구저쩌구 어쩌구 저쩌구 엄청나게 어쩌구 저쩌구 가성비 어쩌구 저쩌구",
    reservedDate: new Date("2024-12-10 12:00"),
    status: CheckListStatus.REJECTED,
    costs: costsMockData,
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

export const userMockData = {
  id: 1,
  email: "wedding@gamil.com",
  name: "김해림",
  birthday: "1998-01-23",
  gender: Gender.FEMALE,
};
