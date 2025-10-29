import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Post = ({ post, ownedByUser }) => {

  return (
    <Card className="p-2">
      <p>Title: {post.title}</p>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
      {ownedByUser && (
        <Link to={`/posts/${post.id}`}>
          <Button>Edit/Delete</Button>
        </Link>
      )}
    </Card>
  );
};

export default Post;