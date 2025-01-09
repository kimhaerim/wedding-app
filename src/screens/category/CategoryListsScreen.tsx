import { useCallback, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { formatCurrency, showErrorToast, showToast } from "../../common/util";
import CategoryButton from "../../components/category/CategoryButton";
import FloatingButton from "../../components/common/FloatingButton";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { QueryGetCategories } from "../../graphql/category";
import { ICategory } from "../../interface/category.interface";
import { CategoryStackParamList } from "../../navigation/interface";

const defaultCategories = [
  "🏩 웨딩홀",
  "📸 스튜디오",
  "👗 드레스",
  "💍 예물",
  "🕴 신랑 예복",
  "✈️ 신혼 여행",
  "💄 메이크업",
  "🌅 스냅 촬영",
];

interface CategoryListsScreenProps {
  navigation: StackNavigationProp<CategoryStackParamList, "CategoryHome">;
  route: RouteProp<CategoryStackParamList, "CategoryHome">;
}

export const CategoryListsScreen: React.FC<CategoryListsScreenProps> = ({ navigation }) => {
  const {
    data: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery<{ categories: ICategory[] }>(QueryGetCategories, { fetchPolicy: "network-only" });

  const [userCategories, setUserCategories] = useState<ICategory[]>([]);

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (categoryLoading) {
      return;
    }

    if (categoryError) {
      showToast(categoryError.message, "error");
    }
    if (!categories) {
      showErrorToast();

      return;
    }

    setUserCategories(categories.categories);
  }, [categoryError, categories]);

  const renderItem = useCallback(
    (item: ICategory) => {
      return (
        <ShadowView key={item.id}>
          <TouchableOpacity onPress={() => navigation.navigate("CategoryDetail", { categoryId: item.id })}>
            <View key={item.id} style={[styles.userCategoryContainer]}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </View>
            <Text style={{ marginBottom: 5 }}>예산 : {formatCurrency(item.budgetAmount)}</Text>
            <Text>연결된 체크리스트 : 2개</Text>
          </TouchableOpacity>
        </ShadowView>
      );
    },
    [userCategories]
  );

  const handleDefaultCategoryOnPress = useCallback(
    (category: string) => {
      navigation.navigate("EditCategory", { categoryTitle: category });
    },
    [navigation]
  );

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);

    // 추가 호출 API
    const newCategories: ICategory[] = [];

    if (newCategories.length > 0) {
      // setCosts((prevLists) => [...prevLists, ...newCheckLists]);
    }

    if (newCategories.length <= 10) {
      setPage(-1);
    }
  };

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 10 }}>
        <Text style={[styles.title]}>기본 카테고리 목록</Text>
        <Text style={{ fontSize: 12, marginTop: 10 }}>클릭 시 추가 가능합니다.</Text>

        <View style={[styles.defaultCategoryContainer]}>
          {defaultCategories.map((category) => (
            <CategoryButton
              key={category}
              isPressed={true}
              onPress={() => handleDefaultCategoryOnPress(category)}
              label={category}
            ></CategoryButton>
          ))}
        </View>

        <Divider style={{ marginTop: 10 }} />

        <Text style={[styles.title]}>추가된 카테고리 목록</Text>

        <View>
          <FlatList
            data={userCategories}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => renderItem(item)}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>

      <FloatingButton onPress={() => navigation.navigate("EditCategory", {})} />
    </WhiteSafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  defaultCategoryContainer: { marginTop: 10, flexDirection: "row", flexWrap: "wrap" },
  userCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  categoryTitle: { fontWeight: "bold", fontSize: 15 },
});
