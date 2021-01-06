import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { auth } from "../../firebase";
import "./styles.css";

function getModalStyle() {
  return {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({
  open,
  username,
  password,
  email,
  setEmail,
  setOpen,
  setPassword,
  setUsername,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleLogin = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };
  return (
    <div>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div className="logo">
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
              />
            </div>
          </center>
          <form className="signUp">
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" onClick={handleLogin}>
              login
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
