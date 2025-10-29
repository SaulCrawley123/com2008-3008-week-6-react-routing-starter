import { useState } from "react";

import { Container } from "react-bootstrap";
import { Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthedRoutes from "./AuthedRoutes.jsx";
import UnauthedRoutes from "./UnauthedRoutes.jsx";

const App = () => {

  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  const BASE_URL = "http://localhost:8080";

  const authorisedRequest = (url, method, data = {}) => axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const login = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const client = {
    getPosts: () => authorisedRequest("/posts", "GET")
      .then(({ data }) => {
        setPosts(data)
      }),
    getPost: (id) => authorisedRequest(`/posts/${id}`, "GET"),
    updatePost: (data, id) => authorisedRequest(`/posts/${id}`, "PUT", data),
    deletePost: (id) => authorisedRequest(`/posts/${id}`, "DELETE"),
    createPost: (data) => authorisedRequest("/posts", "POST", data)
      .then(() => {
        client.getPosts()
      }),
    signup: (data) => axios({
      method: "POST",
      url: `${BASE_URL}/auth/signup`,
      data
    }).then(({ data }) => login(data.token, data.user)),
    login: (data) => axios({
      method: "POST",
      url: `${BASE_URL}/auth/login`,
      auth: data,
    }).then(({ data }) => login(data.token, data.user)),
  };

  const nav = useNavigate();

  const logout = () => {
    setToken("");
    setUser({});
    nav("/");
  };

  return (
    <Container>
      {token === ""
        ? <UnauthedRoutes client={client}/>
        : <AuthedRoutes user={user} posts={posts} client={client} logout={logout}/>
      }
    </Container>
  );
};

export default App;
