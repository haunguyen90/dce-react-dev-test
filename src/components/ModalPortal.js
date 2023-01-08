import React from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = (props) => createPortal(
  <div>
    {props.children}
  </div>,
  document.getElementById('modal_root')
);

export default ModalPortal;