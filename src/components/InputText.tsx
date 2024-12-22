import React from "react";

import { Text, TextInput } from "react-native-paper";
import { Color } from "../enum";

interface props {
  label: string;
  onChangeText: (text: string) => void;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  style?: Object;
}

const InputText: React.FC<props> = (props) => {
  return (
    <>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>{props.label}</Text>
      <TextInput
        mode="outlined"
        placeholder={props.placeholder}
        value={`${props.value}`}
        defaultValue={`${props.defaultValue}`}
        keyboardType={typeof props.value === "number" ? "numeric" : undefined}
        onChangeText={props.onChangeText}
        error={props.error}
        multiline
        outlineStyle={{ borderColor: Color.DARK_GRAY, borderRadius: 12 }}
        style={{ height: 50, fontSize: 13, ...props.style }}
        secureTextEntry={props.secureTextEntry}
      />
      {props.error && <Text style={{ color: "red", marginTop: 5, fontSize: 10 }}>{props.errorMessage}</Text>}
    </>
  );
};

export default InputText;
