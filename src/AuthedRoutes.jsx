
import { Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Posts from "./Posts.jsx";
import NewPostForm from "./NewPostForm.jsx";

const AuthedRoutes = ({ logout, client, posts }) => {

  return (
    <div className="mt-2">
      <Button onClick={logout}>Logout</Button>
      <Routes>
        <Route path="/" element={<Posts client={client} posts={posts}/>}/>
        <Route path="newpost" element={<NewPostForm client={client}/>}/>
      </Routes>
    </div>
  );
};

export default AuthedRoutes;