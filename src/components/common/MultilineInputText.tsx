import React from "react";

import { StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Color } from "../../enum";

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
  multiline?: boolean;
}

const MultilineInputText: React.FC<props> = (props) => {
  const {
    label,
    onChangeText,
    value,
    multiline,
    defaultValue,
    placeholder,
    error,
    errorMessage,
    secureTextEntry,
    titleStyle,
    style,
  } = props;

  const stringValue = value !== undefined ? `${value}` : undefined;
  const stringDefaultValue = defaultValue !== undefined ? `${defaultValue}` : undefined;
  return (
    <>
      <Text style={[styles.textStyle, titleStyle]}>{label}</Text>
      <TextInput
        mode="outlined"
        placeholder={placeholder}
        value={stringValue}
        defaultValue={stringDefaultValue}
        keyboardType={typeof value === "number" ? "numeric" : undefined}
        onChangeText={onChangeText}
        error={error}
        multiline
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Color.DARK_GRAY}
        outlineStyle={[styles.outlineStyle]}
        style={[styles.inputStyle, style]}
      />
      {error && <Text style={[styles.errorTextStyle]}>{errorMessage}</Text>}
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

export default MultilineInputText;
