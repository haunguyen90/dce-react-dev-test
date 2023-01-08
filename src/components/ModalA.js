import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { map } from 'lodash';

import ContactSelectors from '../redux/contacts/contacts.selectors';
import { fetchContactAsync, evenCheckbox } from '../redux/contacts/contact.slice';

import ContactItem from './ContactItem';

const ModalA = ({ handleModalC, handleClose, show }) => { 
  const dispatch = useDispatch();
  const contacts = useSelector(ContactSelectors.getContactList);
  const evenCheck = useSelector(state => state.contacts.evenCheck);

  useEffect(() => {
    dispatch(fetchContactAsync())
  }, []);

  const handleEvenCheck = (e) => {
    dispatch(evenCheckbox(!evenCheck));
  }

  const renderContacts = () => {
    return map(contacts, (contact) => {
      const props = {
        id: contact.id,
        email: contact.email,
        country: contact.country.iso
      }
      return (
        <ContactItem
          handleModalC={handleModalC}
          key={contact.id}
          {...props}
        />
      )
    })
  }
  
  return (
    <Modal
      show={true}
      onHide={handleClose}
      size="lg"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title>Modal A</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row h-100 justify-content-around align-items-center">
            <Button variant="primary">
              All Contacts
            </Button>

            <Button variant="primary">
              US Contacts
            </Button>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>

          <Card className='contact-list'>
            <Card.Header>Contact List</Card.Header>
            <ListGroup variant="flush">
              <Scrollbars className="scrollbars" style={{ height: 300 }}>
                {renderContacts()}
              </Scrollbars>
            </ListGroup>
          </Card>
          

          <div className="row h-100 justify-content-center align-items-center">

          </div>
   
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
          <div className="even-checkbox">
            <label>
              <input type="checkbox" onChange={handleEvenCheck} checked={evenCheck} />
              <span>Only even</span>
            </label>
          </div>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalA;