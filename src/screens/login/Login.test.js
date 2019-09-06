import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, act } from "@testing-library/react";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";

import Login from "./Login";

function renderWithRouter(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Grommet theme={grommet}>
        <Router history={history}>{ui}</Router>
      </Grommet>
    ),
    history
  };
}

const delay = async timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

test("test Login - valid user", async () => {
  const route = "/";
  const { history, getByTestId } = renderWithRouter(<Login />, {
    route
  });

  act(() => {
    fireEvent.change(getByTestId("userid"), {
      target: { value: "user" }
    });
    fireEvent.change(getByTestId("password"), { target: { value: "test" } });
  });

  act(() => {
    fireEvent.click(getByTestId("loginButton"));
  });

  await delay(300);

  expect(history.location.pathname).toBe("/HomePage");
});

test("test Login - not valid user", async () => {
  const route = "/";
  const { container, getByTestId, findByTestId } = renderWithRouter(<Login />, {
    route
  });

  act(() => {
    fireEvent.change(getByTestId("userid"), {
      target: { value: "invalid_user" }
    });
    fireEvent.change(getByTestId("password"), { target: { value: "test" } });
  });

  act(() => {
    fireEvent.click(getByTestId("loginButton"));
  });

  await findByTestId("user-notification");

  expect(getByTestId("user-notification").textContent).toBe(
    "Invalid username or password"
  );

  act(() => {
    fireEvent.click(getByTestId("closeNotification"));
  });

  await delay(300);
});

test("test Login - timeout use case", async () => {
  const route = "/";
  const { getByTestId, findByTestId } = renderWithRouter(<Login />, {
    route
  });

  act(() => {
    fireEvent.change(getByTestId("userid"), {
      target: { value: "timeout_user" }
    });
    fireEvent.change(getByTestId("password"), { target: { value: "test" } });
  });

  act(() => {
    fireEvent.click(getByTestId("loginButton"));
  });

  await findByTestId("user-notification");

  expect(getByTestId("user-notification").textContent).toBe(
    "Connection Timedout, please try after some time."
  );

  act(() => {
    fireEvent.click(getByTestId("closeNotification"));
  });

  await delay(300);
});
