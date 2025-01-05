import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";

import BackButton from "../../components/common/BackButton";
import { IAddCategory, IUpdateCategory } from "../../interface/category.interface";
import { SafeAreaView, View } from "react-native";
import InputText from "../../components/common/InputText";
import BottomButton from "../../components/common/BottomButton";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { StackNavigationProp } from "@react-navigation/stack";
import { CategoryStackParamList } from "../../navigation/types";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

interface EditCategoryScreenProps {
  navigation: StackNavigationProp<CategoryStackParamList, "EditCategory">;
  route: RouteProp<CategoryStackParamList, "EditCategory">;
}

const EditCategoryScreen: React.FC<EditCategoryScreenProps> = ({ navigation, route }) => {
  const { categoryId, categoryTitle } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: categoryId ? "카테고리 수정" : "카테고리 저장" });
  }, [navigation, categoryId]);

  const isEdit = categoryId ? true : false;
  const [category, setCategory] = useState<IAddCategory | IUpdateCategory | undefined>(undefined);

  const [inputTitle, setInputTitle] = useState<string>(category ? category.title : categoryTitle ? categoryTitle : "");
  const [inputAmountBudget, setInputAmountBudget] = useState<number>(category ? category.budgetAmount : 0);

  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [exitAction, setExitAction] = useState<(() => void) | null>(null);

  const handleBottomButtonPress = () => {
    if (isEdit) {
      // API 호출 후 카테고리 리스트 목록으로 이동
      navigation.popToTop();
      return;
    }

    // 저장 API 호출
    navigation.navigate("EditCheckList", { isFromCategory: true });
  };

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 20 }}>
        <InputText
          label={"카테고리 이름 *"}
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={inputTitle}
          defaultValue={category ? category.title : categoryTitle ? categoryTitle : undefined}
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
          titleStyle={{ marginTop: 5 }}
        ></InputText>
      </View>

      <BottomButton
        label={isEdit ? "수정" : "다음"}
        disabled={inputTitle.length === 0}
        onPress={handleBottomButtonPress}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};

export default EditCategoryScreen;
