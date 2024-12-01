import styled from "styled-components";
import LoginForm from "./features/user/LoginForm";
import GlobalStyles from "./styles/GlobalStyles";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store";
import WelcomeBox from "./features/user/WelcomeBox";
import LoginUnsuccessful from "./features/user/LoginUnsuccessful";

import Spinner from "./ui/Spinner";
import { logOutUser } from "./features/user/userOperations";

const StyledApp = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to top right, #563fee, #8a7af3);
`;

function App() {
  const status = useSelector((state: RootState) => state.user.status);

  const appDispatch = useAppDispatch();
  const handleRetry = () => {
    appDispatch(logOutUser());
  };

  return (
    <>
      <GlobalStyles />
      <StyledApp>
        {status === "sign-in" && <LoginForm />}
        {status === "loading" && <Spinner data-testid="spinner" />}
        {status === "signed-in" && <WelcomeBox />}
        {status === "failed" && <LoginUnsuccessful onRetry={handleRetry} />}
      </StyledApp>
    </>
  );
}
export default App;
