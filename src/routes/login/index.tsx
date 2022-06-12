import UnAuthorizedLayout from "../layout/UnAuthorizedLayout";
import { Outlet } from "react-router-dom";

const LoginIndex: React.FC = () => {
  return (
    <UnAuthorizedLayout>
      <Outlet />
    </UnAuthorizedLayout>
  );
};

export default LoginIndex;
