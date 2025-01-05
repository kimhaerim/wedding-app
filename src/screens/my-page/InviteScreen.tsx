import { StyleSheet, View } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { useLayoutEffect, useState } from "react";
import { Text } from "react-native-paper";
import { calculateDday } from "../../common/util";
import Button from "../../components/common/Button";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { Color, Gender } from "../../enum";
import { ICouple, IUser } from "../../interface";
import { coupleMockData, userWithPartnerMockData } from "../../mock/CheckListMockData";
import { MyPageStackParamList } from "../../navigation/interface";

interface InviteScreenProps {
  navigation: StackNavigationProp<MyPageStackParamList, "Invite">;
  route: RouteProp<MyPageStackParamList, "Invite">;
}

const InviteScreen: React.FC<InviteScreenProps> = ({ navigation }) => {
  const today = dayjs();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: user.partner ? "커플 정보" : "연동하기" });
  }, [navigation]);

  const [user, setUser] = useState<IUser>(userWithPartnerMockData);
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [unLinkConfirmModalVisible, setUnLinkConfirmModalVisible] = useState<boolean>(false);

  return (
    <WhiteSafeAreaView>
      <View style={styles.row}>
        <View style={styles.userContainer}>
          <View style={styles.genderContainer}>
            <Text style={styles.icon}>{user.gender === Gender.FEMALE ? "🙍‍♀️" : "🙍‍♂️"}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <Text style={styles.heart}>💕</Text>
        <View style={styles.userContainer}>
          <View style={styles.genderContainer}>
            {user.partner && <Text style={styles.icon}>{user.partner.gender === Gender.FEMALE ? "🙍‍♀️" : "🙍‍♂️"}</Text>}
          </View>
          <Text style={styles.name}>{user.partner ? user.partner?.name : "연결 전"}</Text>
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center", margin: 30 }}>
        {user.partner ? (
          <>
            <View style={[styles.profileContainer]}>
              <View>
                <Text style={[styles.text]}>
                  우리가 함께한 시간 D+{couple.coupleStartDate ? calculateDday(couple.coupleStartDate, today) : "???"}{" "}
                  💕
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                <Text style={[styles.text]}>
                  결혼식까지 D{couple.weddingDate ? calculateDday(couple.weddingDate, today) : "-???"} 🏩
                </Text>
              </View>
            </View>
            <Button style={{ width: 200 }} onPress={() => setUnLinkConfirmModalVisible(true)}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>연동 해제 하기</Text>
            </Button>
          </>
        ) : (
          <>
            <Button
              onPress={() => console.log("카카오로 초대하기")}
              style={{
                width: "80%",
                borderRadius: 12,
                marginBottom: 10,
                marginTop: 20,
                backgroundColor: Color.KAKAO,
              }}
            >
              <Text style={{ color: "#191919", fontWeight: "bold" }}>카카오로 초대하기</Text>
            </Button>
            <Button
              onPress={() => console.log("초대 링크 복사")}
              style={{
                backgroundColor: Color.WHITE,
                width: "80%",
                borderRadius: 12,
                marginBottom: 20,
                borderColor: Color.BLUE200,
                borderWidth: 1,
              }}
            >
              <Text style={{ color: "#191919", fontWeight: "bold" }}>초대 링크 복사</Text>
            </Button>
          </>
        )}
      </View>
    </WhiteSafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // 수평 배치
    justifyContent: "center", // 가로 중앙 정렬
    alignItems: "center", // 세로 중앙 정렬
  },
  userContainer: {
    justifyContent: "center", // 내부 수직 정렬
    alignItems: "center", // 내부 가로 정렬
    marginHorizontal: 10, // 사용자 간 간격 추가
  },
  genderContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color.BLUE100,
    justifyContent: "center", // 내부 수직 정렬
    alignItems: "center", // 내부 가로 정렬
    marginBottom: 10,
  },
  icon: {
    fontSize: 40,
    textAlign: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  heart: {
    fontSize: 40,
    marginHorizontal: 10, // 하트와 프로필 사이의 간격 추가
  },
  profileContainer: {
    // flex: 1,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    justifyContent: "center", // 내부 수직 정렬
    alignItems: "center",
    borderRadius: 8,
    borderColor: Color.BLUE200,
  },
  text: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  dateText: { fontSize: 12, color: Color.DARK_GRAY, textAlign: "center" },
  menuButton: {
    margin: 10,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: Color.GRAY,
    borderRadius: 8,
  },
  menuContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.GRAY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default InviteScreen;
