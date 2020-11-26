import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import axios from 'axios';

const { ApolloServer, gql } = require('apollo-server');

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
    scalar Date

    type RateNumberOfReviews {
        rate1: Int!
        rate2: Int!
        rate3: Int!
        rate4: Int!
        rate5: Int!
    }

    type Review {
        id: ID!
        content: String
        createdAt: Date!
        rate: Int!
        reviewer: String!
        title: String!
    }
    # if possible add a User and a PublicUser type or a directive on User to hide sensitive data
    # add sensitive data to type
    type User {
        id: ID!
        averageRate: Float!
        name: String!
        pictureUrl: String
        reviews: [Review]
        reviewsCount: Int!
        reviewsCountOnRate: [RateNumberOfReviews]!
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        user: User
        users: [User]
    }
`;

const APITrustpilotFakeData = {
    total: 1254,
    next_cursor: 754236,
    reviews: [
        {
            id: 810345, // Int, not null
            rate: 4, // Int 1-5, not null
            reviewer: 'Jean-Luc', // String, not null
            assigned_to: 'robert@pretto.fr', // String, nullable
            title: 'Super!', // String, not null
            content: 'Lorem Ipusm ....', // String, nullable
            created_at: '2020-10-18T10:16:02Z', // String, ISO8601, not null
            public_url: 'https://fake-trustpilot.com/pretto/811345', // String, URL, not null
        },
    ],
};

const APIAirTableFakeData = {
    items: [
        {
            id: 1,
            name: 'Robert',
            phone: 0o102030405,
            email: 'robert@pretto.fr',
            home_address: '1 rue de la paix, Paris',
            gender: 'Male',
            picture_url: 'https://cdn/robert_2.jpg',
        },
    ],
};

const expectedUser = {
    id: 1,
    averageRate: 4.2,
    name: 'Robert',
    pictureUrl: 'https://cdn/robert_2.jpg',
    reviews: [
        {
            id: 810345,
            content: 'Lorem Ipusm ....',
            createdAt: '2020-10-18T10:16:02Z',
            rate: 4,
            reviewer: 'Jean-Luc',
            title: 'Super!',
        },
    ],
    reviewsCount: 140,
    reviewsCountOnRate: [{ rate1: 126 }, { rate2: 9 }, { rate3: 1 }, { rate4: 1 }, { rate5: 3 }],
};

const expectedUsers = [
    {
        id: 1,
        averageRate: 4.2,
        name: 'Robert',
        pictureUrl: 'https://cdn/robert_2.jpg',
        reviews: [
            {
                id: 810345,
                content: 'Lorem Ipusm ....',
                createdAt: '2020-10-18T10:16:02Z',
                rate: 4,
                reviewer: 'Jean-Luc',
                title: 'Super!',
            },
        ],
        reviewsCount: 140,
    },
    {},
];

const urlTrustpilot = 'https://api.faketrustpilot.com/reviews?limit=10'; // -u pretto:password
const urlAirTable = 'https://api.airtable.com/pretto-team/items'; // -u pretto:password

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        user: async ({ id, rateFilter, after, limit }) => {
            const dataFromTrustpilote = (await axios.get(urlTrustpilot)) || APITrustpilotFakeData;
            const dataFromAirtable = (await axios.get(urlAirTable)) || APIAirTableFakeData;
            return expectedUser;
        },
        users: ({}) => expectedUsers,
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value); // ast value is always in string format
            }
            return null;
        },
    }),
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
