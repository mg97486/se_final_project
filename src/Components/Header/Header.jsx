import "./Header.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleLogInClick,
  handleSignUpClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <h1 className="header__logo">Playlist IQ</h1>
        </Link>
      </div>
      {currentUser ? (
        <div className="header__right">
          <ToggleSwitch />
          {isLoggedIn && (
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-btn"
            >
              + Add playlist
            </button>
          )}
          <NavLink to="/profile" className="header__profile-link">
            <p className="header__username">{currentUser.name}</p>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="header__avatar"
            />
          </NavLink>
        </div>
      ) : (
        <div className="header__right">
          <button
            onClick={handleLogInClick}
            type="button"
            className=" header__log-in-btn"
          >
            Log In
          </button>
          <button
            onClick={handleSignUpClick}
            type="button"
            className=" header__register-btn"
          >
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
