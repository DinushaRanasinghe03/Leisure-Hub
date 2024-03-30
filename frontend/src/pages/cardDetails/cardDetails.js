import react from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './cardDetails.css';

function BasicCardDetailsForm() {
  return (
    <div className="form-container"> 
    <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name on card</Form.Label>
        <Form.Control type="text" placeholder="name on card" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Card Number</Form.Label>
        <Form.Control type="text" placeholder="card number" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control type="text" placeholder="exp date" />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Security Code</Form.Label>
        <Form.Control type="text" placeholder="CVV" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Confirm Payment
      </Button>
    </Form>
    </div>
  );
}

export default BasicCardDetailsForm;

