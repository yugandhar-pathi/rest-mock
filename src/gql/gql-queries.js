import gql from "graphql-tag";

export function getAttendeesByName() {
  return gql`
    query AttendeeList {
      AttendeeList {
        name
      }
    }
  `;
}
