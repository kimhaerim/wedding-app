import React from "react";
import styled from "styled-components/native";

const StyledCheckBoxContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const CheckBoxContainer = styled.Switch<{ margin: string }>`
  margin: ${({ margin }) => margin || "0px"};
`;

const Label = styled.Text<{ margin: string }>`
  margin-left: 10px;
  font-size: 16px;
  margin: ${({ margin }) => margin || "0px"};
`;

interface CheckBoxProps {
  title: string;
  value: boolean;
  margin: string;
  onValueChange: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <StyledCheckBoxContainer>
      <CheckBoxContainer
        onValueChange={props.onValueChange}
        value={props.value}
        margin={props.margin}
      ></CheckBoxContainer>
      <Label margin={props.margin}>{props.title}</Label>
    </StyledCheckBoxContainer>
  );
};

export default CheckBox;
