import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";

const Register = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const [register_success_toast, setRegister_Success_Toast] = useState(false);
  const [register_failure_toast, setRegister_Failure_Toast] = useState(false);
  const [show_spinner, setShow_spinner] = useState(false);

  
  function validateRegister() {
    setRegisterErrorMessage("");
    if (!name)
      setRegisterErrorMessage((pre) => `${pre} Name cannot be empty.`);
    if (!email)
      setRegisterErrorMessage((pre) => `${pre} Email cannot be empty.`);
    if (!password)
      setRegisterErrorMessage((pre) => `${pre} Password cannot be empty.`);
    if (password !== confirm_password)
      setRegisterErrorMessage((pre) => `${pre} Password mismatch.`);
  }

  async function updateDatabase() {
    try {
      const message = await addUser(name, email, password, confirm_password);
      if (message === "User created.") {
        setRegister_Success_Toast(true);
        setRegister_Failure_Toast(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirm_password("");
      } else if (message?.includes("already present.")) {
        setRegister_Failure_Toast(true);
        setRegister_Success_Toast(false);
      }
    } catch (exception) {
      console.error(exception);
    }
    setShow_spinner(false);
  }

  async function handleRegisterSubmit(event) {
    setShow_spinner(true);
    event.preventDefault();
    event.stopPropagation();
    validateRegister();
    updateDatabase();
  }

  const success_toast = (
    <Toast className="success_toast">
      <Toast.Header>
        <strong className="me-auto">User successfully created.</strong>
      </Toast.Header>
      <Toast.Body>
        <a href="/">
          <strong>Login</strong>
        </a>{" "}
        to continue.
      </Toast.Body>
    </Toast>
  );

  const failure_toast = (
    <Toast className="failure_toast">
      <Toast.Header>
        <strong className="me-auto">User already present.</strong>
      </Toast.Header>
      <Toast.Body>Please register with another email.</Toast.Body>
    </Toast>
  );

  return (
    <div className="register_container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title
            style={{
              paddingBottom: "2rem",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            <h2>Register</h2>
          </Card.Title>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name"
                placeholder="Enter Full Name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Control
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            {registerErrorMessage ? (
              <Alert key="danger" variant="danger">
                <div>{registerErrorMessage}</div>
              </Alert>
            ) : (
              <></>
            )}
            <div className="mb-3">
              {/* if(register_status === "success") ? {success_toast} : {failure_toast} */}
              {register_success_toast ? success_toast : <></>}
              {register_failure_toast ? failure_toast : <></>}
            </div>
            <Button className="register_button" variant="dark" type="submit">
              {show_spinner ? <Spinner size="sm" animation="border" /> : <></>}{" "}
              Register
            </Button>
            <Form.Group className="mt-3">
              <Form.Label>
                Already a member ? <a href="/">Login</a>{" "}
              </Form.Label>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
