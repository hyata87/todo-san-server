import * as functions from 'firebase-functions';
import {ApolloServer, gql} from 'apollo-server-cloud-functions';

const typeDefs = gql`

  type Task {
    id: ID!
    title: String
    description: String
  }

  type Board {
    id: ID!
    title: String
  }

  type Query {
    tasks: [Task]
  }
`;

const tasks = [
    {
        id: "id1",
        title: "dummy1"
    },
    {
        id: "id2",
        title: "dummy2"
    }
]

const resolvers = {
    Query: {
        tasks: () => tasks,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
        headers: req.headers,
        req,
        res
    })
});

exports.graphql = functions.https.onRequest(server.createHandler());
