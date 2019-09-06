const typeDefs = `
  type Attendees {
    id: Int
    name: String
  }

  type Query {
    AttendeeList: [Attendees]
    hello: String
  }`;

module.exports = typeDefs;
