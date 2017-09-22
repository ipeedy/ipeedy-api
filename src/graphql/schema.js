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
    error: Boolean
    message: String
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
    category: Category
    description: String!
    geometry: Geometry!
    price: Float!
    images: [String]
    orderRange: [Int]
    user: User!
    reviews: [Review]
    soldCount: Int
    availableCount: Int
    favoriteCount: Int
    createdAt: Date!
    updatedAt: Date!
  }

  type Category {
    _id: ID!
    name: String!
    user: User!
    image: String
    icon: String
    products: [Product]
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
    getCategories: [Category]
    getCategory(_id: ID!): Category
  }

  type Mutation {
    generateOTP(phone: String!): GenerateOTPStatus
    verifyOTP(phone: String!, code: String!): VerifyOTPStatus
    updateInfo(name: String, email: String, avatar: String): Status
    createProduct(name: String!, category: ID!, description: String!, price: Float!, images: [String], geometry: GeometryInput!, availableCount: Int, orderRange: [Int]): Product
    updateProduct(_id: ID!, category: ID, name: String, description: String, price: Float, images: [String], geometry: GeometryInput, orderRange: [Int]): Product
    deleteProduct(_id: ID!): Status
    createCategory(name: String!, image: String, icon: String): Category
    updateCategory(_id: ID!, name: String, image: String, icon: String): Category
    deleteCategory(_id: ID!): Status
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
