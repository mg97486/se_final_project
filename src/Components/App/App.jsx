import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UploadSection from "../UploadSection/UploadSection";
import ResultsSection from "../ResultsSection/ResultsSection";
import About from "../AboutSection/AboutSection";
import LoginModal from "../LoginModal/LoginModal";
import * as api from "../../../server/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getTrack, extractTrackId } from "../../../server/api";

import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [track, setTrack] = useState(null);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/");
  };

  function handleAnalyze(link) {
    const id = extractTrackId(link);

    if (!id) {
      setError("Invalid Spotify link");
      return;
    }

    setError("");
    api
      .getTrack(id)
      .then((trackData) => {
        setTrack({
          name: trackData.name,
          artist: trackData.artists[0].name,
          image: trackData.album.images[0].url,
        });

        const popularity = trackData.popularity;

        const generatedPlaylists = [];

        if (popularity > 80) {
          generatedPlaylists.push({
            id: 1,
            name: "Top Hits",
            score: 95,
            followers: "500k",
            image: trackData.album.images[0].url,
          });
        }

        if (trackData.name.toLowerCase().includes("love")) {
          generatedPlaylists.push({
            id: 2,
            name: "Love Songs",
            score: 89,
            followers: "540k",
            image: trackData.album.images[0].url,
          });
        }

        if (trackData.album.name.toLowerCase().includes("chill")) {
          generatedPlaylists.push({
            id: 3,
            name: "Chill Vibes",
            score: 92,
            followers: "200k",
            image: trackData.album.images[0].url,
          });
        }

        if (trackData.album.name.toLowerCase().includes("indie")) {
          generatedPlaylists.push({
            id: 4,
            name: "Indie Hits",
            score: 88,
            followers: "150k",
            image: trackData.album.images[0].url,
          });
        }

        if (trackData.name.toLowerCase().includes("country")) {
          generatedPlaylists.push({
            id: 5,
            name: "Country Hits",
            score: 90,
            followers: "80k",
            image: trackData.album.images[0].url,
          });
        }

        generatedPlaylists.push({
          id: 3,
          name: "Indie Chill",
          score: Math.floor(Math.random() * 20) + 75,
          followers: trackData.popularity > 50 ? "120k" : "30k",
          image: trackData.album.images[0].url,
        });

        setPlaylists(generatedPlaylists);
      })

      .catch(() => {
        setError("Something went wrong. Try again.");
      });
  }

  function generatePlaylists(features) {
    const playlists = [];

    if (features.energy > 0.8) {
      playlists.push({
        id: 1,
        name: "Gym Heat",
        score: 95,
        followers: "84k",
      });
    }

    if (features.danceability > 0.7) {
      playlists.push({
        id: 2,
        name: "Dance Pop",
        score: 89,
        followers: "120k",
      });
    }

    if (features.acousticness > 0.7) {
      playlists.push({
        id: 3,
        name: "Acoustic Chill",
        score: 91,
        followers: "45k",
      });
    }

    if (features.valence < 0.4) {
      playlists.push({
        id: 4,
        name: "Late Night Sad Songs",
        score: 88,
        followers: "76k",
      });
    }

    return playlists;
  }

  const handleUpdateUser = (userData) => {
    return api
      .updateUserInfo(userData)
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeActiveModal();
      })

      .catch((err) => {
        console.error("Failed to update Profile:", err);
      });
  };

  const handleLogInClick = () => {
    setActiveModal("log-in");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleOpenEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const registerUser = (userData) => {
    const newUser = {
      name: userData.name,
      avatar: userData.avatar,
      email: userData.email,
      password: userData.password,
    };

    api
      .register(newUser)
      .then((res) => {
        if (res) {
          console.log("Registration successful, logging in...");
          loginUser({ email: userData.email, password: userData.password });
          closeActiveModal();
        }
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const loginUser = (userData) => {
    const existingUser = {
      email: userData.email,
      password: userData.password,
    };

    api
      .signIn(existingUser)
      .then((res) => {
        console.log("LOGIN RESPONSE:", res);

        if (res && res.user) {
          setCurrentUser(res.user);
          setIsLoggedIn(true);
          closeActiveModal();
          return;
        }

        throw new Error("Invalid login response");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setIsLoggedIn(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <main className="page__content">
          <Header
            handleAddClick={handleAddClick}
            handleLogInClick={handleLogInClick}
            handleSignUpClick={handleSignUpClick}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onEditProfile={handleOpenEditProfile}
                    onSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <>
                  <UploadSection onAnalyze={handleAnalyze} />

                  <ResultsSection
                    playlists={playlists}
                    track={track}
                    error={error}
                  />
                </>
              }
            />
          </Routes>
        </main>
        <LoginModal
          isOpen={activeModal === "log-in"}
          onClose={closeActiveModal}
          onSubmit={loginUser}
          onSignUpClick={handleSignUpClick}
        />
        <RegisterModal
          isOpen={activeModal === "sign-up"}
          onClose={closeActiveModal}
          onSubmit={registerUser}
          onLogInClick={handleLogInClick}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={closeActiveModal}
          onSubmit={handleUpdateUser}
        />
      </div>
      <Footer />
    </CurrentUserContext.Provider>
  );
}
