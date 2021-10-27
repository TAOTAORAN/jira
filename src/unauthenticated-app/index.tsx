import { useState } from "react";
import { Card } from "antd";
import styled from "@emotion/styled";

import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

export const UnauthenticatedApp = () => {
  const [isRegister, setRegister] = useState(false);
  return (
    <Container>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <button onClick={() => setRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </button>
      </Card>
    </Container>
  );
};
