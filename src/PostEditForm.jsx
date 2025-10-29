import { useEffect, useRef, useState } from "react";

import { Alert, Button, Form, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";

const PostEditForm = ({ client }) => {
  const { postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    client.getPost(postId)
      .then(({ data }) => setPost(data))
      .catch(() => setHasError(true))
  }, []);

  const nav = useNavigate();

  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const [hasError, setHasError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    client.updatePost({ title, body }, postId)
      .then(() => {
        setHasError(false);
        titleRef.current.value = "";
        bodyRef.current.value = "";
        nav("/");
      })
      .catch(() => {
        setHasError(true);
      });
  };

  const deleteHandler = () => {
    client.deletePost(postId)
      .then(() => {
        setHasError(false);
        nav("/");
      })
      .catch(() => {
        setHasError(true);
      });
  }

  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <h1>Edit Post</h1>
      <p>Back to <Link to={"/"}>posts</Link>.</p>
      {hasError && (
        <Alert variant="danger">
          An error occurred (this is an unhelpful message that we shall improve later)
        </Alert>
      )}
      {!isEmpty(post) && (
        <>
          <Form.Group controlId="title">
            <Form.Label>Post Title</Form.Label>
            <Form.Control defaultValue={post.title} ref={titleRef} type="text"/>
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control defaultValue={post.body} ref={bodyRef} type="textbox"/>
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="mt-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button onClick={deleteHandler} variant="primary">Delete Post</Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default PostEditForm;