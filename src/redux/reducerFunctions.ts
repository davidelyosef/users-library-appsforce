import {User} from "../interfaces/User";
import {Gender} from "../enums/enums";

/**
 * Return new list without the selected user
 * @param user
 * @param list
 * @returns {*}
 */
export const removeUserFromList = (user: User, list: User[] | any): User[] => {
  if (!user || !list) {
    return [];
  }

  const idList = list.map((user: User) => user.id);
  const index = idList.indexOf(user.id);

  let newList = list;
  newList.splice(index, 1);

  return newList;
}

/**
 * Return new list with the updated user
 * @param user
 * @param list
 * @returns {*}
 */
export const updateUserInList = (user: User, list: User[] | any): User[] => {
  if (!user || !list) {
    return [];
  }

  const idList = list.map((item: User) => item.id);
  const index = idList.indexOf(user.id);

  let newList = list;
  newList[index] = user;

  return newList;
}

/**
 * Return new list with the added user
 * @param user
 * @param list
 */
export const addUserToList = (user: User, list: User[] | any): User[] => {
  if (!user || !list) {
      return [];
  }

  return [
    ...list,
    user
  ]
}

/**
 * Generate an empty user
 * @returns {{userImage: string, gender: string, name: {last: string, title: string, first: string}, location: {country: string, city: string, street: string}, id: string, email: string}}
 */
export const generateEmptyUser = (): User => {
  return {
    gender: Gender.male,
    name: {
      title: '',
      first: '',
      last: ''
    },
    email: '',
    location: {
      street: '',
      country: '',
      city: ''
    },
    userImage: '',
    id: generateRandomHash(32)
  }
}

const generateRandomHash = (length: number): string => {
  const characters = "0123456789abcdef";
  let hash = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hash += characters[randomIndex];
  }

  return hash;
}