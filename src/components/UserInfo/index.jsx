import React from "react";
import styles from "./UserInfo.module.scss";
import altUser from "../../assets/ava.jpg";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <div>
        {avatarUrl ? (
          <img className={styles.avatar} src={avatarUrl} />
        ) : (
          <img className={styles.avatar} src={altUser} />
        )}
      </div>
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
