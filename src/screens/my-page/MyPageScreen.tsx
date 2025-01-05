import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { calculateDday, convertDateToString } from "../../common/util";
import Button from "../../components/common/Button";
import Row from "../../components/common/Row";
import WhiteSafeAreaView from "../../components/common/WhiteSafeAreaView";
import { Color, Gender } from "../../enum";
import { ICouple, IUser } from "../../interface";
import { coupleMockData, userWithPartnerMockData } from "../../mock/CheckListMockData";
import SelectDateModal from "../../modal/SelectDateModal";
import { MyPageStackParamList } from "../../navigation/interface";

interface MyPageScreenProps {
  navigation: StackNavigationProp<MyPageStackParamList, "MyPageHome">;
  route: RouteProp<MyPageStackParamList, "MyPageHome">;
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({ navigation }) => {
  const today = dayjs();
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [user, setUser] = useState<IUser>(userWithPartnerMockData);

  const [coupleStartDate, setCoupleStartDate] = useState<Date | undefined>(couple.weddingDate ?? undefined);
  const [coupleStartDateVisible, setCoupleStartDateVisible] = useState<boolean>(false);

  const [weddingDate, setWeddingDate] = useState<Date | undefined>(couple.weddingDate ?? undefined);
  const [weddingDateVisible, setWeddingDateVisible] = useState<boolean>(false);

  const partnerInvite = user.partner
    ? "커플 정보 보러가기"
    : user.gender === Gender.FEMALE
    ? "예랑이 초대하기"
    : "예신 초대하기";

  return (
    <WhiteSafeAreaView>
      <View style={{ margin: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View style={[styles.genderContainer]}>
            <Text style={{ fontSize: 40, textAlign: "center" }}>{user.gender === Gender.FEMALE ? "🙍‍♀️" : "🙍‍♂️"}</Text>
          </View>

          <View style={[styles.profileContainer]}>
            <Text style={[styles.text, { marginBottom: 20, fontSize: 16 }]}>{user.name}</Text>

            <View>
              <Text style={[styles.text]}>
                우리가 함께한 시간 D+{coupleStartDate ? calculateDday(coupleStartDate, today) : "???"} 💕
              </Text>
              {coupleStartDate ? (
                <Text style={[styles.dateText]}>{convertDateToString(coupleStartDate)}</Text>
              ) : (
                <Button style={{ padding: 5 }} onPress={() => setCoupleStartDateVisible(true)}>
                  <Text style={[styles.text, { fontSize: 12 }]}>기념일 등록하기</Text>
                </Button>
              )}
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={[styles.text]}>
                결혼식까지 D{weddingDate ? calculateDday(weddingDate, today) : "-???"} 🏩
              </Text>
              {weddingDate ? (
                <Text style={[styles.dateText]}>{convertDateToString(weddingDate)}</Text>
              ) : (
                <Button style={{ padding: 5 }} onPress={() => setWeddingDateVisible(true)}>
                  <Text style={[styles.text, { fontSize: 12 }]}>결혼예정일 등록하기</Text>
                </Button>
              )}
            </View>
          </View>
        </View>

        <Divider />

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={[styles.menuButton]} onPress={() => navigation.navigate("Invite")}>
            <Row>
              <View style={[styles.menuContainer]}>
                <Icon color={Color.WHITE} source="account-plus" size={20} />
              </View>
              <Text style={[styles.menuText]}>{partnerInvite}</Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]} onPress={() => navigation.navigate("EditProfile")}>
            <Row>
              <View style={[styles.menuContainer]}>
                <Icon color={Color.WHITE} source="account-edit" size={20} />
              </View>
              <Text style={[styles.menuText]}>개인정보 수정</Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]}>
            <Row>
              <View style={[styles.menuContainer]}>
                <Icon color={Color.WHITE} source="message" size={20} />
              </View>
              <Text style={[styles.menuText]}>문의하기</Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuButton]}>
            <Row>
              <View style={[styles.menuContainer]}>
                <Icon color={Color.WHITE} source="logout" size={20} />
              </View>
              <Text style={[styles.menuText]}>로그아웃</Text>
            </Row>
          </TouchableOpacity>
        </View>
      </View>

      <SelectDateModal
        title="기념일 등록하기"
        visible={coupleStartDateVisible}
        dateValue={coupleStartDate}
        onDateChange={setCoupleStartDate}
        hideModal={() => setCoupleStartDateVisible(false)}
      ></SelectDateModal>
      <SelectDateModal
        title="결혼 예정일 등록하기"
        visible={weddingDateVisible}
        dateValue={weddingDate}
        onDateChange={setWeddingDate}
        hideModal={() => setWeddingDateVisible(false)}
      ></SelectDateModal>
    </WhiteSafeAreaView>
  );
};

const styles = StyleSheet.create({
  genderContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Color.BLUE100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  profileContainer: {
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: Color.BLUE200,
  },
  text: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  dateText: { fontSize: 12, color: Color.DARK_GRAY },
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

export default MyPageScreen;
