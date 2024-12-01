import styled from "styled-components";
import Header from "../../ui/Heading";
import { useSelector } from "react-redux";
import { logOutUser } from "./userOperations";
import { RootState, useAppDispatch } from "../../store";
import Button from "../../ui/Button";
import ComponentGroup from "../../ui/ComponentGroup";

const StyledWelcomeBox = styled.div`
  border-radius: 1.5rem;
  padding: 2rem 1rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function WelcomeBox() {
  const appDispatch = useAppDispatch();

  const username = useSelector((state: RootState) => state.user.username);
  return (
    <StyledWelcomeBox>
      <Header as="h3">👋Hi again, {username}</Header>
      <ComponentGroup>
        <Button onClick={() => appDispatch(logOutUser())}>Log out</Button>
      </ComponentGroup>
    </StyledWelcomeBox>
  );
}

export default WelcomeBox;
