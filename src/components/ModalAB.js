import React, { useEffect } from 'react';
import { Button, Modal, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import { map, debounce } from 'lodash';

import ContactSelectors from '../redux/contacts/contacts.selectors';
import ModalSelectors from '../redux/modal/modal.selectors';
import { fetchContactByPage, searchContact, evenCheckbox } from '../redux/contacts/contact.slice';

import ContactItem from './ContactItem';

const ModalAB = ({ handleModalC, handleClose, handleShow }) => { 
  const dispatch = useDispatch();

  const modalName = useSelector(ModalSelectors.getOpenedModalName);
  const contacts = useSelector(ContactSelectors.getContactList);
  const evenCheck = useSelector(state => state.contacts.evenCheck);
  const isFetching = useSelector(state => state.contacts.isFetching);
  const totalContacts = useSelector(state => state.contacts.total);
  const page = useSelector(state => state.contacts.page);
  const query = useSelector(state => state.contacts.query);

  useEffect(() => {
    const payload = {
      page: 1,
    };
    if (modalName === 'b') {
      payload.countryId = 226;
    };

    dispatch(fetchContactByPage(payload))
  }, [modalName, dispatch]);

  const handleEvenCheck = (e) => {
    dispatch(evenCheckbox(!evenCheck));
  }

  const fetchMoreContacts = () => {
    if (isFetching || Object.keys(contacts).length === 0 || query.email) {
      return;
    }
    const payload = {
      page: page + 1,
    };
    if (modalName === 'b') {
      payload.countryId = 226;
    };

    dispatch(fetchContactByPage(payload));
  };

  const renderContacts = () => {
    return map(contacts, (contact) => {
      const props = {
        id: contact.id,
        email: contact.email,
        country: contact.country.iso,
        first_name: contact.first_name,
        last_name: contact.last_name,
        phone_number: contact.phone_number,
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

  const debouncedSearch = (query) => {
    const searchContactQuery = () => dispatch(searchContact(query));
    return debounce(searchContactQuery, 500);
  }

  const onHandleSearch = (e) => {
    e.preventDefault();
    const query = {
      email: e.target.value,
    };
    const debounced = debouncedSearch({ query })
    debounced();

  }

  const loader = isFetching ? <div className="loader" key={0}>Loading ...</div> : null;
  
  return (
    <Modal
      show={true}
      onHide={handleClose}
      size="lg"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title>Modal {modalName.toLocaleUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row h-100 justify-content-around align-items-center">
            <Button
              className="button-a"
              onClick={(e) => handleShow('a')}
            >
              All Contacts
            </Button>

            <Button
              className="button-b"
              onClick={(e) => handleShow('b')}
            >
              US Contacts
            </Button>

            <Button className="button-c" onClick={handleClose}>
              Close
            </Button>
          </div>

          <div className="row h-100 justify-content-around align-items-center">
            <div className="input-group search-group">
              <input onChange={onHandleSearch} type="search" className="form-control rounded" placeholder="Search Email" aria-label="Search" aria-describedby="search-addon" />
              <button type="button" className="btn btn-primary">Search</button>
            </div>
          </div>         

          <Card className='contact-list'>
            <Card.Header>Contact List</Card.Header>
            <ListGroup variant="flush">
              <Scrollbars className="scrollbars" style={{ height: 300 }}>
                <InfiniteScroll
                  pageStart={1}
                  loadMore={fetchMoreContacts}
                  hasMore={hasMoreContacts()}
                  loader={loader}
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

export default ModalAB;