import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const NotFound = () => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>404 Not Found</Card.Title>
          <Card.Text>The required page is not found.</Card.Text>
          <Card.Link href="/">
            <Button variant="primary">Go to home</Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotFound;
