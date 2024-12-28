import { DataTable, Divider, Drawer, Icon, Text } from "react-native-paper";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import { ICheckListTemp } from "../../interface/check-list.interface";
import { CheckListStatus, Color } from "../../enum";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Row from "../../components/Row";
import { ICouple } from "../../interface/couple.interface";
import dayjs from "dayjs";
import React, { useState } from "react";
import CheckBox from "../../components/CheckBox";
import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { checkListMockData, coupleMockData, userCategoriesMockData } from "../../mock/CheckListMockData";
import CustomMenu from "../../components/common/Menu";
import ConfirmModal from "../../modal/ConfirmModal";
import FloatingButton from "../../components/FloatingButton";
import CheckListItem from "../../components/FlatList";

const CheckLists = () => {
  const today = dayjs();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const [checkListId, setCheckListId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [checkLists, setCheckLists] = useState<ICheckListTemp[]>(checkListMockData);
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [userCategories, setUserCategories] = useState<{ id: number; category: string }[]>(userCategoriesMockData);
  const [removeModalVisible, setRemoveModalVisible] = useState<boolean>(false);

  const convertDateToString = (inputDate: Date) => {
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();
    return `${year}년 ${month}월 ${date}일`;
  };

  const calculateDday = (date: Date) => {
    const targetDate = dayjs(date);
    const daysFromStart = today.diff(targetDate, "day");
    return daysFromStart;
  };

  const handleMenuButtonPress = (id: number | undefined) => {
    setCheckListId(id);
  };

  const handleMenuItemPress = (action: string, id: number) => {
    switch (action) {
      case "view":
        console.log("상세 보기", id);
        break;
      case "edit":
        console.log("수정", id);
        break;
      case "delete":
        console.log("삭제", id);
        setRemoveModalVisible(true);
        setCheckListId(undefined);
        break;
      default:
        break;
    }
  };

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);

    // 추가 호출 API
    const newCheckLists: ICheckListTemp[] = [];

    if (newCheckLists.length > 0) {
      setCheckLists((prevLists) => [...prevLists, ...newCheckLists]);
    }

    if (newCheckLists.length <= 10) {
      setPage(-1);
    }
  };

  return (
    <CenteredSafeArea>
      <View style={{ margin: 20, marginBottom: 0 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center", marginBottom: 20 }}>체크리스트</Text>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {couple.weddingDate ? (
            <>
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 5 }}>
                <Text style={{ marginRight: 10 }}>결혼식까지</Text>
                <Text>D{calculateDday(couple.weddingDate)}</Text>
              </View>
              <Text>{convertDateToString(couple.weddingDate)} </Text>
            </>
          ) : (
            <TouchableOpacity style={{ backgroundColor: Color.BLUE200, padding: 15, borderRadius: 20 }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>결혼 예정일 등록하기</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView horizontal={true} style={styles.scrollView}>
          {userCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: category.id === selectedCategory ? Color.BLUE : Color.BLUE100,
                  paddingHorizontal: category.category.length > 3 ? 15 : 10,
                },
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={{ color: category.id === selectedCategory ? Color.WHITE : Color.BLACK }}>
                {category.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Divider />
      </View>

      <View style={{ backgroundColor: "#EFF8FB", height: "100%" }}>
        <FlatList
          data={checkLists}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <CheckListItem
              item={item}
              checkListId={checkListId}
              onMenuButtonPress={handleMenuButtonPress}
              onMenuItemPress={handleMenuItemPress}
            />
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        />
      </View>

      <ConfirmModal
        title="체크리스트를 정말 삭제하시겠습니까?"
        description="비용 정보도 모두 삭제됩니다."
        visible={removeModalVisible}
        hideModal={() => setRemoveModalVisible(false)}
      ></ConfirmModal>

      <FloatingButton onPress={() => console.log()}></FloatingButton>
    </CenteredSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
  },
  categoryButton: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
  },
  label: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    width: "50%",
  },
  borderBottom: {
    width: "50%",
    borderBottomWidth: 2,
  },
});

export default CheckLists;
