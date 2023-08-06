import {User} from "./User";

export interface RootState {
    users: User[];
    filteredUsers: User[];
}