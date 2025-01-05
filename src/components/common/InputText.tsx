import React from "react";

import { Text, TextInput } from "react-native-paper";
import { Color } from "../../enum";
import { StyleSheet } from "react-native";

interface props {
  label: string;
  onChangeText: (text: string) => void;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  secureTextEntry?: boolean;
  titleStyle?: Object;
  style?: Object;
}

const InputText: React.FC<props> = (props) => {
  return (
    <>
      <Text style={[styles.textStyle, props.titleStyle]}>{props.label}</Text>
      <TextInput
        mode="outlined"
        placeholder={props.placeholder}
        value={`${props.value}`}
        defaultValue={`${props.defaultValue}`}
        keyboardType={typeof props.value === "number" ? "numeric" : undefined}
        onChangeText={props.onChangeText}
        error={props.error}
        multiline
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor={Color.DARK_GRAY}
        outlineStyle={[styles.outlineStyle]}
        style={[styles.inputStyle, props.style]}
      />
      {props.error && <Text style={[styles.errorTextStyle]}>{props.errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  inputStyle: {
    height: 50,
    fontSize: 13,
    backgroundColor: Color.WHITE,
  },
  outlineStyle: {
    borderColor: Color.DARK_GRAY,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorTextStyle: {
    color: "red",
    marginVertical: 5,
    fontSize: 10,
  },
});

export default InputText;
