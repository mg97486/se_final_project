import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { register } from "../../../server/api";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onLogInClick, onSubmit }) => {
  const defaultValues = { email: "", password: "", name: "", avatarUrl: "" };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const payload = {
      email: values.email,
      password: values.password,
      name: values.name,
    };
    if (values.avatarUrl) payload.avatar = values.avatarUrl;

    onSubmit(payload);
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="sign-up"
      title="Sign Up"
      buttonText={"Sign Up"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="Email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="text"
          name="avatarUrl"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          value={values.avatarUrl}
          onChange={handleChange}
        />
      </label>
      <div className="register__button-group">
        <button
          type="button"
          onClick={onLogInClick}
          className="register__modal-link"
        >
          <p className="register__modal-text">or Log in</p>
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
