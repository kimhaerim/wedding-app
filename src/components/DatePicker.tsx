import React from "react";
import { View, Text } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { Color } from "../enum";
import { ko, registerTranslation } from "react-native-paper-dates";

registerTranslation("ko", ko);

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, value, onChange } = props;
  return (
    <>
      <DatePickerInput
        mode="outlined"
        locale="ko"
        value={value}
        label={label}
        onChange={onChange}
        inputMode="start"
        withDateFormatInLabel={false}
        editable={false}
        style={{ fontSize: 13 }}
        outlineStyle={{ borderColor: Color.DARK_GRAY, borderRadius: 12 }}
        withModal
      />
    </>
  );
};

export default DatePicker;
