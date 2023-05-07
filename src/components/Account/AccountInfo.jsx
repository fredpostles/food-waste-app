import React from "react";

const AccountInfo = ({ onInput, errors, user, hasChanged }) => {
  return (
    <form>
      <label htmlFor="email">
        Email:{" "}
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onInput={onInput}
          defaultValue={user.email}
        />
      </label>
      <p>{errors && errors.email}</p>
      <label htmlFor="name">
        Name:{" "}
        <input
          type="text"
          name="name"
          placeholder="First name"
          onInput={onInput}
          defaultValue={user.name}
        />
      </label>
      <p>{errors && errors.name}</p>
      <label htmlFor="surname">
        Surname:{" "}
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          onInput={onInput}
          defaultValue={user.surname}
        />
      </label>
      <p>{errors && errors.surname}</p>
      {hasChanged ? (
        <>
          <label htmlFor="password">Enter your password to confirm: </label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onInput={onInput}
            defaultValue={""}
          />
          <p>{errors && errors.password}</p>
        </>
      ) : null}
    </form>
  );
};

export default AccountInfo;
