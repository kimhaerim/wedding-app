import { useState } from "react";

import BackButton from "../../components/common/BackButton";
import { IAddCategory, IUpdateCategory } from "../../interface/category.interface";
import { SafeAreaView, View } from "react-native";
import InputText from "../../components/common/InputText";
import BottomButton from "../../components/common/BottomButton";

const EditCategoryScreen = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<IAddCategory | IUpdateCategory | undefined>(undefined);

  const [inputTitle, setInputTitle] = useState<string>(category ? category.title : "");
  const [inputAmountBudget, setInputAmountBudget] = useState<number>(category ? category.budgetAmount : 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackButton
        label={isEdit ? "카테고리 수정" : "카테고리 추가"}
        onPress={() => console.log("뒤로 가기")}
      ></BackButton>

      <View style={{ margin: 20 }}>
        <InputText
          label={"카테고리 이름 *"}
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={inputTitle}
          defaultValue={category ? category.title : undefined}
          onChangeText={setInputTitle}
          error={inputTitle.length === 0}
          errorMessage="이름을 입력하세요."
        ></InputText>
        <InputText
          label={"예산 설정"}
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={inputAmountBudget}
          defaultValue={category ? category.budgetAmount : 0}
          onChangeText={(value) => setInputAmountBudget(+value)}
          error={typeof inputAmountBudget !== "number"}
          errorMessage="카테고리 예산은 숫자로 입력하세요."
        ></InputText>
      </View>

      <BottomButton
        label={isEdit ? "수정" : "다음"}
        disabled={inputTitle.length === 0}
        onPress={() => console.log(inputTitle, inputAmountBudget)}
      ></BottomButton>
    </SafeAreaView>
  );
};

export default EditCategoryScreen;
