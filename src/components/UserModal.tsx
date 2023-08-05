import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import store from "../redux/usersStore";
import {actionTypes} from "../redux/action-types";
import {User} from "../interfaces/User";
import React, {FormEvent} from "react";

interface UserModalProps {
  user: User | null;
  setSelectedUser: (user: User | null) => void;
  modalType: string;
}

function UserModal({user, setSelectedUser, modalType}: UserModalProps) {

  const {users} = store.getState();

  const handleClose = () => {
    setSelectedUser(null);
  };

  const isValidEmail = (email: string | null) => {
    const mailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return email?.match(mailFormat);
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (!isValidEmail(user.email)) {
      return;
    }

    const idList = users.map((user: User) => user.id);
    const index = idList.indexOf(user.id);

    // Check if email already exists on other users
    let emailList = users.map((user: User) => user.email);
    emailList.splice(index, 1);
    if (emailList.includes(user.email)) {
      alert('Email already exists, please try again.');
      return;
    }

    store.dispatch({type: actionTypes.UPDATE_USER, payload: user});
    handleClose();
  }

  const removeUser = () => {
    store.dispatch({type: actionTypes.REMOVE_USER, payload: user});
    handleClose();
  }

  return (
  <div
    className="modal show"
    style={user ? {display: 'block', position: 'initial'} : undefined}
  >
    {user && (
    <Modal
      show={!!user}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
      </Modal.Header>

      <Form className="needs-validation" onSubmit={onFormSubmit}>

        {(modalType === 'update' && (
          <Modal.Body>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="3">
                Name Title
              </Form.Label>
              <Col sm="9" className={"position-relative"}>
                <Form.Control
                  value={user.name.title}
                  contentEditable={true}
                  onChange={e => setSelectedUser({...user, name: {...user.name, title: e.target.value}})}
                  required={true}
                />
                <div className={`invalid-tooltip ${user.name.title.length ? '' : 'd-block'}`}>
                  Please provide a valid title.
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                First name
              </Form.Label>
              <Col sm="9" className="position-relative">
                <Form.Control
                  value={user.name.first}
                  onChange={e => setSelectedUser({...user, name: {...user.name, first: e.target.value}})}
                  required={true}
                />
                <div className={`invalid-tooltip ${user.name.first.length >= 3 ? '' : 'd-block'}`}>
                  Please provide a valid first name.
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Last Name
              </Form.Label>
              <Col sm="9" className="position-relative">
                <Form.Control
                  value={user.name.last}
                  onChange={e => setSelectedUser({...user, name: {...user.name, last: e.target.value}})}
                  required={true}
                />
                <div className={`invalid-tooltip ${user.name.last.length >= 3 ? '' : 'd-block'}`}>
                  Please provide a valid last name.
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="9" className="position-relative">
                <Form.Control
                  value={user.email}
                  onChange={e => setSelectedUser({...user, email: e.target.value})}
                  required={true}
                />
                <div
                  className={`invalid-tooltip ${user.email.length > 0 && isValidEmail(user.email) ? '' : 'd-block'}`}>
                  Please provide a valid email address.
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Street name
              </Form.Label>
              <Col sm="9" className="position-relative">
                <Form.Control
                  value={user.location.street}
                  onChange={e => setSelectedUser({
                    ...user, location: {...user.location, street: e.target.value}
                  })}
                  required={true}
                />
                <div className={`invalid-tooltip ${user.location.street.length >= 1 ? '' : 'd-block'}`}>
                  Please fill this field.
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Country
              </Form.Label>
              <Col sm="9" className="position-relative">
                <Form.Control
                  value={user.location.country}
                  onChange={e => setSelectedUser({...user, location: {...user.location, country: e.target.value}})}
                  required={true}
                />
                <div className={`invalid-tooltip ${user.location.country.length >= 1 ? '' : 'd-block'}`}>
                  Please fill this field.
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                City
              </Form.Label>
              <Col sm="9" className="position-relative">
                <Form.Control
                  value={user.location.city}
                  onChange={e => setSelectedUser({...user, location: {...user.location, city: e.target.value}})}
                  required={true}
                />
                <div className={`invalid-tooltip ${user.location.city.length >= 1 ? '' : 'd-block'}`}>
                  Please fill this field.
                </div>
              </Col>

            </Form.Group>
          </Modal.Body>
        )) || (
          <Modal.Body>
            <p className="mb-0">Are you sure you want to
              remove {user.name.title} {user.name.first} {user.name.last}?</p>
          </Modal.Body>
        )}


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          {(modalType === 'update' && (
            <Button variant="primary" type="submit">Save changes</Button>
          )) || (
            <Button variant="danger" onClick={removeUser}>Remove user</Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>)};
  </div>)
}

export default UserModal;