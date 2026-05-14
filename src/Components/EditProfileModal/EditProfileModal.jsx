import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./EditProfileModal.css";

const EditProfileModal = ({ isOpen, onSubmit, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };
  const { values, handleChange, setValues, resetForm } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen, currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit({ name: values.name, avatar: values.avatar })
        .then(() => resetForm())
        .catch((err) => console.error(err));
    }
  }

  return (
    <ModalWithForm
      name="edit-profile"
      title="Edit Profile"
      buttonText={"Save changes"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        ></input>
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar {""}
        <input
          type="text"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
