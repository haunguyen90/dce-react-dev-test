import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Routes, Route, useNavigate } from "react-router-dom";

import ModalPortal from '../components/ModalPortal';
import ModalA from '../components/ModalA';
import ModalC from '../components/ModalC';

const App = () => {
  const navigate = useNavigate();

  const [showC, setShowC] = useState(false);

  const handleClose = () => {
    navigate('/');
    // setShow({
    //   modalA: false,
    //   modalB: false,
    //   modalC: false,
    // })
  };
  const handleShow = (modal) => {
    // setShow({
    //   ...show,
    //   [modal]: true,
    // });
    navigate('/modala');
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
          <Button className="button-a" onClick={() => handleShow('modalA')}>
            Button A
          </Button>
          <Button className="button-b" >Button B</Button>
        </div>
        <Routes>
          <Route
            path="/modala"
            element={
              <ModalPortal>
                <ModalA
                  handleClose={handleClose}
                  handleModalC={handleModalC}
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
