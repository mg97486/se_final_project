import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

export default function Profile({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return (
      <section className="profile profile_empty">
        <p className="profile__message">No profile data available.</p>
      </section>
    );
  }

  return (
    <section className="profile">
      <aside className="profile__sidebar">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="profile__avatar"
        />
        <h2 className="profile__name">{currentUser.name}</h2>
        <p className="profile__email">{currentUser.email}</p>
        <div className="profile__actions">
          <button
            type="button"
            className="profile__button profile__button_type_edit"
            onClick={onEditProfile}
          >
            Edit profile
          </button>
          <button
            type="button"
            className="profile__button profile__button_type_signout"
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="profile__content">
        <div className="profile__header">
          <h2 className="profile__title">My playlists</h2>
        </div>
        <p className="profile__subtitle">
          Your saved playlists will appear here once you add them.
        </p>
      </div>
    </section>
  );
}
