import styled from "styled-components";
import { ReactNode } from "react";

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

interface ButtonGroupProps {
  children: ReactNode;
}

function ButtonGroup({ children }: ButtonGroupProps) {
  return <StyledButtonGroup>{children}</StyledButtonGroup>;
}

export default ButtonGroup;
