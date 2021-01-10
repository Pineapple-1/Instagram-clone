
import React, { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";
import Emoji from "react-emoji-render";


import Avatar from "@material-ui/core/Avatar";
import "./Post.css";
import { db } from "./firebase";
import firebase from 'firebase'


function Post({ username, caption, imageUrl, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
 
  useEffect(() => {
    let listen;
  
    if (postId) {
      listen = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) =>  doc.data()
          
        
          
          ));
          
        });
    }

    return () => {
      listen();
    };
  } ,[postId]);

  const uploadComment = (event) => {
    event.preventDefault();

    db
    .collection('posts')
    .doc(postId)
    .collection('comments')
    .add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
      
    });
    setComment('');
  };
  return (
    <div className="Post">
      <div className="postHeader">
        <Avatar
          className="postAvatar"
          src="static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt={username}
        />
        <h3>{username}</h3>
      </div>

      <img className="postImage" src={imageUrl} alt="media" />
      <h4 className="postText">
        <strong>{username}</strong>
        &nbsp;
        <Emoji text={caption}/>
      </h4>
      <div className="postComments">
      
        {comments
          ? comments.map(({ username, text,timestamp}) => (
              <div key={username+text+timestamp} >
                
                <strong>{username}</strong>&nbsp;
                <Emoji text={text}/>
              </div>
            ))
          : null}
      </div>
         {user &&(<form className="cmntform">
       
        <Input
          color="primary"
          type="text"
          className="comments"
          placeholder="add comment ... "
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          className="btn"
          disabled={!comment}
          type="submit"
          onClick={uploadComment}
        >
          Post
        </Button>
      </form>
)}
        
    
      
    </div>
  );
}

export default Post;
