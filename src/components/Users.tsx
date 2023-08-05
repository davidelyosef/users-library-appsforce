import React, {useEffect, useState} from "react";
import UserCard from "./UserCard";
import classes from '../style/Users.module.scss';
import UserModal from "./UserModal";
import {useSelector} from "react-redux";
import {User} from "../interfaces/User";

function Users() {

  const users: User[] = useSelector((state: any) => {
    return state.filteredUsers
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<string>('update');

    return (
    <section className="mb-5">
      <div className="container">
        {users && users.length ? (
          <div className={classes.users}>
            {users?.map(user => (
              <UserCard key={user.id} user={user} setSelectedUser={setSelectedUser} setModalType={setModalType} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "red",
            }}
          >
            The users do not exist
          </div>
        )}
      </div>

      <UserModal user={selectedUser} setSelectedUser={setSelectedUser} modalType={modalType} />
    </section>
  );
}

export default Users;