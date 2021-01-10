import React, { useState } from "react";
import { Button, Input } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import LinearProgress from "@material-ui/core/LinearProgress";
import "./styles.css";
import INPUT from "./components/INPUT/input";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const Upload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const Progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(Progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      {progress>5? <LinearProgress variant="determinate" value={progress} />:null}
     
     
        <Input
          type="text"
          placeholder="Enter a caption..."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
        />

        <INPUT
         
        handleChange={handleChange} />
  

      <Button onClick={Upload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
