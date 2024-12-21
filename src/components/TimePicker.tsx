import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { View } from "react-native";

import { ko, registerTranslation } from "react-native-paper-dates";
import { Color } from "../enum";
import dayjs from "dayjs";
registerTranslation("ko", ko);

interface TimeInputProps {
  value?: string;
  onChange: (time: string) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  const onConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    setVisible(false);
    const time = dayjs().hour(hours).minute(minutes).format("HH:mm");
    onChange(time);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        mode="outlined"
        label="시간"
        value={value} // 부모로부터 받은 시간 값
        onFocus={() => setVisible(true)}
        editable={false}
        outlineStyle={{ borderColor: Color.DARK_GRAY, borderRadius: 12 }}
        style={{ height: 50, fontSize: 13 }}
        right={<TextInput.Icon icon="clock-time-five" onPress={() => setVisible(true)} />}
      />

      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12} // 기본값은 12시
        minutes={0} // 기본값은 0분
        use24HourClock={true}
        locale="ko"
        defaultInputType="keyboard"
      />
    </View>
  );
};

export default TimeInput;
