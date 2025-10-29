
import { Route, Routes } from "react-router-dom";

import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const UnauthedRoutes = ({ client }) => {

  return (
    <Routes>
      <Route path="/" element={<LoginForm client={client} />} />
      <Route path="signup" element={<RegisterForm client={client}/>}/>
    </Routes>
  );
};

export default UnauthedRoutes;