import React from "react";
import styled from "styled-components/native";

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SmallRowContainer = styled.View<{ flexRatio?: number }>`
  flex: ${({ flexRatio }) => flexRatio || 1};
`;

interface RowProps {
  children: React.ReactNode;
  ratios?: number[];
}

const CustomRow: React.FC<RowProps> = ({ children, ratios }) => {
  const wrappedChildren = React.Children.map(children, (child, index) => (
    <SmallRowContainer flexRatio={ratios?.[index]}>{child}</SmallRowContainer>
  ));

  return <RowContainer>{wrappedChildren}</RowContainer>;
};

export default CustomRow;
