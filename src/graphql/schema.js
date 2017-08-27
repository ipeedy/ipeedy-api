export default `
  scalar Date

  type Product {
    _id: ID!
    name: String!
    slug: String
    description: String!
    price: Int!
    images: [String]
    totalRating: Int
    ratedTimes: Int
    favoriteCount: Int
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getProducts: [Product]
  }

  schema {
    query: Query
  }
`;
