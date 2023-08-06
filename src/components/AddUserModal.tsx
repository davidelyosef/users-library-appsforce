import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import store from "../redux/usersStore";
import {actionTypes} from "../redux/action-types";
import {ChangeEvent, FormEvent, useState} from "react";
import {useSelector} from "react-redux";
import {User} from "../interfaces/User";
import {generateEmptyUser} from "../redux/reducerFunctions";
import {randomUserImageUrl} from "../config";
import {Gender} from "../enums/enums";
import {RootState} from "../interfaces/RootState";

interface AddUserModalProps {
  showAddUserModal: boolean;
  setShowAddUserModal: (adding: boolean) => void;
}

function AddUserModal({showAddUserModal, setShowAddUserModal}: AddUserModalProps) {

  const allUsers = useSelector((state: RootState) => state.users);
  const [validated, setValidated] = useState<boolean>(false);
  const [user, setUser] = useState<User>(generateEmptyUser());

  const handleValidate = (): void => {
    if (!validated) {
      setValidated(true);
    }
  }

  const handleClose = (): void => {
    setShowAddUserModal(false);
  };

  const isValidEmail = (email: string): boolean => {
    if (email.length < 3) {
      return false;
    }

    const mailFormat = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return email.match(mailFormat) !== null;
  }

  const addUser = (e: FormEvent): void => {
    e.preventDefault();

    if (!isValidEmail(user.email)) {
      return;
    }

    let emailList = allUsers.map((user: User) => user.email);

    if (emailList.includes(user.email)) {
      alert('Email already exists, please try again.');
      return;
    }

    user.userImage = getRandomUserPicture(user.gender);

    store.dispatch({type: actionTypes.ADD_USER, payload: user});
    setValidated(false);
    setUser(generateEmptyUser());
    handleClose();
  }

  const getRandomUserPicture = (gender: Gender = Gender.male) => {
    switch (gender) {
      case Gender.male:
        return randomUserImageUrl(Gender.men);
      case Gender.female:
        return randomUserImageUrl(Gender.women);
      default:
        return "";
    }
  }

  return (
      <div
          className="modal show"
          style={user ? { display: 'block', position: 'initial' } : undefined}
      >
    <Modal
      show={showAddUserModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        Add new user
      </Modal.Header>

      <Form className="needs-validation" onSubmit={addUser}>

        <Modal.Body>

          <Form.Select aria-label="select user gender" className="mb-3" defaultValue={Gender.male}
                       onChange={e => setUser({...user, gender: Gender[e.target.value as keyof typeof Gender]})}>
            <option value={Gender.male}>male</option>
            <option value={Gender.female}>female</option>
          </Form.Select>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              Name Title
            </Form.Label>
            <Col sm="9" className={"position-relative"}>
              <Form.Control
                value={user.name.title}
                contentEditable={true}
                onChange={e => setUser({...user, name: {...user.name, title: e.target.value}})}
                required={true}
              />
              <div className={`invalid-tooltip ${validated && !user.name.title.length ? 'd-block' : ''}`}>
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
                onChange={e => setUser({...user, name: {...user.name, first: e.target.value}})}
                required={true}
              />
              <div className={`invalid-tooltip ${validated && !(user.name.first.length >= 3) ? 'd-block' : ''}`}>
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
                onChange={e => setUser({...user, name: {...user.name, last: e.target.value}})}
                required={true}
              />
              <div className={`invalid-tooltip ${validated && !(user.name.last.length >= 3) ? 'd-block' : ''}`}>
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
                onChange={e => setUser({...user, email: e.target.value})}
                required={true}
              />
              <div
                className={`invalid-tooltip ${validated && !isValidEmail(user.email) ? 'd-block' : ''}`}>
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
                onChange={e => setUser({
                  ...user, location: {...user.location, street: e.target.value}
                })}
                required={true}
              />
              <div className={`invalid-tooltip ${validated && !user.location.street.length ? 'd-block' : ''}`}>
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
                onChange={e => setUser({...user, location: {...user.location, country: e.target.value}})}
                required={true}
              />
              <div className={`invalid-tooltip ${validated && !user.location.country.length ? 'd-block' : ''}`}>
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
                onChange={e => setUser({...user, location: {...user.location, city: e.target.value}})}
                required={true}
              />
              <div className={`invalid-tooltip ${validated && !user.location.city.length ? 'd-block' : ''}`}>
                Please fill this field.
              </div>
            </Col>

          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit" onClick={handleValidate}>Add User</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </div>)
}

export default AddUserModal;