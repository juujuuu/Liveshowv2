import React, { useState } from 'react';
    import Button from 'react-bootstrap/Button';
    import Modal from 'react-bootstrap/Modal';
function PopUp(props) {
    
    

    
      const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
      return (
        <>
        <div className='router-link router-link--profile-button'>
          <Button variant="dark" className='p-2' onClick={handleShow}>
            <span className=''>Order Lead Retrieval</span>
          </Button>
    </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
           
              <Modal.Title>
              <div className="  exhibitor-slide__logo">
                    {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => this.handleSwitchMode("PROFILE", id)}> */}
                    {/* <Link className="router-link" to={getProfilePath(debug, local, id)} onClick={() => handleSwitchMode("PROFILE", id)}> */}
                        <img className="img-fluid" src={props.logo} alt={props.pageTitle} />
          
                        </div>
                </Modal.Title>
            
            </Modal.Header>
            <Modal.Body>Please confirm you are representing <b> {props.pageTitle}</b>
          </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" className='' onClick={handleClose}>
              No return to list
              </Button>
              <a href={props.link}>
              <Button variant="success" className='' onClick={handleClose}>
              Yes proceeded to payment
              </Button></a>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

export default PopUp;