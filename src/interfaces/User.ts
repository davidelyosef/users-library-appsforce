import {Gender} from "../enums/enums";

export interface User {
  name: UserName;
  email: string;
  gender: Gender;
  userImage: string;
  location: UserLocation;
  id: string;
}

interface UserName {
  title: string;
  first: string;
  last: string;
}

interface UserLocation {
  country: string;
  city: string;
  street: string;
}