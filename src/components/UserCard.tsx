import {Card} from "react-bootstrap";
import "../style/UserCard.scss";
import {User} from "../interfaces/User";

interface UserCardProps {
  user: User;
  setSelectedUser: (user: User) => void;
  setModalType: (modalType: 'update' | 'remove') => void;
}

function UserCard({ user, setSelectedUser, setModalType }: UserCardProps) {

  const onUpdate = () => {
  setSelectedUser(user);
  setModalType('update');
  }

  const onRemove = () => {
  setSelectedUser(user);
  setModalType('remove');
  }

  return (
  <Card>
    <Card.Img variant="top" src={user.userImage} alt={user.name.title} />

    <button className="card-btn card-update" title="update" onClick={onUpdate}>
      &#9998;
    </button>

    <button className="card-btn card-remove" title="remove" onClick={onRemove}>
      &#10005;
    </button>

    <div className="card-body text-start">
      <div className={"card-title"}>
        <span>{user.name.title} </span>
        <span>{user.name.first} </span>
        <span>{user.name.last}</span>
      </div>

      <a href={`mailto:${user.email}`}>
        {user.email}
      </a>

      <div className={"card-text"}>
        <div><b>Street:</b> {user.location.street}</div>
        <div><b>City:</b> {user.location.city}</div>
        <div><b>Country:</b> {user.location.country}</div>
      </div>
    </div>

  </Card>
  );
}

export default UserCard;