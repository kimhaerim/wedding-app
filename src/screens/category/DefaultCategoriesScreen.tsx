import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CategoryButton from "../../components/category/CategoryButton";
import BottomButton from "../../components/common/BottomButton";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { RootStackParamList } from "../../navigation/types";

interface DefaultCategoriesProps {
  navigation: StackNavigationProp<RootStackParamList, "DefaultCategories">;
  route: RouteProp<RootStackParamList, "DefaultCategories">;
}

const DefaultCategoriesScreen: React.FC<DefaultCategoriesProps> = ({ navigation }) => {
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

  const [userCategories, setUserCategories] = useState<string[]>([]);

  const handleUserCategories = useCallback((category: string) => {
    setUserCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((item) => item !== category);
      }
      return [...prevCategories, category];
    });
  }, []);

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
        onPress={() => navigation.navigate("ConfirmSignup")}
      ></BottomButton>
    </WhiteSafeAreaView>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
});

export default DefaultCategoriesScreen;
