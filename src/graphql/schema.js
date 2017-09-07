export default `
  scalar Date

  input GeometryInput {
    type: String
    coordinates: [Float]!
  }

  type GenerateOTPStatus {
    error: Boolean!
    message: String
    diff_time: Int
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

  type Review {
    user: User!
    text: String!
    rating: Float!
    updatedAt: Date!
    createdAt: Date!
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
    reviews: [Review]
    soldCount: Int
    availableCount: Int
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
    getUsers: [User]
    getUser(_id: ID!): User
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
