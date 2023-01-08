import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setOpenModalName } from '../redux/modal/modal.slice';
import ModalSelectors from '../redux/modal/modal.selectors';

import ModalPortal from '../components/ModalPortal';
import ModalAB from '../components/ModalAB';
import ModalC from '../components/ModalC';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openedModalName = useSelector(ModalSelectors.getOpenedModalName);

  const [showC, setShowC] = useState(false);

  const handleClose = () => {
    navigate('/');
  };
  const handleShow = (modal) => {
    if (modal === openedModalName) {
      return;
    }
    dispatch(setOpenModalName(modal));
    navigate(`/modal${modal}`);
  };

  const handleModalC = () => {
    setShowC(!showC);
  }

  const handleCloseModalC = () => {
    setShowC(false);
  }

  return (
    <div className="App">
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <Button className="button-a" onClick={() => handleShow('a')}>
            Button A
          </Button>
          <Button className="button-b" onClick={() => handleShow('b')}>Button B</Button>
        </div>
        <Routes>
          <Route
            path="/modala"
            element={
              <ModalPortal>
                <ModalAB
                  handleClose={handleClose}
                  handleModalC={handleModalC}
                  handleShow={handleShow}
                />
              </ModalPortal>
            }
          />
          <Route
            path="/modalb"
            element={
              <ModalPortal>
                <ModalAB
                  handleClose={handleClose}
                  handleModalC={handleModalC}
                  handleShow={handleShow}
                />
              </ModalPortal>
            }
          />
        </Routes>
        
        <ModalC
          handleClose={handleCloseModalC}
          show={showC}
        />
      </div>
    </div>
  );
}

export default App;
