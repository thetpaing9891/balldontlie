import { Outlet } from "react-router-dom";
import AuthorizedLayout from "../layout/AuthorizedLayout";

const AdminIndex = () => {
  return (
    <AuthorizedLayout>
      <Outlet />
    </AuthorizedLayout>
  );
};

export default AdminIndex;
