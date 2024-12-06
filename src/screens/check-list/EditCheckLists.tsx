import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomText from "../../components/Text";
import ActiveButton from "../../components/ActiveButton";

const EditCheckLists = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <CenteredSafeArea>
      <BackButton
        title={isEdit ? "체크리스트 추가" : "체크리스트 수정"}
        onPress={() => console.log("뒤로 가기")}
      ></BackButton>

      <CustomText title="이용약관에 동의해 주세요." fontSize={20} margin="30px 0px 0px 0px" padding="10px 20px" />
      <ActiveButton title="다음" onPress={() => console.log("다음")}></ActiveButton>
    </CenteredSafeArea>
  );
};

export default EditCheckLists;
