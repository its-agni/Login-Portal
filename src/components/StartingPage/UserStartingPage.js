import React from "react";
import classes from "./StartingPageContent.module.css";
import welcome from "../../assets/welcome.jpg";

const UserStartingPage = () => {
  return (
    <section className={classes.starting}>
      <h1>Hello User!</h1>
      <img
        src={welcome}
        alt="Welcome User!"
        style={{ width: "50%", height: "50%" }}
      />
    </section>
  );
};

export default UserStartingPage;
