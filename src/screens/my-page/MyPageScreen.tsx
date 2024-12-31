import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Icon, IconButton, Text } from "react-native-paper";
import Title from "../../components/common/Title";
import { useState } from "react";
import { ICouple, IUser } from "../../interface";
import { coupleMockData, userMockData } from "../../mock/CheckListMockData";
import { calculateDday, convertDateToString } from "../../common/util";
import dayjs from "dayjs";
import Button from "../../components/common/Button";
import Row from "../../components/common/Row";
import { Color, Gender } from "../../enum";

const MyPageScreen = () => {
  const today = dayjs();
  const [couple, setCouple] = useState<ICouple>(coupleMockData);
  const [user, setUser] = useState<IUser>(userMockData);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <Title label="마이페이지" />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: Color.BLUE100,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <Text style={{ fontSize: 40, textAlign: "center" }}>{user.gender === Gender.FEMALE ? "🙍‍♀️" : "🙍‍♂️"}</Text>
          </View>

          <View
            style={{
              flex: 1,
              marginBottom: 20,
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              borderColor: Color.BLUE200,
            }}
          >
            <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: "bold" }}>{user.name}</Text>
            {couple.coupleStartDate ? (
              <View style={{}}>
                <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
                  우리가 함께한 시간 D+{calculateDday(couple.coupleStartDate, today)} 💕
                </Text>
                <Text style={{ fontSize: 12, color: Color.DARK_GRAY }}>
                  {convertDateToString(couple.coupleStartDate)}
                </Text>
              </View>
            ) : (
              <Button style={{ padding: 10 }} onPress={() => console.log("")}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>기념일 등록하기</Text>
              </Button>
            )}

            {couple.weddingDate ? (
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
                  결혼식까지 D{calculateDday(couple.weddingDate, today)} 🏩
                </Text>
                <Text style={{ fontSize: 12, color: Color.DARK_GRAY }}>{convertDateToString(couple.weddingDate)}</Text>
              </View>
            ) : (
              <Button style={{ marginTop: 20, padding: 10 }} onPress={() => console.log("")}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>결혼 예정일 등록하기</Text>
              </Button>
            )}
          </View>
        </View>

        <Divider />

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={[styles.button]}>
            <Row>
              <View style={[styles.container]}>
                <Icon color={Color.WHITE} source="account-plus" size={20} />
              </View>
              <Text style={[styles.text]}>{user.gender === Gender.FEMALE ? "예랑이 초대하기" : "예신 초대하기"}</Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]}>
            <Row>
              <View style={[styles.container]}>
                <Icon color={Color.WHITE} source="account-edit" size={20} />
              </View>
              <Text style={[styles.text]}>개인정보 수정</Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]}>
            <Row>
              <View style={[styles.container]}>
                <Icon color={Color.WHITE} source="message" size={20} />
              </View>
              <Text style={[styles.text]}>문의하기</Text>
            </Row>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button]}>
            <Row>
              <View style={[styles.container]}>
                <Icon color={Color.WHITE} source="logout" size={20} />
              </View>
              <Text style={[styles.text]}>로그아웃</Text>
            </Row>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: Color.GRAY,
    borderRadius: 8,
  },
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.GRAY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default MyPageScreen;
