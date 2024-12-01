import styled from "styled-components";
import { ReactNode } from "react";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 90%;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  & > *:nth-child(2) {
    width: 90%;
    align-self: center;
  }
`;

export const Error = styled.span`
  font-size: 1.4rem;
  color: #b91c1c;
`;

interface FormRowProps {
  error?: string;
  children: ReactNode;
}

function FormRow({ error, children }: FormRowProps) {
  return (
    <StyledFormRow>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
