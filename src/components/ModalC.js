import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ContactSelectors from '../redux/contacts/contacts.selectors';

const ModalC = ({ show, handleClose }) => {
  const contact = useSelector(ContactSelectors.selectContactById);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modal C</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row h-100 justify-content-center align-items-center">
          <Card key="primary">
            <Card.Header>Contact Id: {contact?.id}</Card.Header>
    
            <Card.Body>
              <Card.Title>{contact?.email}</Card.Title>
              <Card.Text>
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalC;