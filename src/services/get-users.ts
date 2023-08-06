import {serverUrl} from "../config";

export const getUsers = async () => {
  const response = await fetch(serverUrl);

  if(!response.ok) {
    const message = `Server error: ${response.status}`;
    throw new Error(message);
  }

  const users = await response
    .json()
    .then((data) => {
      const users = [...data.results];
      return users.map(user => {
        return {
          name: user.name,
          email: user.email,
          gender: user.gender,
          userImage: user.picture.medium,
          id: user.login.uuid,
          location: {
            country: user.location.country,
            city: user.location.city,
            street: user.location.street.name,
          },
        }
      });
    });

  return users;
}