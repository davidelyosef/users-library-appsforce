import { createStore, Store } from 'redux';
import usersReducer, { RootState } from "./usersReducer";

const usersStore: Store<RootState, any> = createStore(usersReducer);

export default usersStore;