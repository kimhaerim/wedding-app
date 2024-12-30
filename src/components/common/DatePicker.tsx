import React from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { Color } from "../../enum";
import { ko, registerTranslation } from "react-native-paper-dates";
import { StyleSheet } from "react-native";

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
        style={[styles.style]}
        outlineStyle={[styles.outlineStyle]}
        withModal
      />
    </>
  );
};

const styles = StyleSheet.create({
  style: { fontSize: 13, backgroundColor: Color.WHITE },
  outlineStyle: { borderColor: Color.DARK_GRAY, borderRadius: 12 },
});

export default DatePicker;
