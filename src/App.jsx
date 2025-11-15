import {useEffect, useState} from "react";

import {Alert, Container} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
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
  }).catch(errorHandler);

    const login = (token, user) => {
        setToken(token);
        setUser(user);
        nav("/")
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user))
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
      }).then(loginHandler).catch(errorHandler),
      login: (data) => axios({
          method: "POST",
          url: `${BASE_URL}/auth/login`,
          data
      }).then(loginHandler).catch(errorHandler),
  };

  const nav = useNavigate();

    const location = useLocation();

    useEffect(() => {
        setErrorMessage("");
    }, [location.pathname]);

    const logout = () => {
        setToken("");
        setUser({});
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        nav("/");
    };

    const [errorMessage, setErrorMessage] = useState("");

    const errorHandler = (error) => {
        setErrorMessage(error.response.data.message)
        if (error.response.data.errors) {
            return Promise.reject(error.response.data.errors) // this bit means we can chain another catch()
        }
    };

    const loginHandler = ({ data }) => {
        setToken(data.token);
        setUser(data.user);
        setErrorMessage("");
        nav("/")
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))
    };

    useEffect(() => {
        setToken(localStorage.getItem("token") ?? "");
        setUser(JSON.parse(localStorage.getItem("user") ?? "{}"));
    }, []);

    return (
        <Container>
            {errorMessage !== "" && (
                <Alert className="mt-2" variant="danger">
                    {errorMessage}
                </Alert>
            )}
            {token === ""
                ? <UnauthedRoutes client={client}/>
                : <AuthedRoutes user={user} posts={posts} client={client} logout={logout}/>
            }
        </Container>
    );
};

export default App;
