import { useCallback, useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { formatCurrency } from "../../common/util";
import CategoryButton from "../../components/category/CategoryButton";
import FloatingButton from "../../components/common/FloatingButton";
import ShadowView from "../../components/common/ShadowView";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { QueryGetCategories } from "../../graphql/category";
import { ICategory, IGetCategoryVariables } from "../../interface/category.interface";
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

const LIMIT = 10;
export const CategoryListsScreen: React.FC<CategoryListsScreenProps> = ({ navigation }) => {
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [userDefaultCategories, setUserDefaultCategories] = useState<string[]>([]);
  const [userCategories, setUserCategories] = useState<ICategory[]>([]);

  const { data: categories, loading } = useQuery<{ categories: ICategory[] }, IGetCategoryVariables>(
    QueryGetCategories,
    {
      variables: { offset: page * LIMIT, limit: LIMIT },
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (page === 0) {
          setUserCategories(data.categories);
        } else if (page > 0) {
          setUserCategories((prev) => [...prev, ...data.categories]);
        }

        if (data.categories.length >= LIMIT) {
          setHasMore(true);
        } else if (data.categories.length < LIMIT) {
          setHasMore(false);
        }
      },
    }
  );

  useEffect(() => {
    const result = defaultCategories.filter(
      (category) => !categories?.categories.map((userCategory) => userCategory.title).includes(category)
    );

    setUserDefaultCategories(result);
  }, [categories]);

  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) {
      return;
    }

    setPage((prevPage) => prevPage + 1);
  }, [loading, hasMore]);

  useFocusEffect(
    useCallback(() => {
      setPage(0);
    }, [])
  );

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
    [categories]
  );

  const handleDefaultCategoryOnPress = useCallback(
    (category: string) => {
      navigation.navigate("EditCategory", { categoryTitle: category });
    },
    [navigation]
  );

  return (
    <WhiteSafeAreaView>
      {userDefaultCategories.length > 0 && (
        <View style={{ margin: 10 }}>
          <Text style={[styles.title]}>기본 카테고리 목록</Text>
          <Text style={{ fontSize: 12, marginTop: 10 }}>클릭 시 저장 가능합니다.</Text>

          <View style={[styles.defaultCategoryContainer]}>
            {userDefaultCategories.map((category) => (
              <CategoryButton
                key={category}
                isPressed={true}
                onPress={() => handleDefaultCategoryOnPress(category)}
                label={category}
              ></CategoryButton>
            ))}
          </View>
        </View>
      )}

      <Divider style={{ marginTop: 10 }} />

      <View style={{ flex: 1, margin: 10 }}>
        <Text style={[styles.title]}>저장된 카테고리 목록</Text>

        <FlatList
          data={userCategories}
          keyExtractor={(item) => `category-${item.id}`}
          renderItem={({ item }) => renderItem(item)}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        />
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
