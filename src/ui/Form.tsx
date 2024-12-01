import styled from "styled-components";
import { ReactNode } from "react";

const StyledForm = styled.form`
  width: 90%;
  max-width: 50rem;
  height: auto;

  border-radius: 2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  gap: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  margin: 0 auto;

  @media (min-width: 768px) {
    width: 80%;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media (min-width: 1200px) {
    width: 50rem;
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

interface FormInterface {
  children: ReactNode;
  onSubmit: () => void;
  onRetry?: () => void;
}

function Form({ children, onSubmit }: FormInterface) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
}

export default Form;
