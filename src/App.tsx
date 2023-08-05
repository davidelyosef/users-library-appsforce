import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import usersStore from "./redux/usersStore";
import Masthead from "./components/Masthead";
import UserHandler from "./components/UserHandler";
import Users from "./components/Users";
import {useEffect, useState} from "react";
import {getUsers} from "./services/get-users";
import {actionTypes} from "./redux/action-types";
import {User} from "./interfaces/User";

function App() {

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(users => {

      if (!users) {
        return;
      }

      setFilteredUsers(users);
      console.log(users);

      usersStore.dispatch({type: actionTypes.SET_USERS, payload: users});
      usersStore.dispatch({type: actionTypes.SET_FILTERED_USERS, payload: users});
    });
  }, []);

  return (
      <>
        <Masthead />
        <UserHandler />
        <Users />
      </>
  );
}

export default App;
