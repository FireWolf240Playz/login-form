import styled from "styled-components";

const Button = styled.button`
  width: 12rem;
  height: 5rem;
  border: none;
  border-radius: 1.6rem;
  background: linear-gradient(to right, #9181f4, #5038ed);
  color: #fff;
  font-size: 1.5rem;
  line-height: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 5rem;
  transition:
    background 1s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #5038ed, #9181f4);
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(80, 56, 237, 0.4);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 10px rgba(80, 56, 237, 0.2);
  }

  &:focus {
    outline: 2px solid transparent;
    box-shadow:
      0 0 8px rgba(108, 99, 255, 0.8),
      0 0 0 4px rgba(108, 99, 255, 0.4);
  }
`;

export default Button;
