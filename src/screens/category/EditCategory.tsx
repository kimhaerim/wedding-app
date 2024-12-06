import { useState } from "react";

import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import ActiveButton from "../../components/ActiveButton";
import { IAddCategory, IUpdateCategory } from "../../interface/category.interface";
import TextInputGroup from "../../components/TextInputGroup";

const EditCategory = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<IAddCategory | IUpdateCategory | undefined>(undefined);

  const [inputTitle, setInputTitle] = useState<string>(category?.title ?? "");
  const [inputAmountBudget, setInputAmountBudget] = useState<number>(category?.budgetAmount ?? 0);

  return (
    <CenteredSafeArea>
      <BackButton
        title={isEdit ? "카테고리 수정" : "카테고리 추가"}
        onPress={() => console.log("뒤로 가기")}
      ></BackButton>

      <TextInputGroup
        title={"이름"}
        value={category ? category.title : ""}
        defaultValue={category ? category.title : undefined}
        onChangeText={setInputTitle}
        isValid={inputTitle.length > 0}
        errorMessage="이름을 입력하세요."
      />
      <TextInputGroup
        title={"예산 설정"}
        value={category ? category.budgetAmount : 0}
        onChangeText={(value) => setInputAmountBudget(+value)}
        defaultValue={category ? `${category.budgetAmount}` : "0"}
        isValid={typeof inputAmountBudget === "number"}
        errorMessage="카테고리 예산은 숫자로 입력하세요."
        isNumber
      />

      <ActiveButton
        title={isEdit ? "수정" : "추가"}
        onPress={() => console.log(inputTitle, inputAmountBudget)}
      ></ActiveButton>
    </CenteredSafeArea>
  );
};

export default EditCategory;
