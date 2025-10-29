import { useEffect } from "react";

import { Stack } from "react-bootstrap";
import { isEmpty } from "lodash";

import Post from "./Post.jsx";
import { Link } from "react-router-dom";

const Posts = ({ client, posts, user }) => {
  useEffect(() => {
    client.getPosts()
  }, []);

  return (
    <>
      <h1>Posts</h1>
      <p>Click <Link to={"/newpost"}>here</Link> to create a new post</p>
      {isEmpty(posts) && (
        <p>No Posts Yet</p>
      )}
      <Stack gap={2}>
        {posts.map(p => (
          <Post key={p.id} post={p} ownedByUser={p.userId === user.id}/>
        ))}
      </Stack>
    </>
  )
};

export default Posts;