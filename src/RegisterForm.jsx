import { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";

const RegisterForm = ({ client }) => {
  const nav = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [hasError, setHasError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    client.signup({ username, password })
      .then(() => nav("/"))
      .catch(() => setHasError(true))
  }

  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <h1>Sign Up</h1>
      <p>Already have an account? Click <Link to={"/"}>here</Link> to login</p>
      {hasError && (
        <Alert variant="danger">
          An error occurred (this is an unhelpful message that we shall improve later)
        </Alert>
      )}
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control ref={usernameRef} type="text" placeholder="Enter your new username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control ref={passwordRef} type="password" placeholder="Enter a strong password" />
      </Form.Group>
      <Button className="mt-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;