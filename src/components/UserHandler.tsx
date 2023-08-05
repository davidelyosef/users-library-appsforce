import Button from 'react-bootstrap/Button';
import {Form, InputGroup} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import AddUserModal from "./AddUserModal";
import "../style/InputGroup.scss";
import {User} from "../interfaces/User";
import {useSelector} from "react-redux";
import usersStore from "../redux/usersStore";
import {actionTypes} from "../redux/action-types";
import FilterCheckboxes from "./FilterCheckboxes";

function UserHandler() {

  const allUsers: User[] = useSelector((state: any) => state.users);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [filter, setFilter] = useState("email");

  const handleAddUser = () => {
    setShowAddUserModal(true);
  }

  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    let filteredUsers = allUsers;
    switch (filter) {
      case "email":
        filteredUsers = allUsers.filter(user => user[filter].toLowerCase().includes(value));
        break;
      case "name" :
        filteredUsers = allUsers.filter(user => {
          const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
          return fullName.toLowerCase().includes(value);
        });
        break;
      case "id" :
        filteredUsers = allUsers.filter(user => user.id.includes(value));
        break;
      case "location" :
        filteredUsers = allUsers.filter(user => {
          const {location} = user;
          const fullAddress = `${location.street} ${location.city} ${location.country}`;
          return fullAddress.toLowerCase().includes(value);
        });
        break;
      default:
        filteredUsers = allUsers
    }

    usersStore.dispatch({type: actionTypes.SET_FILTERED_USERS, payload: filteredUsers});
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
                onChange={filterUsers}
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