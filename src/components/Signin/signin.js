import { Button, Input } from "@material-ui/core";
import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import '../Signupbutton/styles.css'
import logo from "../../pictures/logo.png";
import { auth } from "../../firebase";

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
  openSignIn,
  password,
  email,
  setEmail,
  setOpenSignIn,
  setPassword,

}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const SignIn=(event)=>{
    event.preventDefault()
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
    setOpenSignIn(false)
    }


  return (
    <div>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <center>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
          </center>
          <form className="Form">
           
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={SignIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
