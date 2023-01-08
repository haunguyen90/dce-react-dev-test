import React from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { selectContactId } from '../redux/contacts/contact.slice';

const ContactItem = ({ handleModalC, id, email, country, first_name, last_name, phone_number }) => {
  const dispatch = useDispatch();

  const showContactDetails = () => {
    handleModalC();
    dispatch(selectContactId(id));
  }

  const fullName = () => {
    if (!first_name && !last_name) {
      return 'No Name';
    }
    return `${first_name} ${last_name}`;
  }

  return (
    <ListGroup.Item onClick={showContactDetails} key={id}>
      <span>Id: {id} - </span>
      <span>{fullName()} - </span>
      <span>{email ? email : 'No Email'} - </span>
      <span>{country}</span>
    </ListGroup.Item>
  );
}

export default ContactItem;