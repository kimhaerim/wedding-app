import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";

import { useLazyQuery, useMutation } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { showErrorToast, showToast } from "../../common/util";
import BottomButton from "../../components/common/BottomButton";
import InputText from "../../components/common/InputText";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { MutationAddCategory, MutationUpdateCategory, QueryGetCategory } from "../../graphql/category";
import { ICategory } from "../../interface/category.interface";
import { CategoryStackParamList } from "../../navigation/interface";

interface EditCategoryScreenProps {
  navigation: StackNavigationProp<CategoryStackParamList, "EditCategory">;
  route: RouteProp<CategoryStackParamList, "EditCategory">;
}

export const EditCategoryScreen: React.FC<EditCategoryScreenProps> = ({ navigation, route }) => {
  const { categoryId, categoryTitle } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: categoryId ? "카테고리 수정" : "카테고리 저장" });
  }, [navigation, categoryId]);

  const [getCategory, { error: categoryError, loading: categoryLoading }] = useLazyQuery<
    { category: ICategory },
    { id: number }
  >(QueryGetCategory);

  const [addCategory, { error: addError }] = useMutation(MutationAddCategory);
  const [updateCategory, { error: updateError }] = useMutation(MutationUpdateCategory);

  const [category, setCategory] = useState<ICategory | undefined>(undefined);

  const [inputTitle, setInputTitle] = useState<string | undefined>(categoryTitle ? categoryTitle : undefined);
  const [inputBudgetAmount, setInputBudgetAmount] = useState<number>(0);

  const isEdit = useMemo(() => (categoryId ? true : false), [categoryId]);

  const getCategoryData = useMemo(() => {
    const data = { title: inputTitle, budgetAmount: inputBudgetAmount };
    if (!isEdit) {
      return data;
    }

    return { id: categoryId, ...data };
  }, [inputTitle, inputBudgetAmount]);

  useEffect(() => {
    console.log("categoryId", categoryId);
    if (!categoryId) {
      return;
    }

    const fetchCategory = async () => {
      if (categoryLoading) {
        return;
      }

      if (categoryError) {
        showToast(categoryError.message, "error");
      }

      const { data } = await getCategory({ variables: { id: categoryId } });
      if (!data) {
        showErrorToast();
        return;
      }

      setCategory(data.category);
    };

    fetchCategory();
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      setInputTitle(category.title);
      setInputBudgetAmount(category.budgetAmount);
    }
  }, [category]);

  const handleBottomButtonPress = useCallback(() => {
    if (isEdit) {
      handleUpdateCategory();
      navigation.navigate("CategoryHome");
      return;
    }

    handleAddCategory();
    navigation.navigate("EditCheckList", { isFromCategory: true });
  }, []);

  const handleUpdateCategory = useCallback(async () => {
    console.log(getCategoryData);
    try {
      await updateCategory({ variables: getCategoryData });

      if (updateError) {
        showToast(updateError.message, "error");
        return;
      }
    } catch (err) {
      showErrorToast();
    }
  }, [getCategoryData]);

  const handleAddCategory = useCallback(async () => {
    console.log(getCategoryData);
    try {
      await addCategory({ variables: getCategoryData });

      if (addError) {
        showToast(addError.message, "error");
        return;
      }
    } catch (err) {
      showErrorToast();
    }
  }, [getCategoryData]);

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
        disabled={inputTitle?.length === 0}
        onPress={handleBottomButtonPress}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};
