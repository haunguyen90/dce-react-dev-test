import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import { map } from 'lodash';

import ContactSelectors from '../redux/contacts/contacts.selectors';
import { fetchContactByPage, fetchContactAsync, evenCheckbox } from '../redux/contacts/contact.slice';

import ContactItem from './ContactItem';

const ModalA = ({ handleModalC, handleClose, show }) => { 
  const dispatch = useDispatch();
  const contacts = useSelector(ContactSelectors.getContactList);
  const evenCheck = useSelector(state => state.contacts.evenCheck);
  const isFetching = useSelector(state => state.contacts.isFetching);
  const totalContacts = useSelector(state => state.contacts.total);
  const page = useSelector(state => state.contacts.page);

  useEffect(() => {
    dispatch(fetchContactByPage({ page: 1 }))
  }, []);

  const handleEvenCheck = (e) => {
    dispatch(evenCheckbox(!evenCheck));
  }

  const fetchMoreContacts = () => {
    if (isFetching) {
      return;
    }
    dispatch(fetchContactByPage({ page: page + 1 }))
  };

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

  const hasMoreContacts = () => Object.keys(contacts).length < totalContacts;
  
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
            <Button className="button-a">
              All Contacts
            </Button>

            <Button className="button-b">
              US Contacts
            </Button>

            <Button className="button-c" onClick={handleClose}>
              Close
            </Button>
          </div>

          <Card className='contact-list'>
            <Card.Header>Contact List</Card.Header>
            <ListGroup variant="flush">
              <Scrollbars className="scrollbars" style={{ height: 300 }}>
                <InfiniteScroll
                  pageStart={1}
                  loadMore={fetchMoreContacts}
                  hasMore={hasMoreContacts()}
                  loader={<div className="loader" key={0}>Loading ...</div>}
                  useWindow={false}
                >
                  {renderContacts()}
                </InfiniteScroll>
              </Scrollbars>
            </ListGroup>
          </Card>
          
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

/** 
 * 
   <Scrollbars className="scrollbars" style={{ height: 300 }}>
                {renderContacts()}
              </Scrollbars>
 * 
*/

export default ModalA;