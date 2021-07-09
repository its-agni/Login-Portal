import React, { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const ctx = useContext(AuthContext);
  const newPasswordRef = useRef();
  const hist = useHistory();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDlHnXAVoHyaqP0SUas4vNkRvfYuYpAxzM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("SUCCESS");
        hist.replace("/");
      } else {
        alert("SOMETHING WENT WRONG!");
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
