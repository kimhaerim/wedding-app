import { useState } from "react";
import BackButton from "../../components/BackButton";
import CenteredSafeArea from "../../components/CenteredSafeArea";
import CustomText from "../../components/Text";
import ActiveButton from "../../components/ActiveButton";
import CustomRow from "../../components/Row";
import CustomButton from "../../components/Button";
import { color } from "../../enum";
import HorizontalLine from "../../components/HorizontalLine";
import { ICategory } from "../../interface/category.interface";

// @IsString()
// @Field(() => String)
// title: string;

// @IsOptional()
// @IsInt()
// @Field(() => Int, { nullable: true })
// budgetAmount?: number;
const CategoryLists = () => {
  const defaultCategories = ["웨딩홀", "스튜디오", "드레스", "메이크업"];
  const [userCategories, setUserCategories] = useState<ICategory[]>([{ id: 1, title: "본식DVD", budgetAmount: 0 }]);

  return (
    <CenteredSafeArea>
      <BackButton title={"카테고리 편집"} onPress={() => console.log("뒤로 가기")}></BackButton>
      <CustomButton
        title="직접 입력"
        onPress={() => console.log("직접 입력")}
        backgroundColor={color.WHITE}
        innerTextColor={color.BLUE}
        innerTextBold
      />
      <HorizontalLine></HorizontalLine>
      {defaultCategories.map((category, index) => (
        <>
          <CustomRow ratios={[2, 1]} key={index}>
            <CustomText title={category} fontSize={16} centered />
            <CustomButton
              title="추가"
              onPress={() => console.log(category)}
              backgroundColor={color.WHITE}
              innerTextColor={color.BLUE}
              innerTextBold
            />
          </CustomRow>
          <HorizontalLine></HorizontalLine>
        </>
      ))}
      <CustomText title={"이미 추가된 카테고리 목록"} fontSize={20} centered bold margin="30px 0px 30px 0px" />
      {userCategories.map((category) => (
        <>
          <CustomRow ratios={[2, 1]} key={category.id}>
            <CustomText title={category.title} fontSize={16} centered />
            <CustomButton
              title="수정"
              onPress={() => console.log(category)}
              backgroundColor={color.WHITE}
              innerTextColor={color.BLUE}
              innerTextBold
            />
          </CustomRow>
          <HorizontalLine></HorizontalLine>
        </>
      ))}
    </CenteredSafeArea>
  );
};

export default CategoryLists;
