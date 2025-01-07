import { useMutation } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { showErrorToast, showToast } from "../../common/util";
import CategoryButton from "../../components/category/CategoryButton";
import BottomButton from "../../components/common/BottomButton";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { MutationAddCategories } from "../../graphql/category";
import { RootStackParamList } from "../../navigation/interface";

interface DefaultCategoriesProps {
  navigation: StackNavigationProp<RootStackParamList, "DefaultCategories">;
  route: RouteProp<RootStackParamList, "DefaultCategories">;
}

export const DefaultCategoriesScreen: React.FC<DefaultCategoriesProps> = ({ navigation }) => {
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

  const [addCategories, { error }] = useMutation(MutationAddCategories);
  const [userCategories, setUserCategories] = useState<string[]>([]);

  const handleUserCategories = useCallback((category: string) => {
    setUserCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((item) => item !== category);
      }
      return [...prevCategories, category];
    });
  }, []);

  const handleAddCategories = useCallback(async () => {
    if (userCategories.length === 0) {
      return;
    }

    const addCategoriesData = userCategories.map((category) => ({ title: category }));
    try {
      await addCategories({ variables: { categories: addCategoriesData } });
      if (error) {
        showToast(error.message, "error");
        return;
      }
    } catch (err) {
      showErrorToast();
    }

    navigation.navigate("ConfirmSignup");
  }, [userCategories]);

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>관심있는</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>기본 카테고리를 설정해보세요.</Text>
        <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 20 }}>카테고리는 나중에 다시 수정할 수 있어요!</Text>

        <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap" }}>
          {defaultCategories.map((category) => (
            <CategoryButton
              key={category}
              label={category}
              isPressed={userCategories.includes(category)}
              onPress={() => handleUserCategories(category)}
            ></CategoryButton>
          ))}
        </View>
      </View>

      <BottomButton
        label={userCategories.length > 0 ? "다음" : "다음에 설정하기"}
        disabled={false}
        onPress={handleAddCategories}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};
