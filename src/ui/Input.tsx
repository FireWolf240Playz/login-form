import styled from "styled-components";

const Input = styled.input`
  width: 90%;
  max-width: 40rem;
  background-color: #f0edff;
  border: none;
  border-radius: 1.6rem;
  padding: 2rem 3rem;
  font-size: 1.6rem;
  outline: none;
  box-sizing: border-box;
  &:focus {
    outline: 2px solid transparent;
    box-shadow:
      0 0 8px rgba(108, 99, 255, 0.8),
      0 0 0 4px rgba(108, 99, 255, 0.4);
  }
`;

export default Input;
