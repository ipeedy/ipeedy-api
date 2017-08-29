export default `
  scalar Date

  input GeometryInput {
    type: String
    coordinates: [Float]!
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

  type Status {
    message: String!
  }

  type Geometry {
    type: String!
    coordinates: [Float]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    phone: String!
    name: String
    email: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    _id: ID!
    phone: String!
    name: String
    email: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductWithDistance {
    dis: Float!
    obj: Product
  }

  type Product {
    _id: ID!
    name: String!
    slug: String
    description: String!
    geometry: Geometry!
    price: Float!
    images: [String]
    user: User!
    totalRating: Int
    ratedTimes: Int
    favoriteCount: Int
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getProduct(_id: ID!): Product
    getProducts: [Product]
    getUserProducts: [Product]
    getNearbyProducts(latitude: Float!, longitude: Float!, distance: Float): [ProductWithDistance]
    me: Me
  }

  type Mutation {
    generateOTP(phone: String!): GenerateOTPStatus
    verifyOTP(phone: String!, code: String!): VerifyOTPStatus
    updateInfo(name: String!, email: String!, avatar: String): Me
    createProduct(name: String!, description: String!, price: Float!, images: [String], geometry: GeometryInput!): Product
    updateProduct(_id: ID!, name: String, description: String, price: Float, images: [String], geometry: GeometryInput): Product
    deleteProduct(_id: ID!): Status
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
