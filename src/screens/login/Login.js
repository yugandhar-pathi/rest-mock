import React, { useState } from "react";
import { Box, Form, Button, Heading } from "grommet";
import { withRouter } from "react-router-dom";
import { FormFieldLabel, NotificationLayer } from "../../components";
import { get } from "../../api";
import { authURL } from "../../url";

const Login = ({ history }) => {
  const [validUser, setValidUser] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const onLogin = formValues => {
    get({
      url: authURL,
      data: { userid: formValues.userid, password: formValues.password }
    })
      .then(resp => {
        if (resp.data === "OK") {
          history.push("/HomePage");
        } else {
          setErrMsg("Invalid username or password");
          setValidUser(false);
        }
      })
      .catch(error => {
        setErrMsg("Connection Timedout, please try after some time.");
        setValidUser(false);
      });
  };

  const onClose = () => {
    setValidUser(true);
  };

  return (
    <Box align="center" justify="center">
      <Heading>Welocome to React!</Heading>
      <Form onSubmit={({ value }) => onLogin(value)} data-testid="login-form">
        <FormFieldLabel
          data-testid="userid"
          label="UserId"
          name="userid"
          required
        />
        <FormFieldLabel
          label="Password"
          name="password"
          type="password"
          data-testid="password"
          required
        />
        <Button type="submit" label="Login" primary data-testid="loginButton" />
        {!validUser && (
          <NotificationLayer
            dataTestid="user-notification"
            notificationText={errMsg}
            onClose={onClose}
          />
        )}
      </Form>
    </Box>
  );
};

export default withRouter(Login);
