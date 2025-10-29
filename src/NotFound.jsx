import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>The page was not found.</h1>
      <p>Click <Link to={"/"}>here</Link> to go home</p>
    </div>
  );
};

export default NotFound;