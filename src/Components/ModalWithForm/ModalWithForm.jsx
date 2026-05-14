import "./ModalWithForm.css";

function ModalWithForm({
  name,
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {Array.isArray(children) ? (
            <>
              {children.filter(
                (child) =>
                  child?.props?.className !== "login__button-group" &&
                  child?.props?.className !== "register__button-group",
              )}
              <div className="modal__submit-box">
                <button type="submit" className="modal__submit">
                  {buttonText}
                </button>
                {children.find(
                  (child) =>
                    child?.props?.className === "login__button-group" ||
                    child?.props?.className === "register__button-group",
                )}
              </div>
            </>
          ) : (
            <>
              {children}
              <div className="modal__submit-box">
                <button type="submit" className="modal__submit">
                  {buttonText}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
