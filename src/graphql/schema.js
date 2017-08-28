export default`
  scalar Date

  input GeometryInput {
    type: String
    coordinates: [Int]!
  }

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

  type Geometry {
    type: String!
    coordinates: [Int]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    phone: String!
    name: String
    email: String
    avatar: String
    authCode: AuthCode
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    _id: ID!
    phone: String!
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
    geometry: Geometry!
    price: Int!
    images: [String]
    user: User!
    totalRating: Int
    ratedTimes: Int
    favoriteCount: Int
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getProducts: [Product]
    me: Me
  }

  type Mutation {
    generateOTP(phone: String!): GenerateOTPStatus
    verifyOTP(phone: String!, code: String!): VerifyOTPStatus
    updateInfo(name: String!, email: String!, avatar: String): Me
    createProduct(name: String!, description: String!, price: Int!, images: [String], geometry: GeometryInput!): Product
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
