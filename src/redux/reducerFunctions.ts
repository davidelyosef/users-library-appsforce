import {User} from "../interfaces/User";

/**
 * Return new list without the selected user
 * @param user
 * @param list
 * @returns {*}
 */
export const removeUserFromList = (user: User, list: User[] | any) => {
  if (!user || !list) {
    return;
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
export const updateUserInList = (user: User, list: User[] | any) => {
  if (!user || !list) {
    return;
  }

  const idList = list.map((item: User) => item.id);
  const index = idList.indexOf(user.id);

  let newList = list;
  newList[index] = user;

  return newList;
}

/**
 * Generate an empty user
 * @returns {{userImage: string, gender: string, name: {last: string, title: string, first: string}, location: {country: string, city: string, street: string}, id: string, email: string}}
 */
export const generateEmptyUser = () => {
  return {
    gender: 'male',
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
    id: ''
  }
}
