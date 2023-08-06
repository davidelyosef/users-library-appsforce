import Button from 'react-bootstrap/Button';
import {Form, InputGroup} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import AddUserModal from "./AddUserModal";
import "../style/InputGroup.scss";
import {User} from "../interfaces/User";
import {useSelector} from "react-redux";
import usersStore from "../redux/usersStore";
import {actionTypes} from "../redux/action-types";
import FilterCheckboxes from "./FilterCheckboxes";
import {FilterTypes} from "../enums/enums";
import {RootState} from "../interfaces/RootState";

function UserHandler() {

  const allUsers: User[] = useSelector((state: RootState) => state.users);
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>(FilterTypes.name);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    filterUsers();
  }, [filter]);

  useEffect(() => {
    filterUsers();
  }, [inputValue])

  /**
   * Filters the users according to the selected filter and input value.
   */
  const filterUsers = () => {
    let filteredUsers = allUsers;
    switch (filter) {
      case FilterTypes.email:
        filteredUsers = allUsers.filter(user => user[filter].toLowerCase().includes(inputValue));
        break;
      case FilterTypes.name :
        filteredUsers = allUsers.filter(user => {
          const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
          return fullName.toLowerCase().includes(inputValue);
        });
        break;
      case FilterTypes.id :
        filteredUsers = allUsers.filter(user => user.id.includes(inputValue));
        break;
      case FilterTypes.location :
        filteredUsers = allUsers.filter(user => {
          const {location} = user;
          const fullAddress = `${location.street} ${location.city} ${location.country}`;
          return fullAddress.toLowerCase().includes(inputValue);
        });
        break;
      default:
        filteredUsers = allUsers
    }
    usersStore.dispatch({type: actionTypes.SET_FILTERED_USERS, payload: filteredUsers});
  }

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = (e !== null) ? e?.target.value.toLowerCase() : filter;
    setInputValue(value);
  }

  const handleAddUser = (): void => {
    setShowAddUserModal(true);
  }

  return (
    <section className="py-4">
      <div className="container">
        <div
          className="d-flex gap-3 align-items-center flex-column flex-lg-row gap-lg-1 gap-xl-3 justify-content-lg-between">

          <div className="d-flex col-12 col-lg-4 col-xl-3 gap-2 flex-lg-shrink-2 w-lg-50 pr-2">
            <Button className={"flex-shrink-0"} onClick={handleAddUser}>
              Add User
            </Button>

            <InputGroup>
              <Form.Control
                aria-describedby="inputGroup-sizing-sm"
                onChange={onInputChanged}
                placeholder={"Search for a user"}
              />
            </InputGroup>
          </div>

          <FilterCheckboxes filter={filter} setFilter={setFilter} />

        </div>

        <AddUserModal showAddUserModal={showAddUserModal} setShowAddUserModal={setShowAddUserModal}/>
      </div>
    </section>
  );
}

export default UserHandler;