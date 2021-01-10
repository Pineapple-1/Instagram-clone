import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import SimpleModal from "./components/Signupbutton/Signupbutton";
import SignInModal from "./components/Signin/signin";
import { Button } from "@material-ui/core";
import logo from "./pictures/logo.png";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";
import DescriptionAlerts from "./Alert";

const App = () => {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((Snapshot) => {
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
        <img className="logo" src={logo} alt="logo" />
        {user ? (
          <Button type="button" onClick={() => auth.signOut()}>
            Sign Out
          </Button>
        ) : (
          <div className="loginContainer">
            <Button type="button" onClick={() => setOpen(true)}>
              Sign Up
            </Button>
            <Button type="button" onClick={() => setOpenSignIn(true)}>
              Sign In
            </Button>
          </div>
        )}
      </div>

      <SignInModal
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        user={user}
        setUser={setUser}
      />

      <SimpleModal
        open={open}
        setOpen={setOpen}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        user={user}
        setUser={setUser}
      />
      <div className="posts">
        <div className="left">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              user={user}
            />
          ))}
        </div>
        <div className="right">
          <InstagramEmbed
            url="https://www.instagram.com/p/CIYbqUypmCU/"
            clientAccessToken="1059599127892470|40f1f0276460c39c4d51e01303486e39"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <DescriptionAlerts />
      )}
    </div>
  );
};

export default App;
