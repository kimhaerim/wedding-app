import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { showErrorToast, showToast } from "../../common/util";
import BottomButton from "../../components/common/BottomButton";
import InputText from "../../components/common/InputText";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { MutationAddCategory, MutationUpdateCategory, QueryGetCategory } from "../../graphql/category";
import { useApiMutation } from "../../hooks/useGql";
import { IAddCategory, ICategory, IUpdateCategory } from "../../interface/category.interface";
import { BudgetStackParamList } from "../../navigation/interface/BudgetStackParamList";

interface EditCategoryScreenProps {
  navigation: StackNavigationProp<BudgetStackParamList, "EditCategory">;
  route: RouteProp<BudgetStackParamList, "EditCategory">;
}

export const EditCategoryScreen: React.FC<EditCategoryScreenProps> = ({ navigation, route }) => {
  const { categoryId, categoryTitle, fromNavigator } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: categoryId ? "카테고리 수정" : "카테고리 저장" });
  }, [navigation, categoryId]);

  const [getCategory, { loading: categoryLoading }] = useLazyQuery<{ category: ICategory }, { id: number }>(
    QueryGetCategory,
    { fetchPolicy: "network-only", onCompleted: ({ category }) => setCategory(category) }
  );

  const { mutate: addCategory } = useApiMutation<{ addCategory: number }, IAddCategory>(MutationAddCategory);
  const { mutate: updateCategory } = useApiMutation<{ updateCategory: boolean }, IUpdateCategory>(
    MutationUpdateCategory
  );

  const [category, setCategory] = useState<ICategory | undefined>(undefined);
  const [inputTitle, setInputTitle] = useState<string>(categoryTitle ? categoryTitle : "");
  const [inputBudgetAmount, setInputBudgetAmount] = useState<number>(0);

  const isEdit = useMemo(() => (categoryId ? true : false), [categoryId]);

  const getCategoryData = useMemo(
    () => ({ title: inputTitle, budgetAmount: inputBudgetAmount }),
    [inputTitle, inputBudgetAmount]
  );

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    getCategory({ variables: { id: categoryId } });
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      setInputTitle(category.title);
      setInputBudgetAmount(category.budgetAmount);
    }
  }, [category]);

  const handleAddCategory = useCallback(async () => {
    if (!getCategoryData.title) {
      showToast("이름은 필수입니다.", "info");
      return;
    }

    try {
      const { data: addResult } = await addCategory({ variables: getCategoryData });
      if (!addResult) {
        showErrorToast();
        return;
      }

      return addResult.addCategory;
    } catch {
      showErrorToast();
    }
  }, [getCategoryData]);

  const handleUpdateCategory = useCallback(async () => {
    if (!categoryId) {
      showErrorToast();
      return;
    }

    try {
      await updateCategory({ variables: { ...getCategoryData, id: categoryId } });
    } catch {
      showErrorToast();
    }
  }, [getCategoryData]);

  const handleEditCategory = useCallback(async () => {
    if (!inputTitle) {
      showToast("이름은 필수 입니다.", "info");
    }

    if (isEdit && categoryId) {
      await handleUpdateCategory();
      navigation.pop();
      return;
    }

    const newCategoryId = await handleAddCategory();
    if (!newCategoryId) {
      navigation.replace("BudgetHome");
      return;
    }

    navigation.replace("EditCheckList", { categoryId: newCategoryId, isFromCategory: true, fromNavigator });
  }, [navigation, getCategoryData]);

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 20 }}>
        <InputText
          label={"카테고리 이름 *"}
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={inputTitle}
          defaultValue={category ? category.title : categoryTitle ? categoryTitle : undefined}
          onChangeText={setInputTitle}
          error={inputTitle?.length === 0}
          errorMessage="이름을 입력하세요."
        ></InputText>
        <InputText
          label={"예산 설정"}
          placeholder="ex. 웨딩홀, 본식DVD 등"
          value={inputBudgetAmount}
          defaultValue={category ? category.budgetAmount : 0}
          onChangeText={(value) => setInputBudgetAmount(+value)}
          error={typeof inputBudgetAmount !== "number"}
          errorMessage="카테고리 예산은 숫자로 입력하세요."
          titleStyle={{ marginTop: 5 }}
        ></InputText>
      </View>

      <BottomButton
        label={isEdit ? "수정" : "다음"}
        disabled={inputTitle?.length === 0 || categoryLoading}
        onPress={handleEditCategory}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};
