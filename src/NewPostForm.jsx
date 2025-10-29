import { useRef, useState } from "react";

import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NewPostForm = ({ client }) => {
  const nav = useNavigate();

  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const [hasError, setHasError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    client.createPost({ title, body })
      .then(() => {
        setHasError(false);
        titleRef.current.value = "";
        bodyRef.current.value = "";
        nav("/");
      })
      .catch(() => {
        setHasError(true);
      })
  }

  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <h1>Create New Post</h1>
      <p>Back to <Link to={"/"}>posts</Link>.</p>
      {hasError && (
        <Alert variant="danger">
          An error occurred (this is an unhelpful message that we shall improve later)
        </Alert>
      )}
      <Form.Group controlId="title">
        <Form.Label>Post Title</Form.Label>
        <Form.Control ref={titleRef} type="text" placeholder="Enter a post title" />
      </Form.Group>
      <Form.Group controlId="body">
        <Form.Label>Body</Form.Label>
        <Form.Control ref={bodyRef} type="textbox" placeholder="Enter your post" />
      </Form.Group>
      <Button className="mt-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewPostForm;