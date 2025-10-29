
import { Route, Routes } from "react-router-dom";

import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import NotFound from "./NotFound.jsx";

const UnauthedRoutes = ({ client }) => {

  return (
    <Routes>
      <Route path="/" element={<LoginForm client={client} />} />
      <Route path="signup" element={<RegisterForm client={client}/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default UnauthedRoutes;