import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ComponentGroup from "../../ui/ComponentGroup";

const Box = styled.div`
  border-radius: 1.5rem;
  padding: 1.5rem 3rem;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

interface LoginUnsuccessfulProps {
  onRetry: () => void;
}

function LoginUnsuccessful({ onRetry }: LoginUnsuccessfulProps) {
  return (
    <Box>
      <Heading as="h3">🚫 Wrong credentials</Heading>
      <ComponentGroup>
        <Button onClick={onRetry}>Retry</Button>
      </ComponentGroup>
    </Box>
  );
}

export default LoginUnsuccessful;
