import {
  getByTestId, //or any other queries you want
  addTestcafeTestingLibrary
} from "@testing-library/testcafe";

import { ClientFunction } from "testcafe";

const getLocation = ClientFunction(() => document.location.href);

fixture`Getting Started`.beforeEach(addTestcafeTestingLibrary)
  .page`http://localhost:3456/`;

test("test happy flow", async t => {
  await t
    .typeText(getByTestId("userid"), "test")
    .typeText(getByTestId("password"), "test")
    .click(getByTestId("loginButton"))
    .expect(getLocation())
    .contains("/HomePage");
});

test("test invalid use case", async t => {
  await t
    .typeText(getByTestId("userid"), "invalid_user")
    .typeText(getByTestId("password"), "test")
    .click(getByTestId("loginButton"))
    .expect(getByTestId("user-notification").textContent)
    .eql("Invalid username or password")
    .click(getByTestId("closeNotification"));
});

test("test timeout use case", async t => {
  await t
    .typeText(getByTestId("userid"), "timeout_user")
    .typeText(getByTestId("password"), "test")
    .click(getByTestId("loginButton"))
    .expect(getByTestId("user-notification").textContent)
    .eql("Connection Timedout, please try after some time.")
    .click(getByTestId("closeNotification"));
});
