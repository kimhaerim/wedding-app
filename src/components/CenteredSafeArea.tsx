import React from "react";
import styled from "styled-components/native";

const SafeAreaContainer = styled.SafeAreaView<SafeAreaContainerProps>`
  flex: 1;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

interface SafeAreaContainerProps {
  justifyContent?: string;
  alignItems?: string;
}

interface CenteredSafeAreaProps extends SafeAreaContainerProps {
  children: React.ReactNode;
}

const CenteredSafeArea: React.FC<CenteredSafeAreaProps> = (props) => {
  const { children, justifyContent, alignItems } = props;
  return (
    <SafeAreaContainer justifyContent={justifyContent} alignItems={alignItems}>
      {children}
    </SafeAreaContainer>
  );
};

export default CenteredSafeArea;
