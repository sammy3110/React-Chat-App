import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";

// import { useNavigate } from 'react-router-dom';

const Login = ({ app_user, getUser, setApp_user }) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show_spinner, setShow_spinner] = useState(false);
  const [no_user_flag, setNo_user_flag] = useState(false);
  const [wrong_password_flag, setWrong_password_flag] = useState(false);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if(app_user) navigate("/user-list");
  // }, [])
  

  function validateLogin() {
    setLoginErrorMessage("");
    if (!email)
      setLoginErrorMessage((pre) => pre + " " + "Email cannot be empty.");
    if (!password)
      setLoginErrorMessage((pre) => pre + " " + "Password cannot be empty.");
  }

  async function loginUser() {
    setShow_spinner(true);
    setNo_user_flag(false);
    setWrong_password_flag(false);

    const user = await getUser(email, password);
    if (user === "ERROR") {
      setShow_spinner(false);
      return;
    }
    // console.log(user);
    if (!user) {
      // console.log("IN IF USER");
      setNo_user_flag(true);
      setEmail("");
      setPassword("");
    } else {
      // console.log(user);
      setNo_user_flag(false);
      if (user.password !== password) {
        setWrong_password_flag(true);
      } else {
        // console.log("Got the user info", user);
        setApp_user(user);
        // navigate("/user-list");
        setWrong_password_flag(false);
      }
    }

    setShow_spinner(false);
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    validateLogin();
    loginUser();
  }

  const no_user_toast = (
    <Toast className=" mb-2 failure_toast">
      <Toast.Header>
        <strong className="me-auto">User not found.</strong>
      </Toast.Header>
      <Toast.Body>
        <a href="register">
          <strong>Register</strong>
        </a>{" "}
        to continue.
      </Toast.Body>
    </Toast>
  );

  const wrong_password_toast = (
    <Toast className=" mb-2 failure_toast">
      <Toast.Header>
        <strong className="me-auto">Wrong Password.</strong>
      </Toast.Header>
      {/* <Toast.Body>
        
      </Toast.Body> */}
    </Toast>
  );

  return (
    <div className="login_container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title
            style={{
              paddingBottom: "2rem",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            <h2>Login</h2>
          </Card.Title>

          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            {loginErrorMessage ? (
              <Alert key="danger" variant="danger">
                <div>{loginErrorMessage}</div>
              </Alert>
            ) : (
              <></>
            )}
            {no_user_flag ? no_user_toast : <></>}
            {wrong_password_flag ? wrong_password_toast : <></>}

            <Button variant="dark" type="submit">
              {show_spinner ? <Spinner size="sm" animation="border" /> : <></>}{" "}
              Login
            </Button>
            <Form.Group className="mt-3">
              <Form.Label>
                Not a member ? <a href="register">Register</a>{" "}
              </Form.Label>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
