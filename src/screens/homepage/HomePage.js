import React from "react";
import { Box, Text, Button } from "grommet";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { getAttendeesByName } from "../../gql/gql-queries";

const HomePage = props => {
  const handleLogout = () => {
    props.history.push("/");
  };

  return (
    <Box data-testid="home-page">
      <Box direction="row" justify="between" border="bottom" pad="small">
        <Text weight="bold" size="xlarge">
          Welcome To React Meetup!!
        </Text>
        <Button
          label="Logout"
          data-testid="logoutButton"
          onClick={handleLogout}
        />
      </Box>
      <Box>
        <Text> Below List is from GraphQL Mock:</Text>
        <Query query={getAttendeesByName()}>
          {({ loading, error, data }) => {
            if (loading) {
              // show loading screen
              return <Text>Loading...</Text>;
            }
            if (error) {
              return <Text>Error...{error.message}</Text>;
            }
            if (data) {
              return data.AttendeeList.map(attendee => (
                <Text>Attendee Name:{attendee.name}</Text>
              ));
            }
          }}
        </Query>
      </Box>
    </Box>
  );
};

export default withRouter(HomePage);
