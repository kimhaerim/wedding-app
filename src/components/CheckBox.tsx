import styled from "styled-components/native";
import Checkbox from "expo-checkbox";
import React from "react";
import CustomText from "./Text";

interface Props {
  isChecked: boolean;
  label: string;
  onValueChange: () => void;
  margin?: string;
}

const CheckBoxContainer = styled.View<{ margin?: string }>`
  flex-direction: row;
  align-items: center;
  margin: ${({ margin }) => margin || "0px"};
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px;
  margin-left: 10px;
`;

const CheckBox: React.FC<Props> = ({ isChecked, label, onValueChange, margin }) => (
  <CheckBoxContainer margin={margin}>
    <StyledCheckbox value={isChecked} onValueChange={onValueChange} />
    <CustomText fontSize={15} title={label} bold />
  </CheckBoxContainer>
);

export default CheckBox;
