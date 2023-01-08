import React from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { selectContactId } from '../redux/contacts/contact.slice';

const ContactItem = ({ handleModalC, id, email, country }) => {
  const dispatch = useDispatch();

  const showContactDetails = () => {
    handleModalC();
    dispatch(selectContactId(id));
  }
  return (
    <ListGroup.Item onClick={showContactDetails} key={id}>
      <span>Id: {id} - </span>
      <span>{email ? email : 'No Email'} - </span>
      <span>{country}</span>
    </ListGroup.Item>
  );
}

export default ContactItem;