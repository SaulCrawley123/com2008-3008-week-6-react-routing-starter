import { useState } from "react";

import { Container } from "react-bootstrap";
import { Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthedRoutes from "./AuthedRoutes.jsx";
import UnauthedRoutes from "./UnauthedRoutes.jsx";

const App = () => {

  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);

  const BASE_URL = "http://localhost:8080"

  const authorisedRequest = (url, method, data = {}) => axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  const client = {
    getPosts: () => authorisedRequest("/posts", "GET")
      .then(({ data }) => {
        setPosts(data)
      }),
    createPost: (data) => authorisedRequest("/posts", "POST", data)
      .then(() => {
        client.getPosts()
      }),
    signup: (data) => axios({
      method: "POST",
      url: `${BASE_URL}/auth/signup`,
      data
    }).then(({ data }) => setToken(data.token)),
    login: (data) => axios({
      method: "POST",
      url: `${BASE_URL}/auth/login`,
      auth: data,
    }).then(({ data }) => setToken(data.token)),
  };

  const nav = useNavigate();

  const logout = () => {
    setToken("")
    nav("/")
  }

  return (
    <Container>
      <>
        {token === ""
          ? <UnauthedRoutes client={client}/>
          : <AuthedRoutes posts={posts} client={client} logout={logout}/>
        }
      </>
    </Container>
  );
}

export default App;
