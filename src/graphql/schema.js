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

  type DeleteStatus {
    error: Boolean
    message: String
    id: ID
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
    geometry: Geometry
    name: String
    email: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    _id: ID!
    phone: String!
    geometry: Geometry
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
    geometry: Geometry
    description: String!
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

  type Order {
    _id: ID!
    product: Product!
    user: User!
    seller: User!
    amount: Int
    status: Int
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getProduct(_id: ID!): Product
    getProducts: [Product]
    getMostFavProducts: [Product]
    getUserProducts: [Product]
    getNearbyProducts(latitude: Float!, longitude: Float!, distance: Float): [ProductWithDistance]
    me: Me
    getUsers: [User]
    getUser(_id: ID!): User
    getCategories: [Category]
    getCategory(_id: ID!): Category
    getOrders: [Order]
    getOrder(_id: ID!): Order
  }

  type Mutation {
    generateOTP(phone: String!): GenerateOTPStatus
    verifyOTP(phone: String!, code: String!): VerifyOTPStatus
    updateInfo(name: String, email: String, avatar: String): Status
    updateLocation(geometry: GeometryInput!): Status
    createProduct(name: String!, category: ID!, description: String!, price: Float!, images: [String], availableCount: Int, orderRange: [Int], geometry: GeometryInput): Product
    updateProduct(_id: ID!, category: ID, name: String, description: String, price: Float, images: [String], orderRange: [Int], geometry: GeometryInput): Product
    deleteProduct(_id: ID!): DeleteStatus
    createCategory(name: String!, image: String, icon: String): Category
    updateCategory(_id: ID!, name: String, image: String, icon: String): Category
    deleteCategory(_id: ID!): Status
    createOrder(product: ID, seller: ID, amount: Int): Order
    updateOrderStatus(_id: ID!, status: Int!): Status
  }

  type Subscription {
    orderCreated: Order
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
