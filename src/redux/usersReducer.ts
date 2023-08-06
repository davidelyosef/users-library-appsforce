import { Reducer } from 'redux';
import { actionTypes } from "./action-types";
import {addUserToList, removeUserFromList, updateUserInList} from "./reducerFunctions";
import {RootState} from "../interfaces/RootState";

const initialState: RootState = {
  users: [],
  filteredUsers: [],
};

const usersReducer: Reducer<RootState, any> = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: addUserToList(action.payload, state.users),
        filteredUsers: addUserToList(action.payload, state.filteredUsers),
      };
    case actionTypes.SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.payload,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        users: updateUserInList(action.payload, state.users),
        filteredUsers: updateUserInList(action.payload, state.filteredUsers),
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        users: removeUserFromList(action.payload, state.users),
        filteredUsers: removeUserFromList(action.payload, state.filteredUsers),
      };
    default:
      return state;
  }
};

export default usersReducer;
