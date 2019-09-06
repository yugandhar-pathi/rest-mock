const { graphqlExpress } = require("graphql-server-express");
const graphqlTools = require("graphql-tools");

const typeDefs = require("./schema");

const schema = graphqlTools.makeExecutableSchema({
  typeDefs: typeDefs
});
graphqlTools.addMockFunctionsToSchema({ schema });
module.exports = graphqlExpress({ schema });
