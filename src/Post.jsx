import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Post = ({ post, ownedByUser }) => {
  const nav = useNavigate();

  const editHandler = () => {
    nav(`/posts/${post.id}`)
  };

  return (
    <Card className="p-2">
      <p>Title: {post.title}</p>
      <p>{post.body}</p>
      <p>User ID: {post.userId}</p>
      {ownedByUser && (
        <div>
          <Button onClick={editHandler}>Edit/Delete</Button>
        </div>
      )}
    </Card>
  );
};

export default Post;