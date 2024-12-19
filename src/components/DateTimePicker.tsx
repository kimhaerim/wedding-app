import React from "react";
import styled from "styled-components/native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import CustomText from "./Text";

const TextContainer = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  align-self: flex-start;
`;

const InputGroupContainer = styled.View`
  width: 90%;
  margin-top: 20px;
  padding-left: 10%;
`;

type IOSMode = "date" | "time" | "datetime" | "countdown";

interface DateTimePickerProps {
  title: string;
  value: Date;
  mode: IOSMode;
  onChange: (_: DateTimePickerEvent, selectedDate?: Date) => void;
}

const CustomDateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const { title, value, mode, onChange } = props;
  return (
    <>
      <CustomText title={title} fontSize={16} margin="0px 0px 10px 0px" bold />
      <DateTimePicker locale="ko-KR" value={value} mode={mode} onChange={onChange} />
    </>
  );
};

export default CustomDateTimePicker;
