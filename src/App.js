import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import SimpleModal from "./components/Signupbutton/Signupbutton";
import { Button} from "@material-ui/core";

const App = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts").onSnapshot((Snapshot) => {
      setPosts(
        Snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, [posts]);
  return (
    <div className="App">
      <div className="appHeader">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="logo"
        />
      </div>
      <Button type="button" onClick={() => setOpen(true)}>
        Sign up
      </Button>
      <SimpleModal 
      open={open}
      setOpen={setOpen}
      password={password}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      />
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default App;
