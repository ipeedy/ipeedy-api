export default `
  scalar Date

  type GenerateOTPStatus {
    error: Boolean!
    message: String
  }

  type VerifyOTPStatus {
    error: Boolean
    message: String
    token: String
  }

  type AuthCode {
    code: Int
    generatedAt: Date!
  }

  type User {
    _id: ID!
    phone: Int!
    name: String
    email: String
    avatar: String
    authCode: AuthCode
    createdAt: Date!
    updatedAt: Date!
  }

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

  type Mutation {
    generateOTP(phone: String!): GenerateOTPStatus
    verifyOTP(phone: String!, code: String!): VerifyOTPStatus
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
