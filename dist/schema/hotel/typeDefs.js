"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Hotel {
    id: ID!
    name: String!
    city: String!
    country: String!
    address: String!
    price: Float!
    roomsAvailable: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input HotelCreateInput {
    name: String!
    city: String!
    country: String!
    address: String!
    price: Float!
    roomsAvailable: Int!
  }

  input HotelUpdateInput {
    name: String
    city: String
    country: String
    address: String
    price: Float
    roomsAvailable: Int
  }

  input HotelSearchCriteria {
    city: String
    country: String
    minPrice: Float
    maxPrice: Float
  }

  type Query {
    searchHotels(criteria: HotelSearchCriteria!): [Hotel!]!
    getHotelById(hotelId: ID!): Hotel
    getAllHotels: [Hotel!]!
  }

  type Mutation {
    addNewHotel(hotelData: HotelCreateInput!): Hotel! @auth @hasRole(role: "ADMIN")
    updateHotelDetails(hotelId: ID!, hotelData: HotelUpdateInput!): Hotel! @auth @hasRole(role: "ADMIN")
    removeHotel(hotelId: ID!): Hotel! @auth @hasRole(role: "ADMIN")
    updateAvailableRooms(hotelId: ID!, roomsAvailable: Int!): Hotel! @auth @hasRole(role: "ADMIN")
  }
`;
exports.default = typeDefs;
