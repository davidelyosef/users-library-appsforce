import { createStore, Store } from 'redux';
import usersReducer from "./usersReducer";
import {RootState} from "../interfaces/RootState";

const usersStore: Store<RootState, any> = createStore(usersReducer);

export default usersStore;