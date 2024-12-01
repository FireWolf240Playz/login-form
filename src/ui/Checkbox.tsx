import styled from "styled-components";

const StyledCheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 80%;
  gap: 1rem;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  display: inline-block;
  position: relative;

  &:checked {
    background-color: #6c63ff;
    border-color: #6c63ff;
  }

  /* Add the check mark */
  &:checked::after {
    content: "";
    position: absolute;
    top: 0.1rem;
    left: 0.6rem;
    width: 0.5rem;
    height: 1.2rem;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:focus {
    outline: 2px solid rgba(108, 99, 255, 0.5);
  }
`;

const StyledLabel = styled.label`
  font-size: 1.6rem;
  color: #333;
  cursor: pointer;
`;

interface CheckboxProps {
  label: string;
  id: string;
  register: any;
}

function Checkbox({ label, id, register }: CheckboxProps) {
  return (
    <StyledCheckboxWrapper>
      <StyledCheckbox id={id} {...register(id)} />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </StyledCheckboxWrapper>
  );
}

export default Checkbox;
