const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  #   type Book {
  #     title: String
  #     author: String
  #   }

  type RateNumberOfReviews {
    rate1: Int!
    rate2: Int!
    rate3: Int!
    rate4: Int!
    rate5: Int!
  }

  type Review {
    content: String
    createdAt: Date!
    rate: Int!
    reviewer: String!
    title: String!
  }
  # if possible add a User and a PublicUser type or a directive on User to hide sensitive data
  # add sensitive data to type
  type User {
    averageRate: Int!
    name: String!
    pictureUrl: String
    reviews: [Review]
    reviewsCount: Int!
    reviewsCountOnRate: [RateNumberOfReviews]!
  }

  type Users {
    users: [User]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  #   type Query {
  #     books: [Book]
  #   }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
