import { Card } from "react-bootstrap";

const Post = ({ post }) => {
  return (
    <Card className="p-2">
      <p>Title: {post.title}</p>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
    </Card>
  );
};

export default Post;