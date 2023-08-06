import React, {useState} from "react";
import UserCard from "./UserCard";
import classes from '../style/Users.module.scss';
import UserModal from "./UserModal";
import {useSelector} from "react-redux";
import {User} from "../interfaces/User";
import {RootState} from "../interfaces/RootState";

function Users() {

  const users: User[] = useSelector((state: RootState): User[] => {
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
          <div className={"d-flex justify-content-center text-danger"}>
            There are no users to display.
          </div>
        )}
      </div>

      <UserModal user={selectedUser} setSelectedUser={setSelectedUser} modalType={modalType} />
    </section>
  );
}

export default React.memo(Users);