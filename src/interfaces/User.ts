export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  userImage: string;
  location: {
    country: string;
    city: string;
    street: string;
  }
  id: string;
}