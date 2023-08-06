import {Gender} from "./enums/enums";

export const serverUrl = 'https://randomuser.me/api/?results=10&nat=us,dk,fr,gb';
export const randomUserImageUrl = (genders: Gender) => {
    return `https://randomuser.me/api/portraits/med/${genders}/${Math.floor(Math.random() * 100)}.jpg`;
};