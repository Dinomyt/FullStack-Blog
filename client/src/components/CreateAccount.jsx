import { useState } from "react";
import { Container, Row, Col,Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const CreateAccount = () => {
  
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    
    const handleUser = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        let userData = {
            test1: Username,
            test2: Password
        }
        console.log(userData);
    }

    return (
    <>
      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            <Form>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={handleUser}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
              </Form.Group>

              <Button variant="outline-primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateAccount;
