import React from "react";
import styled from "styled-components/native";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const SmallRowContainer = styled.View`
  flex: 1;
  margin-horizontal: 5px;
`;

interface RowProps {
  children: React.ReactNode;
}

const CustomRow: React.FC<RowProps> = ({ children }) => {
  const wrappedChildren = React.Children.map(children, (child) => <SmallRowContainer>{child}</SmallRowContainer>);
  return <RowContainer>{wrappedChildren}</RowContainer>;
};

export default CustomRow;
